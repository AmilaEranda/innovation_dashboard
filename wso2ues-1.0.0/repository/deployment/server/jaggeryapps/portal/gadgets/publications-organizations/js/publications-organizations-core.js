var pref = new gadgets.Prefs();
var barChart, lineChart, pieChart;
var chartData, aoiData;
var chartType; // bar, line, pie, list
var selectedType, selectedOid, selectedName, selectedOrgName, selectedYear;

$(document).ready(function(){
	// setting chart type
	chartType = pref.getString("chartType").toLowerCase();
	if(chartType !== "bar" && chartType !== "line" && chartType !== "pie" && chartType !== "list"){
		chartType = "bar";
	}
	
	$(".btn-group button").removeClass("btn-success");
	if (chartType === "bar"){
		$("#btnChartTypeBar").addClass("btn-success");
	} else if (chartType === "line"){
		$("#btnChartTypeLine").addClass("btn-success");
	} else if (chartType === "pie"){
		$("#btnChartTypePie").addClass("btn-success");
	} else if (chartType === "list"){
		$("#btnChartTypeList").addClass("btn-success");
	} else {
		$("#btnChartTypeBar").addClass("btn-success");
	}
	
	$("#pub-org-back").hide();
	
	selectedType = "org";
	selectedYear = "";
	
	selectedOid = null;
	
	initBarChart();
	
	initLineChart();
	
	initPieChart();
	
	fetchCustomData("org", null, "");
	
	fetchAOIData();
	
	// on resize the window
	$(window).resize(function(){
		setWidthsForAOI();
		drawChartsAndListWithRange(chartData);
	});
	
	// switching charts
	$(".btn-group button").click(function(){
		$(".btn-group button").removeClass("btn-success");
		$(this).addClass("btn-success");
		$(this).blur();
		chartType = $(this).text().toLowerCase();
		drawChartsAndListWithRange(chartData);
	});
	
	$(".back").click(function(){
		if (selectedType === "yea") {
			selectedName = "";
			fetchCustomData("org", 0, selectedName, true);
			$("#pub-org-back").hide();
		} else if (selectedType === "pub") {
			fetchCustomData("yea", selectedOid, selectedName, true);
		}
		$(this).blur();
	});
	
	$("#aoi-selection").change(function(d, i) {
		var aoiId = $("#aoi-selection option:selected").val();
		var saoiSelection = $("#saoi-selection");
		saoiSelection.empty();
		
		var optElem = document.createElement("option");
		optElem.setAttribute("value", "0");
		var text = document.createTextNode("-- Sub Area of Interest --");
		optElem.appendChild(text);
		saoiSelection.append(optElem);

		for (var i = 0; i < aoiData.length; i++){
			if(aoiData[i].id == aoiId){
				for(var j = 0; j < aoiData[i].data.length; j++){
					var optElem = document.createElement("option");
					optElem.setAttribute("value", aoiData[i].data[j].id);
					var text = document.createTextNode(aoiData[i].data[j].name);
					optElem.appendChild(text);
					saoiSelection.append(optElem);
				}
				break;
			}
		}
		$( "#saoi-selection" ).change();
		$("#aoi-selection").blur();
	});
	
	$("#saoi-selection").change(function(d, i) {
		var aoiId = $("#aoi-selection option:selected").val();
		var saoiId = $("#saoi-selection option:selected").val();
		var ssaoiSelection = $("#ssaoi-selection");
		ssaoiSelection.empty();
		
		var optElem = document.createElement("option");
		optElem.setAttribute("value", "0");
		var text = document.createTextNode("-- Field of Interest --");
		optElem.appendChild(text);
		ssaoiSelection.append(optElem);

		for (var i = 0; i < aoiData.length; i++){
			if(aoiData[i].id == aoiId){
				for(var j = 0; j < aoiData[i].data.length; j++){
					if(aoiData[i].data[j].id == saoiId){
						for(var k = 0; k < aoiData[i].data[j].data.length; k++){
							var optElem = document.createElement("option");
							optElem.setAttribute("value", aoiData[i].data[j].data[k].id);
							var text = document.createTextNode(aoiData[i].data[j].data[k].name);
							optElem.appendChild(text);
							ssaoiSelection.append(optElem);
						}
						break;
					}
				}
				break;
			}
		}
		$( "#ssaoi-selection" ).change();
		$("#saoi-selection").blur();
	});
	
	$("#ssaoi-selection").change(function(d, i) {
		fetchCustomData(selectedType, selectedOid, selectedName, false, true);
		$("#ssaoi-selection").blur();
		if(selectedType === "org"){
			$("#pub-org-back").hide();
		}
	});
	
	//console.clear();
	setWidthsForAOI();
});

