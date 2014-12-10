var pref = new gadgets.Prefs();
var barChart, lineChart, pieChart;
var chartData, aoiData;
var chartType; // bar, line, pie, list
var selectedType, selectedName, selectedOrgId;
var selectedId;
var futureType;
//var firstFrom, firstTo;
//var secondFrom, secondTo;

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
	
	//firstFrom = firstTo = 0;
	//secondFrom = secondTo = 0;
	
	initBarChart();
	
	initLineChart();
	
	initPieChart();
	
	//fetchData();
	fetchCustomData("org", 0, "");
	
	fetchAOIData();
	
	// on resize the window
	$(window).resize(function(){
		drawChartsAndList(chartData);
	});
	
	// switching charts
	$(".btn-group button").click(function(){
		$(".btn-group button").removeClass("btn-success");
		$(this).addClass("btn-success");
		$(this).blur();
		chartType = $(this).text().toLowerCase();
		drawChartsAndList(chartData);
	});
	
	$(".back").click(function(){
		if (selectedType === "dep"){
			fetchCustomData("fac", selectedOrgId, selectedName);
		} else if (selectedType === "fac"){
			selectedName = "";
			fetchCustomData("org", 0, selectedName);
			$("#peo-org-back").hide();
		}
		$(this).blur();
	
		//fetchCustomData();
		//$(this).blur();
		//setChartTitle("");
		//$("#peo-org-back").hide();
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
		fetchCustomData(selectedType, selectedId, selectedName, false);
		$("#ssaoi-selection").blur();
		if(selectedType == "org"){
			$("#peo-org-back").hide();
		}
	});
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

function fetchData() {
	var url = "../../portal/gadgets/people-organizations/data-files/people-organizations-data.jag";
	selectedType = "org";
	$.ajax({
		url: url,
		type: "GET",
		dataType: "json",
		data: {
			type: selectedType
		},
		success: onDataReceived
	});
}

function fetchCustomData(type, id, name, titleChanged) {
	var aoiId = $("#aoi-selection option:selected").val();
	var saoiId = $("#saoi-selection option:selected").val();
	var ssaoiId = $("#ssaoi-selection option:selected").val();
	
	selectedType = type;
	if (type === "fac"){
		selectedOrgId = id;
		selectedName = name;
	}
	selectedId = id;
	
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
	
	if ("undefined" === typeof titleChanged || titleChanged === true) {
		setChartTitle(name, selectedType);
	}
	
	if (selectedType == "fac" || selectedType == "dep"){
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
				cursorType: "auto"
			};
			barChart.setOptions(cnfg);
			
			cnfg = {
				lineColor: "#A75300",
				cursorType: "auto"
			};
			lineChart.setOptions(cnfg);
			
			cnfg = {
				cursorType: "auto"
			};
			pieChart.setOptions(cnfg);
		}
		
		//var value = $("#limitSlider").slider("value");
		//var fromTo = value.split(';');
		//
		/*if (selectedType === "org") {
			firstFrom = fromTo[0];
			firstTo = fromTo[1];
		} else if (selectedType === "fac"){
			secondFrom = fromTo[0];
			secondTo = fromTo[1];
		}*/
		
		drawSlider(1, chartData.length);
		/*initSlider(1, chartData.length);
		var maxValue = (chartData.length > 10) ? 10 : chartData.length;
		if(selectedType === "org"){
			if(firstFrom === 0 && firstTo === 0) {
				$("#limitSlider").slider('value', 1, maxValue);
			} else {
				$("#limitSlider").slider('value', firstFrom, firstTo);
			}
			console.log(firstFrom);
		} else {
			$("#limitSlider").slider('value', 1, maxValue);
		}*/
	}
	
	drawChartsAndList(chartData);
}

