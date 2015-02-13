var pref = new gadgets.Prefs();
var barChart, lineChart, pieChart;
var chartData, aoiData;
var chartType; // bar, line, pie, list
var selectedType, selectedName, selectedOrgId, selectedFacId;
var selectedId;
var futureType;
var selectedOrgName, selectedFacName, selectedDepName, selectedDivName;

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
	
	$("#peo-org-back").hide();
	
	selectedType = "org";
	
	initBarChart();
	
	initLineChart();
	
	initPieChart();
	
	fetchAOIData();
	
	fetchCustomData("org", 0, "");
	
	// on resize the window
	$(window).resize(function(){
		setWidthsForAOI();
		drawChartsAndList(chartData);
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
		if (selectedType === "fac"){
			selectedName = "";
			fetchCustomData("org", 0, selectedName, true);
			$("#peo-org-back").hide();
		} else if (selectedType === "dep"){
			fetchCustomData("fac", selectedOrgId, selectedName, true);
		} else if (selectedType === "peo"){
			fetchCustomData("dep", selectedFacId, selectedName, true);
		} else if (selectedType === "divpeo"){
			fetchCustomData("fac", selectedOrgId, selectedName, true);
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
		fetchCustomData(selectedType, selectedId, selectedName, false, true);
		$("#ssaoi-selection").blur();
		if(selectedType === "org"){
			$("#peo-org-back").hide();
		}
	});
	
	//console.clear();
	setWidthsForAOI();
});

