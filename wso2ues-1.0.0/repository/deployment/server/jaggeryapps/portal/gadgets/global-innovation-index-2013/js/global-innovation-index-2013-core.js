var pref = new gadgets.Prefs();
var radarChart, groupedBarChart;
var chartData;
var chartType; // radar, bar, list

$(document).ready(function(){
	chartType = pref.getString("chartType").toLowerCase(); // "radar";
	if(chartType !== "radar" && chartType !== "bar" && chartType !== "list"){
		chartType = "radar";
	}
	
	$(".btn-group button").removeClass("btn-success");
	if (chartType === "radar"){
		$("#btnChartTypeRadar").addClass("btn-success");
	} else if (chartType === "bar"){
		$("#btnChartTypeBar").addClass("btn-success");
	} else if (chartType === "list"){
		$("#btnChartTypeList").addClass("btn-success");
	} else {
		$("#btnChartTypeRadar").addClass("btn-success");
	}
	
	$("#gii-2013-back").hide();
	
	initRadarChart();
	
	initGroupedBarChart();
	
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
		fetchData();
		$(this).blur();
		setChartTitle("");
		
		$("#gii-2013-back").hide();
	});
});

function fetchData() {
	var url = "../../portal/gadgets/global-innovation-index-2013/data-files/global-innovation-index-2013-data.jag";
	$.ajax({
		url: url,
		type: "GET",
		dataType: "json",
		success: onDataReceived
	});
	
	setInfoForCharts();
}

function fetchCustomData(id, name) {
	var url = "../../portal/gadgets/global-innovation-index-2013/data-files/global-innovation-index-2013-data.jag";
	$.ajax({
		url: url,
		type: "GET",
		dataType: "json",
		data: {
			pillarId: id
		},
		success: onDataReceived
	});
	setChartTitle(name);
	
	$("#gii-2013-back").show();
}

function onDataReceived(data) {
	chartData = data.radar_data;
	drawChartsAndList(chartData);
}

function setChartTitle(name){
	$("#chartState").text(name);
}

function drawChartsAndList(data){
	var place = $("#placeholder");
	place.empty();

	$("#srcContent").show();
	if ('undefined' !== typeof data) {
		if(chartType === "radar"){
			drawRadarChart(data);
		} else if (chartType === "bar"){
			drawGroupedBarChart(data);
		} else if (chartType === "list"){
			createList(data);
		}
	} else {
		if(chartType === "radar"){
			drawRadarChart();
		} else if(chartType === "bar"){
			drawGroupedBarChart();
		} else if(chartType === "list"){
			createList();
		}
	}
}

function initRadarChart(){
	var data = [];
	
	var radarChartOptions = {
        marginTop: 10,
        marginRight: 100,
        marginBottom: 20,
        marginLeft: 0,
        //w: 140, // w and h should be equal
        //h: 140,
        //maxValue: 60, // maximum axis value, if actual values are below than this
        levels: 5, // number of circles in the web
        //ExtraWidthX: 480, // extra horizontal space in addition to w
        //ExtraWidthY: 110, // extra vertical space in addition to h
        factor: 1, // size of the spider web
        factorLegend: 1, // distance from center to leg text
        radians: 2 * Math.PI, // angle of the web. starting from top
        ToRight: 8, // distance between y axis and axis labels
        //TranslateX: 210, // horizontal translation from left
        //TranslateY: 65, // vertical translation from top
        valuePrecision: 2, // number of decimal points in values
        colors: ["#b42d00", "#FF7900", "#196A5F", "#109618", "#990099", "#DC3912", "#3366CC"]
    };

    radarChart = new NormRadarChart("placeholder", data, radarChartOptions);
}

function drawRadarChart(data, options){
	if ('undefined' !== typeof data) {
		radarChart.setData(data);
	}
	if ('undefined' !== typeof options) {
		radarChart.setOptions(options);
	}
	radarChart.draw();
}

function initGroupedBarChart(){
	var data = [];
	var groupedBarChartOptions = {
        marginTop: 40,
		marginRight: 20,
		marginBottom: 50,
		marginLeft: 50,
		chartTitle: "",
		xAxisTitle: "",
		yAxisTitle: "Score",
		barHighlightColor: "#be4620",
		barHighlightColorRotationDegree: 10,
		barBorderColor: "#23415a",
		barBorderHighlightColor: "#531400",
		colors: ["#109618", "#990099", "#DC3912", "#990099", "#0099C6", "#3366CC", "#DC3912", "#FF9900", "#109618", "#990099"],
		colorRotationDegree: 20
    };
	groupedBarChart = new GroupedBarChart("placeholder", data, groupedBarChartOptions);
}

