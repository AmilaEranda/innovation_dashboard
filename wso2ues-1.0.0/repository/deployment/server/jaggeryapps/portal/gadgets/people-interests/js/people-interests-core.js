var pref = new gadgets.Prefs();
var barChart, lineChart, pieChart;
var chartData;
var chartType; // bar, line, pie, list
var selectedType;
var selectedAoiId, selectedAoiName;

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
	
	$("#peo-int-back").hide();
	
	selectedType = "aoi";
	
	initBarChart();
	
	initLineChart();
	
	initPieChart();
	
	fetchData();
	
	// on resize the window
	$(window).resize(function(){
		drawChartsAndList();
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
		if (selectedType === "ssaoi"){
			fetchCustomData("saoi", selectedAoiId, selectedAoiName);
		} else if (selectedType === "saoi"){
			fetchCustomData("aoi", 0, "");
			$("#peo-int-back").hide();
		}
		$(this).blur();
	});
	
	//console.clear();
});

function fetchData() {
	var url = "../../portal/gadgets/people-interests/data-files/people-interests-data.jag";
	selectedType = "aoi";
	
	$.ajax({
		url: url,
		type: "GET",
		dataType: "json",
		success: onDataReceived
	});
	
	setOptionsForCharts();
	
	setInfoForCharts();
}

function fetchCustomData(type, id, name) {
	var url = "../../portal/gadgets/people-interests/data-files/people-interests-data.jag";
	url =  url + "?type=" + type + "&id=" + id;
	selectedType = type;
	if (type === "saoi"){
		selectedAoiId = id;
		selectedAoiName = name;
	}
	
	$.ajax({
		url: url,
		type: "GET",
		dataType: "json",
		success: onDataReceived
	});
	
	setOptionsForCharts();
	
	setChartTitle(name, type);
	
	$("#peo-int-back").show();
	
	setInfoForCharts();
}

function onDataReceived(data) {
	chartData = data.people_count_data;
	drawChartsAndList(chartData);
}

function setChartTitle(name, type){
	if (type === "saoi"){
		$("#chartState").text(name);
	} else if (type === "ssaoi"){
		var newText = $("#chartState").text() + " / " + name;
		$("#chartState").text(newText);
	} else {
		$("#chartState").text(name);
	}
}

function setOptionsForCharts(){
	if ("undefined" === typeof selectedType || selectedType === "aoi") {
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
	} else if (selectedType === "saoi"){
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
	} else if (selectedType === "ssaoi"){
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
}

function drawChartsAndList(data){
	var place = $("#placeholder");
	place.empty();

	if ('undefined' !== typeof data) {
		if(chartType === "bar"){
			drawBarChart(data);
		} else if (chartType === "line"){
			drawLineChart(data);
		} else if (chartType === "pie"){
			drawPieChart(data);
		} else if (chartType === "list"){
			createList(data);
		}
	} else {
		if(chartType === "bar"){
			drawBarChart();
		} else if(chartType === "line"){
			drawLineChart();
		} else if(chartType === "pie"){
			drawPieChart();
		} else if(chartType === "list"){
			createList();
		}
	}
}

function initBarChart(){
	var data = [];
	var barChartOptions = {
        marginTop: 20,
        marginRight: 5,
        marginBottom: 50,
        marginLeft: 45,
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

/*function redrawBarChart(){
	//$("#placeholder").css({"width": "100%", "height": "90%"});
	barChart.draw();
}*/

function initLineChart(){
	var data = [];
	var lineChartOptions = {
			marginTop: 20,
	        marginRight: 5,
	        marginBottom: 50,
	        marginLeft: 45,
	        chartTitle: "",
	        xAxisTitle: "",
	        yAxisTitle: "Number of researchers",
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
	text = document.createTextNode("Number of People");
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

function setInfoForCharts(){
	$('#info-icon').tooltip('destroy');
	$("#info-icon").removeAttr("title");
	
	if (selectedType === "aoi") { // area of interest
		$("#info-icon").tooltip({
			animation: true,
			placement: "left",
			html: true,
			title: '<div style="text-align: left; font-size: 11px;"><p><i class="fa fa-info-circle fa-lg"></i>&nbsp; <b>Number of researchers and scientists</b> in areas of interest</p><p>Each data item is clickable.</p><p>Clicking on a data item will take you to the next sub areas of interest level</p></div>'
		});
	} else if (selectedType === "saoi") { // sub area of interest
		$("#info-icon").tooltip({
			animation: true,
			placement: "left",
			html: true,
			title: '<div style="text-align: left; font-size: 11px;"><p><i class="fa fa-info-circle fa-lg"></i>&nbsp; <b>Number of researchers and scientists</b> in sub areas of interest</p><p>Each data item is clickable.</p><p>Clicking on a data item will take you to the field of interest level</p></div>'
		});
	} else if (selectedType === "ssaoi") { // field of interest
		$("#info-icon").tooltip({
			animation: true,
			placement: "left",
			html: true,
			title: '<div style="text-align: left; font-size: 11px;"><p><i class="fa fa-info-circle fa-lg"></i>&nbsp; <b>Number of researchers and scientists</b> in fields of interest</p></div>'
		});
	}
}