function fetchAOIData() {
	var url =  "../../portal/gadgets/publications-organizations/data-files/aoi-data.jag";
	$.ajax({
		url: url,
		type: "GET",
		dataType: "json",
		success: onAOIDataReceived
	});
}

function onAOIDataReceived(data){
	aoiData = data.aoi_data;
	initAoiSelections();
}

function initAoiSelections(){
	var aoiSelection = $("#aoi-selection");
	for(var i = 0; i < aoiData.length; i++){
		var optElem = document.createElement("option");
		optElem.setAttribute("value", aoiData[i].id);
		var text = document.createTextNode(aoiData[i].name);
		optElem.appendChild(text);
		aoiSelection.append(optElem);
	}
}

function fetchCustomData(type, oid, name, isBack, isAoiChanged) {
	var aoiId = $("#aoi-selection option:selected").val();
	var saoiId = $("#saoi-selection option:selected").val();
	var ssaoiId = $("#ssaoi-selection option:selected").val();
	
	selectedType = type;
	if ("undefined" === typeof isBack || isBack === false){
		if (selectedType === "yea") {
			selectedOid = oid;
			selectedName = name;
			selectedOrgName = name;
		} else if (selectedType === "pub") {
			selectedYear = name;
			selectedName = name;
		}
	}
	
	var url = "../../portal/gadgets/publications-organizations/data-files/publications-organizations-data.jag";
	
	$.ajax({
		url: url,
		type: "GET",
		dataType: "json",
		data: {
			type: selectedType,
			oid: selectedOid,
			year: selectedYear,
			aoiId: aoiId,
			saoiId: saoiId,
			ssaoiId: ssaoiId
		},
		success: onDataReceived
	});
	
	setOptionsForCharts();
	
	setInfoForCharts();
	
	if ("undefined" === typeof isAoiChanged || isAoiChanged === false){
		setChartTitle(selectedType);
	}
	
	if (selectedType == "yea" || selectedType == "pub") {
		$("#pub-org-back").show();
	}
}

function onDataReceived(data) {
	chartData = data.publications_count_data;
	if (chartData.length > 0) {
		if (selectedType === "org") {
			initSlider(1, chartData.length);
			var highVal = (chartData.length > 9) ? 9 : chartData.length;
			$("#limitSlider").slider('value', 0, (highVal + 1));
		} else if (selectedType === "yea") {
			var lowVal = parseInt(chartData[0].name);
			var highVal = parseInt(chartData[chartData.length - 1].name);
			initSlider(lowVal, highVal);
			$("#limitSlider").slider("value", (lowVal - 1), (highVal + 1));
		} else if (selectedType === "pub") {
			initSlider(1, chartData.length);
			var highVal = (chartData.length > 9) ? 9 : chartData.length;
			$("#limitSlider").slider('value', 0, (highVal + 1));
		}
	}
	drawChartsAndList(chartData);
}