function drawGroupedBarChart(data, options){
	var convData;
	if ('undefined' !== typeof data) {
		convData = getConvertedDataInBarFormat(data);
		groupedBarChart.setData(convData);
	}
	if ('undefined' !== typeof options) {
		groupedBarChart.setOptions(options);
	}
	//getConvertedDataInBarFormat(data);
	groupedBarChart.draw();
}

function getConvertedDataInBarFormat(data){
	var newData = [];
	var outerLength = data.length;
	var innerLength = data[0].data.length;
	
	for(var i = 0; i < innerLength; i++){
		var newOutObj = {};
		newOutObj.name = data[0].data[i].axis;
		newOutObj.data = [];
		for(var j = 0; j < outerLength; j++){
			var newInObj = {};
			newInObj.axis = data[j].name;
			newInObj.value = data[j].data[i].dispvalue;
			newInObj.id = data[j].data[i].id;
			newOutObj.data.push(newInObj);
		}
		newData.push(newOutObj);
	}
	return newData;
}

function createList(data){
	if('undefined' === typeof data){
		data = chartData;
	}
	var place = $("#placeholder");
	$("#srcContent").hide();
	
	var divElem = document.createElement("div");
	divElem.style.paddingLeft = "16px";
	divElem.style.paddingRight = "16px";
	
	var tableElem = document.createElement("table");
	tableElem.setAttribute("class", "table table-striped");
	var theadElem = document.createElement("thead");
	
	// heading row
	var trElem = document.createElement("tr");
	var thElem1 = document.createElement("th");
	thElem1.style.width = "40%";
	var text = document.createTextNode("Pillar");
	thElem1.appendChild(text);
	trElem.appendChild(thElem1);
	for(var i = 0; i < data.length; i++){
		var thElem = document.createElement("th");
		var text = document.createTextNode(data[i].name);
		thElem.appendChild(text);
		trElem.appendChild(thElem);
	}
	theadElem.appendChild(trElem);
    tableElem.appendChild(theadElem);
	
	var outerLength = data.length;
	var innerLength = data[0].data.length;
	
	var tbodyElem = document.createElement("tbody");
	
	for(var i = 0; i < innerLength; i++){
		trElem = document.createElement("tr");
		var tdElem = document.createElement("td");
		var text = document.createTextNode(data[0].data[i].axis);
		tdElem.appendChild(text);
		trElem.appendChild(tdElem);
		
		for(var j = 0; j < outerLength; j++){
			tdElem = document.createElement("td");
			var strValue = "";
			if(data[j].data[i].dispvalue !== null){
				strValue = data[j].data[i].dispvalue.toFixed(2);
				strValue = +strValue;
			} else {
				strValue = "n/a";
			}
			text = document.createTextNode(strValue);
			tdElem.appendChild(text);
			trElem.appendChild(tdElem);
		}
		
		tbodyElem.appendChild(trElem);
	}
	tableElem.appendChild(tbodyElem);
	
	divElem.appendChild(tableElem);
	
	//src
	var divSrcElem = document.createElement("div");
	divSrcElem.style.textAlign = "right";
	var spanElem = document.createElement("span");
	spanElem.style.fontSize = "9px";
	text = document.createTextNode("Source: Cornell University, INSEAD, and WIPO (2013): The Global Innovation Index 2013, ");
	spanElem.appendChild(text);
	
	var aElem = document.createElement("a");
	aElem.setAttribute("href", "http://www.globalinnovationindex.org/");
	aElem.setAttribute("target", "_blank");
	aElem.style.fontSize = "9px";
	text = document.createTextNode("www.globalinnovationindex.org");
	aElem.appendChild(text);
	
	divSrcElem.appendChild(spanElem);
	divSrcElem.appendChild(aElem);
	divElem.appendChild(divSrcElem);
	
	place.append(divElem);
}

function setInfoForCharts(){
	$('#info-icon').tooltip('destroy');
	$("#info-icon").removeAttr("title");
	
	$("#info-icon").tooltip({
		animation: true,
		placement: "left",
		html: true,
		title: '<div style="text-align: left; font-size: 11px;"><h5><i class="fa fa-info-circle fa-lg"></i> GII - 2013</h5><p>The Global Innovation Index 2013: The Local Dynamics of Innovation is the result of a collaboration between Cornell University, INSEAD, and the World Intellectual Property Organization (WIPO) as co-publishers, and their Knowledge Partners.</p></div>'
	});
}