function drawSlider(start, end) {
	initSlider(start, end);
	var maxValue = (end > 10) ? 10 : end;
	
	/*if(selectedType === "org"){
		if(firstFrom === 0 && firstTo === 0) {
			$("#limitSlider").slider('value', 1, maxValue);
		} else {
			$("#limitSlider").slider('value', firstFrom, firstTo);
		}
		console.log(firstFrom);
	} else {
		$("#limitSlider").slider('value', 1, maxValue);
	}*/
	
	$("#limitSlider").slider('value', 1, maxValue);
}

function setChartTitle(name, type){
	if (type === "fac") {
		$("#chartState").text(name);
	} else if (type === "dep") {
		var newText = $("#chartState").text() + " / " + name;
		$("#chartState").text(newText);
	} else {
		$("#chartState").text(name);
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
			barBottomColor: "#DB4476",
			barTopColor: "#C53D6A",
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
			cursorType: "auto"
		};
		barChart.setOptions(cnfg);
		
		cnfg = {
			lineColor: "#6F006F",
			cursorType: "auto"
		};
		lineChart.setOptions(cnfg);
		
		cnfg = {
			cursorType: "auto"
		};
		pieChart.setOptions(cnfg);
	}
}

function drawChartsAndList(data){
	var place = $("#placeholder");
	place.empty();
	
	if ('undefined' !== typeof data) {
		if(data.length < 1){
			$("#slider-area").empty();
			showNotAvailbleMsg();
		} else {
			var value = $("#limitSlider").slider("value");
			var fromTo = value.split(';');
			var newData = getSlicedChartData(fromTo[0], fromTo[1]);
			
			//
			/*if (selectedType === "org") {
				firstFrom = fromTo[0];
				firstTo = fromTo[1];
			} else if (selectedType === "fac"){
				secondFrom = fromTo[0];
				secondTo = fromTo[1];
			} */
		
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

function initSlider(fromVal, toVal){
	var sliderArea = $("#slider-area");
	sliderArea.empty();
	
	var bElem = document.createElement("b");
	var text = document.createTextNode("Range: ");
	bElem.appendChild(text);
	sliderArea.append(bElem);
	
	var spanElem = document.createElement("span");
	spanElem.style.display = "inline-block";
	spanElem.style.width = "86%";
	spanElem.style.padding = "0 5px";
	
	var inputElem = document.createElement("input");
	inputElem.setAttribute("id", "limitSlider");
	inputElem.setAttribute("type", "slider");
	inputElem.setAttribute("name", "limit");
	inputElem.setAttribute("value", "1;250");
	
	spanElem.appendChild(inputElem);
	sliderArea.append(spanElem);
	
	if(toVal <= fromVal){
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
				drawChartsAndList(chartData);
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
        marginLeft: 30,
        chartTitle: "",
        xAxisTitle: "",
        yAxisTitle: "Number of researchers",
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
			marginTop: 20,
	        marginRight: 5,
	        marginBottom: 50,
	        marginLeft: 30,
	        chartTitle: "Number of researchers over area of interests",
	        xAxisTitle: "",
	        yAxisTitle: "",
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
	var text = document.createTextNode("Area of Interest");
	thElem1.appendChild(text);
	text = document.createTextNode("Value");
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
	$(".bar-tooltip").hide();
	$(".line-tooltip").hide();
	$(".pie-tooltip").hide();
	
	var divElem = document.createElement("div");
	divElem.style.paddingLeft = "16px";
	divElem.style.paddingRight = "16px";
	divElem.style.textAlign = "center";
	
	//var iDivElem = document.createElement("div");
	//var iconElem = document.createElement("i");
	//iconElem.setAttribute("class", "fa fa-info-circle 5x");
	//iDivElem.appendChild(iconElem);
	
	var h3Elem = document.createElement("h3");
	var text = document.createTextNode("Data not available");
	h3Elem.appendChild(text);
	
	//divElem.appendChild(iDivElem);
	divElem.appendChild(h3Elem);
	place.append(divElem);
}

function getSlicedChartData(fromValue, toValue){
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