function setChartTitle(type){
	if (type === "org") {
		$("#chartState").text("");
	} else if (type === "yea") {
		$("#chartState").html('<a href="../../profile/organization.jag?oid=' + selectedOid + '" target="_blank">' + selectedOrgName + '</a>');
	} else if (type === "pub") {
		$("#chartState").html('<a href="../../profile/organization.jag?oid=' + selectedOid + '" target="_blank">' + selectedOrgName + '</a>' + ' / Year :&nbsp; ' + selectedYear + '');
	}
}

function setOptionsForCharts(){
	if ("undefined" === typeof selectedType || selectedType === "org") {
		var cnfg = {
			barBottomColor: "#3365CA",
			barTopColor: "#254A94",
			cursorType: "pointer"
		};
		barChart.setOptions(cnfg);
		
		cnfg = {
			lineColor: "#254A94",
			cursorType: "pointer"
		};
		lineChart.setOptions(cnfg);
		
		cnfg = {
			cursorType: "pointer"
		};
		pieChart.setOptions(cnfg);
	} else if (selectedType === "yea") {
		var cnfg = {
			barBottomColor: "#E27100",
			barTopColor: "#A75300",
			cursorType: "pointer"
		};
		barChart.setOptions(cnfg);
		
		cnfg = {
			lineColor: "#A75300",
			cursorType: "pointer"
		};
		lineChart.setOptions(cnfg);
		
		cnfg = {
			cursorType: "pointer"
		};
		pieChart.setOptions(cnfg);
	}
}

function setInfoForCharts(){
	$('#info-icon').tooltip('destroy');
	$("#info-icon").removeAttr("title");
	if ("undefined" === typeof selectedType || selectedType === "org") {
		$("#info-icon").tooltip({
			animation: true,
			placement: "left",
			html: true,
			title: '<div style="text-align: left; font-size: 12px; margin: 8px 5px;"><p><i class="fa fa-info-circle fa-lg"></i>&nbsp; <b>Number of publications</b> published by researchers in organizations in Sri Lanka.</p><p>You can filter the results by selecting area of interests and range appropriately.</p><p>Each data item is clickable.</p><p>Click on a data item will take you to annual publication output in the <i>organization</i>.</p></div>'
    		});
	} else if (selectedType === "yea") {
		$("#info-icon").tooltip({
			animation: true,
			placement: "left",
			html: true,
			title: '<div style="text-align: left; font-size: 12px; margin: 8px 5px;"><p><i class="fa fa-info-circle fa-lg"></i>&nbsp; Annual <b>publications</b>output in the organization.</p><p>Click on a data item will take you to the details of publications in particular year.</p></div>'
		});
	} else if (selectedType === "pub") {
		$("#info-icon").tooltip({
			animation: true,
			placement: "left",
			html: true,
			title: '<div style="text-align: left; font-size: 12px; margin: 8px 5px;"><p><i class="fa fa-info-circle fa-lg"></i>&nbsp; <b>Publications</b> in selected year.</p><p>Click on any title to see complete details of the publication.</p></div>'
		});
	}
}

