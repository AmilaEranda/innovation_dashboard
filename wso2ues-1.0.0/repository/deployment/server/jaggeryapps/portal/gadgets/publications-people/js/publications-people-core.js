var pref = new gadgets.Prefs();
var barChart, lineChart, pieChart;
var chartData, aoiData;
var chartType; // bar, line, pie, list
var selectedType, selectedPid;

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
	
	$("#pub-peo-back").hide();
	
	selectedType = "peo";
	
	selectedPid = null;
	
	initBarChart();
	
	initLineChart();
	
	initPieChart();
	
	//fetchData();
	fetchCustomData("peo", null, "");
	
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
		fetchCustomData("peo", null, "");
		
		//fetchCustomData();
		$(this).blur();
		setChartTitle("");
		$("#pub-peo-back").hide();
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
		fetchCustomData(selectedType, selectedPid);
		$("#ssaoi-selection").blur();
		if(selectedType == "peo"){
			$("#pub-peo-back").hide();
		}
	});
});

function fetchAOIData() {
	var url =  "../../portal/gadgets/publications-people/data-files/aoi-data.jag";
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
	var url = "../../portal/gadgets/publications-people/data-files/publications-people-data.jag";
	selectedType = "peo";
	$.ajax({
		url: url,
		type: "GET",
		dataType: "json",
		success: onDataReceived
	});
}

function fetchCustomData(type, pid, name) {
	var aoiId = $("#aoi-selection option:selected").val();
	var saoiId = $("#saoi-selection option:selected").val();
	var ssaoiId = $("#ssaoi-selection option:selected").val();
	
	selectedType = type;
	/*if(pid == null || "undefined" == typeof pid){
		selectedType = "peo";
	} else {
		selectedType = "yea";
	}*/
	selectedPid = pid;
	
	var url = "../../portal/gadgets/publications-people/data-files/publications-people-data.jag";
	
	$.ajax({
		url: url,
		type: "GET",
		dataType: "json",
		data: {
			pid: selectedPid,
			aoiId: aoiId,
			saoiId: saoiId,
			ssaoiId: ssaoiId
		},
		success: onDataReceived
	});
	
	setOptionsForCharts();
	
	setChartTitle(name);
	
	if(selectedType == "yea"){
		$("#pub-peo-back").show();
	}
}

function onDataReceived(data) {
	chartData = data.publications_count_data;
	
	if(chartData.length > 0){
		if(selectedType == "peo"){
			initSlider(1, chartData.length);
			var highVal = (chartData.length > 9) ? 9 : chartData.length;
			$("#limitSlider").slider('value', 0, (highVal + 1));
		} else if (selectedType == "yea"){
			var lowVal = parseInt(chartData[0].name);
			var highVal = parseInt(chartData[chartData.length - 1].name);
			initSlider(lowVal, highVal);
			$("#limitSlider").slider("value", (lowVal - 1), (highVal + 1));
		}
	}
	drawChartsAndList(chartData);
}

function setChartTitle(name){
	$("#chartState").text(name);
}

function setOptionsForCharts(){
	if("undefined" === typeof selectedType || selectedType === "peo"){
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
	} else if (selectedType === "yea"){
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
			cursorType: "auto"
		};
		pieChart.setOptions(cnfg);
	}
}

function drawChartsAndList(data){
	var place = $("#placeholder");
	place.empty();
	
	var value = $("#limitSlider").slider("value");
	var fromTo = value.split(';');
	var newData = getSlicedChartData(fromTo[0], fromTo[1]);

	if ('undefined' !== typeof data) {
		if(chartType === "bar"){
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

function initSlider(fromVal, toVal){
	var sliderArea = $("#slider-area");
	sliderArea.empty();
	
	var bElem = document.createElement("b");
	var text;
	if(selectedType == "peo"){
		text = document.createTextNode("Select: ");
	} else if(selectedType == "yea"){
		text = document.createTextNode("Year: ");
	}
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
	
	var tickArr = [];
	var step = 1;
	var dif = (toVal - fromVal) + 1;
	if(dif <= 10){
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
	for(var i = parseInt(fromVal); i <= parseInt(toVal); i = i + step){
		tickArr.push(i);
	}
	
	$("#limitSlider").slider({
		from: fromVal,
		to: toVal, 
		step: 1,
		//scale: tickArr,
		smooth: true, 
		round: 0, 
		dimension: "",
		skin: "round_plastic", // plastic, round, round_plastic, blue
		callback: function (value) {
			drawChartsAndList(chartData);
		}
	});
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
        yAxisTitle: "Number of publications",
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
	        marginLeft: 30,
	        chartTitle: "",
	        xAxisTitle: "",
	        yAxisTitle: "Number of publications",
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

function getSlicedChartData(fromValue, toValue){
	var truncData = [];
	if(selectedType == "peo"){
		if(chartData.length < toValue){
			toValue = chartData.length;
		}
		for(var i = fromValue - 1; i < toValue; i++){
			truncData.push(chartData[i]);
		}
	} else if (selectedType == "yea"){
		for(var i = 0; i < chartData.length; i++){
			var val = parseInt(chartData[i].name);
			if(val >= fromValue && val <= toValue){
				truncData.push(chartData[i]);
			}
		}
	}
	return truncData;
}