function fetchAOIData() {
	var url =  "../../portal/gadgets/people-organizations/data-files/aoi-data.jag";
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

function fetchCustomData(type, id, name, isBack, isAoiChanged) {
	var aoiId = $("#aoi-selection option:selected").val();
	var saoiId = $("#saoi-selection option:selected").val();
	var ssaoiId = $("#ssaoi-selection option:selected").val();
	
	selectedType = type;
	selectedId = id;
	if("undefined" === typeof isBack || isBack === false){
		if (type === "fac"){
			selectedOrgId = id;
			selectedName = name;
			selectedOrgName = name;
		} else if (type === "dep"){
			selectedFacId = id;
			selectedName = name;
			selectedFacName = name;
		} else if (type === "peo") {
			selectedDepName = name;
		} else if (type === "div"){
			selectedOrgId = id;
			selectedName = name;
			selectedOrgName = name;
		} else if (type === "divpeo") {
			selectedFacId = id;
			//selectedName = name;
			selectedDivName = name;
		}
	}
	
	var url = "../../portal/gadgets/people-organizations/data-files/people-organizations-data.jag";
	
	$.ajax({
		url: url,
		type: "GET",
		dataType: "json",
		data: {
			type: selectedType,
			id: id,
			aoiId: aoiId,
			saoiId: saoiId,
			ssaoiId: ssaoiId
		},
		success: onDataReceived
	});

	setOptionsForCharts();
	
	setInfoForCharts();
	
	if ("undefined" === typeof isAoiChanged || isAoiChanged === false){
		setChartTitle(name, selectedType, isBack);
	}
	
	if (selectedType == "fac" || selectedType == "dep" || selectedType == "div"){
		$("#peo-org-back").show();
	} 
}

function onDataReceived(data) {
	chartData = data.people_count_data;
	
	if(chartData.length > 0){
		futureType = chartData[0].type;
		
		// set cursor for divisions
		if (futureType === "div"){
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
		drawSlider(1, chartData.length);
	}
	
	drawChartsAndList(chartData);
}

function drawSlider(start, end) {
	initSlider(start, end);
	var maxValue = (end > 10) ? 10 : end;
	$("#limitSlider").slider('value', 1, maxValue);
}

function setChartTitle(name, type, isBack){
	if (type === "org") {
		$("#chartState").text("");
	} else if (type === "fac") {
		$("#chartState").html('<a href="../../profile/organization.jag?oid=' + selectedOrgId + '" target="_blank">' + selectedOrgName + '</a>');
	} else if (type === "dep") {
		$("#chartState").html('<a href="../../profile/organization.jag?oid=' + selectedOrgId + '" target="_blank">' + selectedOrgName + '</a>' + " / " + selectedFacName);
	} else if (type === "peo") {
		$("#chartState").html('<a href="../../profile/organization.jag?oid=' + selectedOrgId + '" target="_blank">' + selectedOrgName + '</a>' + " / " + selectedFacName + " / " + selectedDepName);
	} else if (type === "divpeo") {
		$("#chartState").html('<a href="../../profile/organization.jag?oid=' + selectedOrgId + '" target="_blank">' + selectedOrgName + '</a>' + " / " + selectedDivName);
	} else {
		$("#chartState").text("");
	}
}

function setOptionsForCharts(){
	if("undefined" === typeof selectedType || selectedType === "org"){
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
	} else if (selectedType === "fac"){
		var cnfg = {
			barBottomColor: "#0E8615",
			barTopColor: "#109518",
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
	} else if (selectedType === "dep"){
		var cnfg = {
			barBottomColor: "#970097",
			barTopColor: "#6F006F",
			cursorType: "pointer"
		};
		barChart.setOptions(cnfg);
		
		cnfg = {
			lineColor: "#6F006F",
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
	if("undefined" === typeof selectedType || selectedType === "org"){
		$("#info-icon").tooltip({
			animation: true,
			placement: "left",
			html: true,
			title: '<div style="text-align: left; font-size: 12px; margin: 8px 5px;"><p><i class="fa fa-info-circle fa-lg"></i>&nbsp; <b>Number of researchers and scientists</b> in research organizations in Sri Lanka.</p><p>You can filter the results by selecting area of interests and range appropriately.</p><p>Each data item is clickable.</p><p>Clicking on a data item will take you to the next level in the <i>organization</i>.<br/><b>e.g.</b></p><ul><li>If it\'s a university, it will take you to faculties</li><li>If it\'s a research institute, it will take you to divisions</li></ul></div>'
    		});
	} else if (selectedType === "fac") { // maybe a division
		$("#info-icon").tooltip({
			animation: true,
			placement: "left",
			html: true,
			title: '<div style="text-align: left; font-size: 12px; margin: 8px 5px;"><p><i class="fa fa-info-circle fa-lg"></i>&nbsp; <b>Number of researchers and scientists</b> in faculties or divisions.</p><p>Each data item is clickable.</p><p>Clicking on a data item will take you to the next level in the <i>faculty</i> or <i>division</i>.<br/><b>e.g.</b></p><ul><li>If it\'s a faculty, it will take you to departments</li><li>If it\'s a division, it will take you to details of researchers</li></ul></div>'
		});
	} else if (selectedType === "dep") {
		$("#info-icon").tooltip({
			animation: true,
			placement: "left",
			html: true,
			title: '<div style="text-align: left; font-size: 12px; margin: 8px 5px;"><p><i class="fa fa-info-circle fa-lg"></i>&nbsp; <b>Number of researchers and scientists</b> in departments.</p><p>Click on a data item will take you to the details of researchers in particular department.</p></div>'
		});
	} else if (selectedType === "peo") {
		$("#info-icon").tooltip({
			animation: true,
			placement: "left",
			html: true,
			title: '<div style="text-align: left; font-size: 12px; margin: 8px 5px;"><p><i class="fa fa-info-circle fa-lg"></i>&nbsp; <b>Researchers</b> in department.</p><p>Click on any name to see his / her profile.</p></div>'
		});
	} else if (selectedType === "divpeo") {
		$("#info-icon").tooltip({
			animation: true,
			placement: "left",
			html: true,
			title: '<div style="text-align: left; font-size: 12px; margin: 8px 5px;"><p><i class="fa fa-info-circle fa-lg"></i>&nbsp; <b>Researchers</b> in division.</p><p>Click on any name to see his / her profile.</p></div>'
		});
	}
}

function drawChartsAndList(data){
	var place = $("#placeholder");
	place.empty();
	var gadgetWidth = place.width();
	
	if ('undefined' !== typeof data) {
		if(data.length < 1){
			$("#slider-area").empty();
			showNotAvailbleMsg();
		} else {
			var value = $("#limitSlider").slider("value");
			var fromTo = value.split(';');
			var newTo = parseInt(fromTo[1]);
			if (gadgetWidth < 500){
				newTo = parseInt(fromTo[0]) + 4;
				$("#limitSlider").slider("value", fromTo[0], newTo);
			} else if (gadgetWidth < 1000){
				newTo = parseInt(fromTo[0]) + 9;
				$("#limitSlider").slider("value", fromTo[0], newTo);
			} else if (gadgetWidth < 1500){
				newTo = parseInt(fromTo[0]) + 14;
				$("#limitSlider").slider("value", fromTo[0], newTo);
			} else {
				newTo = parseInt(fromTo[0]) + 19;
				$("#limitSlider").slider("value", fromTo[0], newTo);
			}
			
			var newData = getSlicedChartData(fromTo[0], newTo);
			
			if (selectedType === "peo"){
				createPeopleChart(newData);
			} else if (selectedType === "divpeo"){
				createPeopleChart(newData);
			} else {			
				if (chartType === "bar") {
					drawBarChart(newData);
				} else if (chartType === "line"){
					drawLineChart(newData);
				} else if (chartType === "pie"){
					drawPieChart(newData);
				} else if (chartType === "list"){
					createList(newData);
				}
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
			var newData = getSlicedChartData(fromTo[0], fromTo[1]);
			
			if (selectedType === "peo" || selectedType === "divpeo"){
				createPeopleChart(newData);
			} else {
				if (chartType === "bar") {
					drawBarChart(newData);
				} else if (chartType === "line"){
					drawLineChart(newData);
				} else if (chartType === "pie"){
					drawPieChart(newData);
				} else if (chartType === "list"){
					createList(newData);
				}
			}
		}
	}
}

function initSlider(fromVal, toVal){
	var sliderArea = $("#slider-area");
	sliderArea.empty();
	
	var bElem = document.createElement("b");
	var sliderText = "";
	if (selectedType === "org" || selectedType === ""){
		sliderText = "Range of Organizations: "
	} else if (selectedType === "fac"){
		sliderText = "Range of Faculties: "
	} else if (selectedType === "dep"){
		sliderText = "Range of Departments: "
	} else if (selectedType === "div"){
		sliderText = "Range of Divisions: "
	}
	var text = document.createTextNode(sliderText);
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
	
	if (toVal <= fromVal) {
		$("#limitSlider").slider({
			from: fromVal,
			step: 1,
			smooth: true, 
			round: 0, 
			dimension: "",
			skin: "round_plastic", // plastic, round, round_plastic, blue
			callback: function (value) {
				drawChartsAndList(chartData);
			}
		});
	} else {
		$("#limitSlider").slider({
			from: fromVal,
			to: toVal, 
			step: 1,
			//scale: [0, '|', 20, '|' , '40', '|', 60, '|', 80, '|', 100],
			smooth: true, 
			round: 0, 
			dimension: "",
			skin: "round_plastic", // plastic, round, round_plastic, blue
			callback: function (value) {
				//drawChartsAndList(chartData);
				drawChartsAndListWithRange(chartData);
			}
		});
	}
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
        yAxisTitle: "Number of Current Researchers",
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
	        yAxisTitle: "Number of Current Researchers",
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
		tableTitleStr = "Organizations";
	} else if (selectedType === "fac"){
		tableTitleStr = "Faculties";
	} else if (selectedType === "dep"){
		tableTitleStr = "Departments";
	} else if (selectedType === "div"){
		tableTitleStr = "Divisions";
	}
	var text = document.createTextNode(tableTitleStr);
	thElem1.appendChild(text);
	text = document.createTextNode("Number of Current Researchers");
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

function createPeopleChart(data){
	if('undefined' === typeof data){
		data = chartData;
	}
	var place = $("#placeholder");
	$(".bar-tooltip").hide();
	$(".line-tooltip").hide();
	$(".pie-tooltip").hide();
	
	var divElem = document.createElement("div");
	divElem.style.paddingLeft = "16px";
	divElem.style.paddingRight = "16px";
	
	var tableElem = document.createElement("table");
	tableElem.setAttribute("class", "table table-striped");
	var theadElem = document.createElement("thead");
	
	// heading row
	var trElem = document.createElement("tr");
	var thElem0 = document.createElement("th");
	thElem0.style.width = "10%";
	var thElem1 = document.createElement("th");
	thElem1.style.width = "20%";
	var thElem2 = document.createElement("th");
	thElem2.style.width = "70%";
	
	var text = document.createTextNode("#");
	thElem0.appendChild(text);
	
	var tableTitleStr = "Image";
	text = document.createTextNode(tableTitleStr);
	thElem1.appendChild(text);
	text = document.createTextNode("Name of the Researcher");
	thElem2.appendChild(text);
	
	trElem.appendChild(thElem0);
	trElem.appendChild(thElem1);
    trElem.appendChild(thElem2);
	theadElem.appendChild(trElem);
    tableElem.appendChild(theadElem);
	
	var tbodyElem = document.createElement("tbody");
	for (var i = 0; i < data.length; i++) {
		trElem = document.createElement("tr");
		var tdElem0 = document.createElement("td");
		var tdElem1 = document.createElement("td");
		var tdElem2 = document.createElement("td");
		
		var text = document.createTextNode((i + 1) + ".");
		tdElem0.appendChild(text);
		
		var image = data[i].image;
		if(image === null || image === ""){
			if(parseInt(data[i].gender) === 1){
				image = "/userforms/images/users/man.png";
			} else {
				image = "/userforms/images/users/woman.png";
			}
		} else {
			image = "/userforms/images/users/" + data[i].id + "/" + data[i].image;
		}
		var imgElem = document.createElement("img");
		imgElem.setAttribute("src", image);
		imgElem.style.width = "60px";
		tdElem1.appendChild(imgElem);
		
		var divElemDetails = document.createElement("div");
		var desigElem = "";
		if (data[i].designation === null || data[i].designation === "") {
			desigElem = "";
		} else {
			desigElem = '<span style="margin-right: 24px;" title="Designation"><i class="fa fa-certificate fa-lg"></i>&nbsp; ' + data[i].designation + '</span>';
		}
		var pubsElem = "";
		if (data[i].pubcount === null || data[i].pubcount === "" || parseInt(data[i].pubcount) === 0) {
			pubsElem = "";
		} else {
			pubsElem = '<span title="Publications"><i class="fa fa-newspaper-o fa-lg"></i>&nbsp; ' + data[i].pubcount + '</span>';
		}
		divElemDetails.innerHTML = '<h5><a href="../../profile/person.jag?pid='+ data[i].id +'" target="_blank">' + data[i].name + '</a></h5>'+ desigElem + pubsElem;
		tdElem2.appendChild(divElemDetails);
		
		trElem.appendChild(tdElem0);
		trElem.appendChild(tdElem1);
        trElem.appendChild(tdElem2);
		
		tbodyElem.appendChild(trElem);
	}
	tableElem.appendChild(tbodyElem);
	
	divElem.appendChild(tableElem);
	place.append(divElem);
}

function getSlicedChartData(fromValue, toValue){
	if (isNaN(toValue)) {
		toValue = fromValue;
	}
	var truncData = [];
	var currentValue;
	if(chartData.length < toValue){
		toValue = chartData.length;
	}
	for(var i = fromValue - 1; i < toValue; i++){
		truncData.push(chartData[i]);
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