function drawChartsAndList(data){
	var place = $("#placeholder");
	place.empty();
	var gadgetWidth = place.width();
	
	if (data.length < 1) {
		$("#slider-area").empty();
		showNotAvailbleMsg();
	} else {
		var value = $("#limitSlider").slider("value");
		var fromTo = value.split(';');
		var newTo = parseInt(fromTo[1]);

		if (selectedType === "org") {
			if (gadgetWidth < 500){
				newTo = parseInt(fromTo[0]) + 4;
				$("#limitSlider").slider("value", fromTo[0] - 1, newTo);
			} else if (gadgetWidth < 1000){
				newTo = parseInt(fromTo[0]) + 9;
				$("#limitSlider").slider("value", fromTo[0] - 1, newTo);
			} else if (gadgetWidth < 1500){
				newTo = parseInt(fromTo[0]) + 14;
				$("#limitSlider").slider("value", fromTo[0] - 1, newTo);
			} else {
				newTo = parseInt(fromTo[0]) + 19;
				$("#limitSlider").slider("value", fromTo[0] - 1, newTo);
			}
		} else if (selectedType === "yea") {
			if (gadgetWidth < 500) {
				fromTo[0] = newTo - 4;
				$("#limitSlider").slider("value", fromTo[0], newTo + 1);
			} else if (gadgetWidth < 1000) {
				fromTo[0] = newTo - 9;
				$("#limitSlider").slider("value", fromTo[0], newTo + 1);
			} else if (gadgetWidth < 1500) {
				fromTo[0] = newTo - 14;
				$("#limitSlider").slider("value", fromTo[0], newTo + 1);
			} else {
				fromTo[0] = newTo - 19;
				$("#limitSlider").slider("value", fromTo[0], newTo + 1);
			}
		} else if (selectedType === "pub") {
			if (gadgetWidth < 500) {
				newTo = parseInt(fromTo[0]) + 4;
				$("#limitSlider").slider("value", fromTo[0] - 1, newTo);
			} else if (gadgetWidth < 1000) {
				newTo = parseInt(fromTo[0]) + 9;
				$("#limitSlider").slider("value", fromTo[0] - 1, newTo);
			} else if (gadgetWidth < 1500) {
				newTo = parseInt(fromTo[0]) + 14;
				$("#limitSlider").slider("value", fromTo[0] - 1, newTo);
			} else {
				newTo = parseInt(fromTo[0]) + 19;
				$("#limitSlider").slider("value", fromTo[0] - 1, newTo);
			}
		}
		var newData = getSlicedChartData(fromTo[0], newTo);

		if (selectedType === "pub") {
			createPublicationList(newData);
		} else {
			if (chartType === "bar") {
				drawBarChart(newData);
			} else if (chartType === "line") {
				drawLineChart(newData);
			} else if (chartType === "pie") {
				drawPieChart(newData);
			} else if (chartType === "list") {
				createList(newData);
			}
		}
	}
}

function drawChartsAndListWithRange(data){
	var place = $("#placeholder");
	place.empty();

	if ('undefined' !== typeof data) {
		if (data.length < 1) {
			$("#slider-area").empty();
			showNotAvailbleMsg();
		} else {
			var value = $("#limitSlider").slider("value");
			var fromTo = value.split(';');
			var newTo = parseInt(fromTo[1]);
			
			var newData = getSlicedChartData(fromTo[0], newTo);
			if (selectedType === "pub"){
				createPublicationList(newData);
			} else {
				if(chartType === "bar") {
					drawBarChart(newData);
				} else if (chartType === "line") {
					drawLineChart(newData);
				} else if (chartType === "pie") {
					drawPieChart(newData);
				} else if (chartType === "list") {
					createList(newData);
				}
			}
		}
	}
}

function createPublicationList(data){
	if ('undefined' === typeof data) {
		data = chartData;
	}
	var place = $("#placeholder");
	$(".bar-tooltip").hide();
	$(".line-tooltip").hide();
	$(".pie-tooltip").hide();
	place.empty();
	
	var divElem = document.createElement("div");
	divElem.style.paddingLeft = "16px";
	divElem.style.paddingRight = "16px";
	
	var tableElem = document.createElement("table");
	tableElem.setAttribute("class", "table table-striped");
	tableElem.style.width = "98%";
	
	var tbodyElem = document.createElement("tbody");
	for (var i = 0; i < data.length; i++) {
		trElem = document.createElement("tr");
		var tdElem1 = document.createElement("td");
		
		var divElemName = document.createElement("div");
		var publicationType = "";
		if (data[i].pubtype === "1" || data[i].pubtype === 1) {
			publicationType = "Journal Article";
		} else if (data[i].pubtype === "2" || data[i].pubtype === 2) {
			publicationType = "Book";
		} else if (data[i].pubtype === "3" || data[i].pubtype === 3) {
			publicationType = "Technical Article";
		} else if (data[i].pubtype === "4" || data[i].pubtype === 4) {
			publicationType = "Conference Proceeding";
		} else if (data[i].pubtype === "5" || data[i].pubtype === 5) {
			publicationType = "Book chapter";
		} else {
			publicationType = "Other";
		}
		divElemName.innerHTML = '<h4><a href="/publication/index.jag?pid=' + data[i].id + '" target="_blank">' + data[i].name + '</a>&nbsp; <small>' + publicationType + '</small></h4>';
		
		var divElemPublishers = document.createElement("div");
		divElemPublishers.innerHTML = '<span style="color: #666666;">' + data[i].publishers + '</span>';
		
		var divElemYear = document.createElement("div");
		divElemYear.innerHTML = '<span style="color: #999999;">' + data[i].year + '</span>';
		
		tdElem1.appendChild(divElemName);
		tdElem1.appendChild(divElemPublishers);
		tdElem1.appendChild(divElemYear);
		
		trElem.appendChild(tdElem1);
		
		tbodyElem.appendChild(trElem);
	}
	tableElem.appendChild(tbodyElem);
	
	divElem.appendChild(tableElem);
	
	$("#loading-status").hide();
	$("#result-status").show();
	place.append(divElem);
}

function initSlider(fromVal, toVal){
	var sliderArea = $("#slider-area");
	sliderArea.empty();
	
	var bElem = document.createElement("b");
	var text;
	if (selectedType === "org") {
		text = document.createTextNode("Organizations: ");
	} else if (selectedType === "yea") {
		text = document.createTextNode("Year: ");
	} else if (selectedType === "pub") {
		text = document.createTextNode("Publications: ");
	} 
	bElem.appendChild(text);
	sliderArea.append(bElem);
	
	var spanElem = document.createElement("span");
	spanElem.style.display = "inline-block";
	spanElem.style.width = "66%";
	spanElem.style.padding = "0 5px";
	
	var inputElem = document.createElement("input");
	inputElem.setAttribute("id", "limitSlider");
	inputElem.setAttribute("type", "slider");
	inputElem.setAttribute("name", "limit");
	inputElem.setAttribute("value", "1;250");
	
	spanElem.appendChild(inputElem);
	sliderArea.append(spanElem);
	
	var tickArr = [];
	var step = 1;
	var dif = (toVal - fromVal) + 1;
	if (dif <= 10) {
		step = 1;
	} else if (dif <= 20){
		step = 2;
	} else if (dif <= 50){
		step = 5;
	} else if (dif <= 100){
		step = 10;
	} else {
		step = 50;
	}
	for (var i = parseInt(fromVal); i <= parseInt(toVal); i = i + step) {
		tickArr.push(i);
	}
	
	$("#limitSlider").slider({
		from: fromVal,
		to: toVal, 
		step: 1,
		smooth: true, 
		round: 0,
		format: { format: '####', locale: 'us' },
		dimension: "",
		skin: "round_plastic", // plastic, round, round_plastic, blue
		callback: function (value) {
			drawChartsAndListWithRange(chartData);
		}
	});
}

function initBarChart(){
	var data = [];
	var barChartOptions = {
        marginTop: 5,
        marginRight: 5,
        marginBottom: 50,
        marginLeft: 45,
        chartTitle: "",
        xAxisTitle: "",
        yAxisTitle: "Number of Publications",
        barBottomColor: "#447fb0",
        barTopColor: "#315a7c",
        barBorderColor: "#23415a",
        barBottomHighlightColor: "#be4620",
        barTopHighlightColor: "#a42800",
        barBorderHighlightColor: "#531400"
    };
	barChart = new BarChart("placeholder", data, barChartOptions);
}

function drawBarChart(data, options){
	if ('undefined' !== typeof data) {
		barChart.setData(data);
	}
	if ('undefined' !== typeof options) {
		barChart.setOptions(options);
	}
	barChart.draw();
}

function initLineChart(){
	var data = [];
	var lineChartOptions = {
			marginTop: 5,
	        marginRight: 5,
	        marginBottom: 50,
	        marginLeft: 45,
	        chartTitle: "",
	        xAxisTitle: "",
	        yAxisTitle: "Number of Publications",
	        lineColor: "#A52A2A",
	        valuePrecision: 2,
	        nanMessage: "Data not available"
    };
	lineChart = new LineChart("placeholder", data, lineChartOptions);
}

function drawLineChart(data, options){
	if ('undefined' !== typeof data) {
		lineChart.setData(data);
	}
	if ('undefined' !== typeof options) {
		lineChart.setOptions(options);
	}
	lineChart.draw();
}

function initPieChart(){
	var data = [];
	var pieChartOptions = {
		marginTop: 20,
		marginRight: 20,
		marginBottom: 20,
		marginLeft: 20,
		colors: ["#3366CC", "#DC3912", "#FF9900", "#109618", "#990099", "#0099C6", "#DD4477", "#AAAA11", "#E67300", "#B77322", "#16D620"]
    };
	
	pieChart = new PieChart("placeholder", data, pieChartOptions);
}

function drawPieChart(data, options){
	if ('undefined' !== typeof data) {
		pieChart.setData(data);
	}
	if ('undefined' !== typeof options) {
		pieChart.setOptions(options);
	}
	pieChart.draw();
}

function createList(data){
	if('undefined' === typeof data){
		data = chartData;
	}
	var place = $("#placeholder");
	
	var divElem = document.createElement("div");
	divElem.style.paddingLeft = "16px";
	divElem.style.paddingRight = "16px";
	
	var tableElem = document.createElement("table");
	tableElem.setAttribute("class", "table table-striped");
	var theadElem = document.createElement("thead");
	
	// heading row
	var trElem = document.createElement("tr");
	var thElem1 = document.createElement("th");
	thElem1.style.width = "70%";
	var thElem2 = document.createElement("th");
	thElem2.style.width = "30%";
	var tableTitleStr = "";
	if (selectedType === null || selectedType === "org"){
		tableTitleStr = "Organization Name";
	} else if (selectedType === "yea"){
		tableTitleStr = "Year";
	}
	var text = document.createTextNode(tableTitleStr);
	thElem1.appendChild(text);
	text = document.createTextNode("Number of Publications");
	thElem2.appendChild(text);
	
	trElem.appendChild(thElem1);
    trElem.appendChild(thElem2);
	theadElem.appendChild(trElem);
    tableElem.appendChild(theadElem);
	
	var tbodyElem = document.createElement("tbody");
	for (var i = 0; i < data.length; i++) {
		trElem = document.createElement("tr");
		var tdElem1 = document.createElement("td");
		var tdElem2 = document.createElement("td");
		
		var text = document.createTextNode(data[i].name);
		tdElem1.appendChild(text);
		
		text = document.createTextNode(data[i].value);
		tdElem2.appendChild(text);
		
		trElem.appendChild(tdElem1);
        trElem.appendChild(tdElem2);
		
		tbodyElem.appendChild(trElem);
	}
	tableElem.appendChild(tbodyElem);
	
	divElem.appendChild(tableElem);
	place.append(divElem);
}

function showNotAvailbleMsg(){
	var place = $("#placeholder");
	place.empty();
	$(".bar-tooltip").hide();
	$(".line-tooltip").hide();
	$(".pie-tooltip").hide();
	
	var divElem = document.createElement("div");
	divElem.style.paddingLeft = "16px";
	divElem.style.paddingRight = "16px";
	divElem.style.textAlign = "center";
	
	var headingElem = document.createElement("div");
	headingElem.style.marginTop = "16px";
	$(headingElem).animate({fontSize:'20px'}, "slow");
	headingElem.innerHTML = '<p><i class="fa fa-exclamation-circle fa-lg"></i>&nbsp; Data Not Available</p>';
	
	var divElemDetails = document.createElement("div");
	divElemDetails.innerHTML = '<i>Currently no data is available to display for this level.</i>';
	
	divElem.appendChild(headingElem);
	divElem.appendChild(divElemDetails);
	place.append(divElem);
}

function getSlicedChartData(fromValue, toValue){
	if (isNaN(toValue)) {
		toValue = fromValue;
	}
	var truncData = [];
	if (selectedType == "org") {
		if (chartData.length < toValue) {
			toValue = chartData.length;
		}
		for (var i = fromValue - 1; i < toValue; i++) {
			truncData.push(chartData[i]);
		}
	} else if (selectedType == "yea") {
		for (var i = 0; i < chartData.length; i++) {
			var val = parseInt(chartData[i].name);
			if (val >= fromValue && val <= toValue) {
				truncData.push(chartData[i]);
			}
		}
	} else if (selectedType == "pub"){
		if (chartData.length < toValue) {
			toValue = chartData.length;
		}
		for (var i = fromValue - 1; i < toValue; i++) {
			truncData.push(chartData[i]);
		}
	}
	return truncData;
}

function setWidthsForAOI(){
	var place = $("#placeholder");
	var placeWidth = place.width();
	
	var aoi = $("#aoi-selection");
	var saoi = $("#saoi-selection");
	var ssaoi = $("#ssaoi-selection");
	
	if (placeWidth < 320){
		aoi.css({"width": "50px"});
		saoi.css({"width": "80px"});
		ssaoi.css({"width": "50px"});
	} else if (placeWidth < 350){
		aoi.css({"width": "60px"});
		saoi.css({"width": "90px"});
		ssaoi.css({"width": "60px"});
	} else if (placeWidth < 380){
		aoi.css({"width": "70px"});
		saoi.css({"width": "100px"});
		ssaoi.css({"width": "70px"});
	} else if (placeWidth < 410){
		aoi.css({"width": "80px"});
		saoi.css({"width": "110px"});
		ssaoi.css({"width": "80px"});
	} else if (placeWidth < 440){
		aoi.css({"width": "90px"});
		saoi.css({"width": "120px"});
		ssaoi.css({"width": "90px"});
	} else if (placeWidth < 470){
		aoi.css({"width": "100px"});
		saoi.css({"width": "130px"});
		ssaoi.css({"width": "100px"});
	} else if (placeWidth < 500){
		aoi.css({"width": "110px"});
		saoi.css({"width": "140px"});
		ssaoi.css({"width": "110px"});
	} else if (placeWidth < 530){
		aoi.css({"width": "120px"});
		saoi.css({"width": "150px"});
		ssaoi.css({"width": "120px"});
	} else if (placeWidth < 560) {
		aoi.css({"width": "130px"});
		saoi.css({"width": "160px"});
		ssaoi.css({"width": "130px"});
	} else if (placeWidth < 590) {
		aoi.css({"width": "140px"});
		saoi.css({"width": "170px"});
		ssaoi.css({"width": "140px"});
	} else if (placeWidth < 620) {
		aoi.css({"width": "150px"});
		saoi.css({"width": "180px"});
		ssaoi.css({"width": "150px"});
	} else if (placeWidth < 650) {
		aoi.css({"width": "160px"});
		saoi.css({"width": "190px"});
		ssaoi.css({"width": "160px"});
	} else if (placeWidth < 680) {
		aoi.css({"width": "170px"});
		saoi.css({"width": "200px"});
		ssaoi.css({"width": "170px"});
	} else if (placeWidth < 710) {
		aoi.css({"width": "180px"});
		saoi.css({"width": "210px"});
		ssaoi.css({"width": "180px"});
	} else {
		aoi.css({"width": "190px"});
		saoi.css({"width": "220px"});
		ssaoi.css({"width": "190px"});
	}
}
