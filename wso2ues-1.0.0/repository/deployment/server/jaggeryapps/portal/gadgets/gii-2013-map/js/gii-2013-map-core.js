var pref = new gadgets.Prefs();
var mapData, pniData;
var dataStore;
var map;
var chartType; // map, bar, list
var indexBarChart;

$(document).ready(function(){
	// setting chart type
	chartType = pref.getString("chartType").toLowerCase();
	if (chartType !== "map" && chartType !== "bar" && chartType !== "list"){
		chartType = "map";
	}
	
	$(".btn-group button").removeClass("btn-success");
	if (chartType === "map"){
		$("#btnChartTypeMap").addClass("btn-success");
	} else if (chartType === "bar"){
		$("#btnChartTypeBar").addClass("btn-success");
	} else if (chartType === "list"){
		$("#btnChartTypeList").addClass("btn-success");
	} else {
		$("#btnChartTypeMap").addClass("btn-success");
	}
	
	dataStore = [];
	
	initMap();
	
	initIndexBarChart();
	
	fetchPiNIData();

	fetchCustomData();
	
	// on resize the window
	$(window).resize(function(){
		setWidthsForSelections();
		drawMapsChartsAndList();
	});
	
	// switching charts
	$(".btn-group button").click(function(){
		$(".btn-group button").removeClass("btn-success");
		$(this).addClass("btn-success");
		$(this).blur();
		chartType = $(this).text().toLowerCase();
		drawMapsChartsAndList();
	});
	
	$("#pillar-type-selection").change(function(d, i) {
		var pillarType = $("#pillar-type-selection option:selected").val();
		if (pillarType === "pi"){
			$("#pillar-selection").show();
			$("#ni-selection").show();
		} else {
			$('#pillar-selection option:first-child').attr("selected", "selected");
			$('#pillar-selection')[0].selectedIndex = 0;
			$('#ni-selection option:first-child').attr("selected", "selected");
			$('#ni-selection')[0].selectedIndex = 0;
		
			$("#pillar-selection").hide();
			$("#ni-selection").hide();
		}
		fetchCustomData();
		$("#pillar-type-selection").blur();
	});
	
	$("#pillar-selection").change(function(d, i) {
		initNISelection();
		$("#ni-selection").change();
		$("#pillar-selection").blur();
	});
	
	$("#ni-selection").change(function(d, i) {
		fetchCustomData();
		$("#ni-selection").blur();
	});
	
	setWidthsForSelections();
});

function fetchPiNIData() {
	var url =  "../../portal/gadgets/gii-2013-map/data-files/gii-2013-pillars-ni-data.jag";
	$.ajax({
		url: url,
		type: "GET",
		dataType: "json",
		success: onPiNIDataReceived
	});
}

function onPiNIDataReceived(data){
	pniData = data.pini_data;
	initPiSelection();
	initNISelection();
}

function initPiSelection(){
	var pillarSelection = $("#pillar-selection");
	for(var i = 0; i < pniData.length; i++){
		var optElem = document.createElement("option");
		optElem.setAttribute("value", pniData[i].id);
		var text = document.createTextNode(pniData[i].name);
		optElem.appendChild(text);
		pillarSelection.append(optElem);
	}
}

function initNISelection(){
	var pillarId = $("#pillar-selection option:selected").val();
	var niSelection = $("#ni-selection");
	niSelection.empty();
	
	var optElem = document.createElement("option");
	optElem.setAttribute("value", "0");
	var text = document.createTextNode("-- National Indicator --");
	optElem.appendChild(text);
	niSelection.append(optElem);

	for (var i = 0; i < pniData.length; i++){
		if (pniData[i].id == pillarId) {
			for(var j = 0; j < pniData[i].data.length; j++){
				var optElem = document.createElement("option");
				optElem.setAttribute("value", pniData[i].data[j].id);
				var text = document.createTextNode(pniData[i].data[j].name);
				optElem.appendChild(text);
				niSelection.append(optElem);
			}
			break;
		}
	}
}

function fetchCustomData() {
	disableControls();
	var pillarType = $("#pillar-type-selection option:selected").val();
	var piId = $("#pillar-selection option:selected").val();
	var niId = $("#ni-selection option:selected").val();
	
	var url = "../../portal/gadgets/gii-2013-map/data-files/gii-2013-map-data.jag";
	
	var prevData = getDataFromStore(pillarType, piId, niId);
	if ("undefined" !== typeof prevData){
		mapData = prevData;
		drawMapsChartsAndList();
		enableControls();
	} else {
		$.ajax({
			url: url,
			type: "GET",
			dataType: "json",
			data: {
				pillarType: pillarType,
				piId: piId,
				niId: niId
			},
			success: onDataReceived
		});
	}
	
	setInfoForCharts();
}

function onDataReceived(data) {
	mapData = data.gii_data;
	fillDataStore();
	drawMapsChartsAndList();
	enableControls();
}

function fillDataStore(){
	var pillarType = $("#pillar-type-selection option:selected").val();
	var piId = $("#pillar-selection option:selected").val();
	var niId = $("#ni-selection option:selected").val();
	var obj = {
		pillarType: pillarType,
		piId: piId,
		niId: niId,
		data: mapData
	}
	dataStore.push(obj);
}

function getDataFromStore(pillarType, piId, niId){
	for(var i = 0; i < dataStore.length; i++) {
        if (dataStore[i].pillarType === pillarType && dataStore[i].piId === piId && dataStore[i].niId === niId)
			return dataStore[i].data;
    }
}

function drawMapsChartsAndList(){
	if (chartType === "map") {
		drawMap();
	} else if (chartType === "bar") {
		drawIndexBarChart(mapData);
	} else if (chartType === "list") {
		createList();
	}
}

function drawMap(){
	$("#placeholderList").hide();
	var place = $("#placeholder");
	place.empty();
	place.show();
	$("#srcContent").show();
	
	map.colorSteps = 10;
	map.dataProvider.areas = mapData;
	
	var minScore = getMinScore(); // mapData[mapData.length - 1].value;
	var maxScore = mapData[0].value;
	var temp;
	if (minScore > maxScore) {
		temp = minScore;
		minScore = maxScore;
		maxScore = temp;
	}
	
	var valueLegend = new AmCharts.ValueLegend();
	valueLegend.right = 10;
	valueLegend.minValue = minScore;
	valueLegend.maxValue = maxScore;
	valueLegend.showAsGradient = true;
	
	map.valueLegend = valueLegend;
	
	var pillarType = $("#pillar-type-selection option:selected").val();
	var niId = $("#ni-selection option:selected").val();
	map.titles = [];
	if (pillarType === "gv") {
		map.addTitle("The Global Innovation Index 2013", 18, "#000000", 1, true);// (text, size, color, alpha, bold)
	} else if (pillarType === "pi" && niId === "0") {
		var pillarName = $("#pillar-selection option:selected").text();
		map.addTitle("GII 2013 - " + pillarName, 16, "#000000", 1, true);
	} else {
		var pillarName = $("#pillar-selection option:selected").text();
		var niName = $("#ni-selection option:selected").text();
		map.addTitle(pillarName + " - " + niName, 14, "#000000", 1, true);
	}
	map.validateNow();
	
	//map.clear();
	//map.clearMap();
	
	map.validateData();
	
	map.write("placeholder");
}

function createList(){
	var data = mapData;
	
	$("#placeholder").hide();
	var place = $("#placeholderList");
	place.empty();
	place.show();
	$("#srcContent").hide();
	
	var divElem = document.createElement("div");
	divElem.style.paddingLeft = "16px";
	divElem.style.paddingRight = "16px";
	
	// title
	var pillarType = $("#pillar-type-selection option:selected").val();
	var niId = $("#ni-selection option:selected").val();
	map.titles = [];
	var divTitleElem = document.createElement("div");
	var h4TitleElem = document.createElement("h4");
	h4TitleElem.setAttribute("style", "font-weight: bold; color: #000000; text-align: center;");
	var titleText = document.createTextNode("");
	
	if (pillarType === "gv") {
		titleText = document.createTextNode("The Global Innovation Index 2013");
	} else if (pillarType === "pi" && niId === "0") {
		var pillarName = $("#pillar-selection option:selected").text();
		titleText = document.createTextNode("GII 2013 - " + pillarName);
	} else {
		var pillarName = $("#pillar-selection option:selected").text();
		var niName = $("#ni-selection option:selected").text();
		titleText = document.createTextNode(pillarName + " - " + niName);
	}
	h4TitleElem.appendChild(titleText);
	divTitleElem.appendChild(h4TitleElem);
	divElem.appendChild(divTitleElem);
	
	// table
	var tableElem = document.createElement("table");
	tableElem.setAttribute("class", "table table-striped");
	var theadElem = document.createElement("thead");
	
	// heading row
	var trElem = document.createElement("tr");
	var thElem0 = document.createElement("th");
	thElem0.style.width = "5%";
	var thElem1 = document.createElement("th");
	thElem1.style.width = "45%";
	var thElem2 = document.createElement("th");
	thElem2.style.width = "25%";
	var thElem3 = document.createElement("th");
	thElem3.style.width = "25%";
	
	var text = document.createTextNode("#");
	thElem0.appendChild(text);
	text = document.createTextNode("Country Name");
	thElem1.appendChild(text);
	text = document.createTextNode("Score");
	thElem2.appendChild(text);
	text = document.createTextNode("Rank");
	thElem3.appendChild(text);
	
	trElem.appendChild(thElem0);
	trElem.appendChild(thElem1);
    trElem.appendChild(thElem2);
    trElem.appendChild(thElem3);
	theadElem.appendChild(trElem);
    tableElem.appendChild(theadElem);
	
	var tbodyElem = document.createElement("tbody");
	for (var i = 0; i < data.length; i++) {
		trElem = document.createElement("tr");
		var tdElem0 = document.createElement("td");
		var tdElem1 = document.createElement("td");
		var tdElem2 = document.createElement("td");
		var tdElem3 = document.createElement("td");
		
		text = document.createTextNode(i+1);
		tdElem0.appendChild(text);
		
		text = document.createTextNode(data[i].title);
		tdElem1.appendChild(text);
		
		text = document.createTextNode(data[i].score);
		tdElem2.appendChild(text);
		
		text = document.createTextNode(data[i].rank);
		tdElem3.appendChild(text);
		
		trElem.appendChild(tdElem0);
		trElem.appendChild(tdElem1);
        trElem.appendChild(tdElem2);
        trElem.appendChild(tdElem3);
		
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

function getMinScore(){
	var minVal = parseFloat(mapData[mapData.length - 1].value);
	var tempVal = 0;
	if(isNaN(minVal) || minVal === null){
		for (var i = mapData.length - 2; i > 0; i--){
			tempVal = parseFloat(mapData[i].value);
			if(!isNaN(tempVal)){
				minVal = tempVal;
				break;
			}
		}
	}
	return minVal;
}

function initMap(){
	// create AmMap object
	map = new AmCharts.AmMap();
	map.pathToImages = "../../portal/gadgets/gii-2013-map/css/ammap/images/";

	map.dataProvider = {
		map: "worldLow",
		getAreasFromMap: false
	}; 

	map.areasSettings = {
		autoZoom: true,
		unlistedAreasColor: "#aaaaaa",
		unlistedAreasOutlineColor: "#dddddd",
		color: "#e5eeed", // Color of area with lowest value
		colorSolid: "#00594d", // Color of area with highest value
		outlineColor: "#dddddd",
		rollOverColor: "#FDA800",
		rollOverOutlineColor: "#FD6500",
		selectedColor: "#FDA800",
		selectedOutlineColor: "#FD6500",
		balloonText: "<h4>[[title]]</h4>[[customData]]"
	};
	
	map.legend = {
		width: "180",
		backgroundAlpha: 0.4,
		backgroundColor: "#FFFFFF",
		position: "absolute",
		bottom: -50,
		left: 30,
		horizontalGap: 4,
		data: [
			{
				title: "Data Not Available",
				color: "#aaa"
			}
		]
	};
	
	map.zoomControl = {
		buttonFillColor: "#57928a",
		buttonRollOverColor: "#00594d"
	};
	
	//var balloon = map.balloon;

	//map.smallMap = new AmCharts.SmallMap();

	//map.write("placeholder");
}

function initIndexBarChart(){
	var data = [];
	var indexBarChartOptions = {
        marginTop: 5,
        marginRight: 10,
        marginBottom: 20,
        marginLeft: 10,
        chartTitle: "Lorem ipsum dollar sit amet fubkus wet a keen knowledge",
        barColor: "#00594d",
		barLKColor: "#b42d00",
        barBorderColor: "#e5eeed",
        barHighlightColor: "#FF7900",
        barBorderHighlightColor: "#e5eeed"
    };
	indexBarChart = new IndexBarChart("placeholder", data, indexBarChartOptions);
}

function drawIndexBarChart(data){
	$("#placeholderList").hide();
	var place = $("#placeholder");
	place.empty();
	place.show();
	$("#srcContent").show();
	
	// title
	var pillarType = $("#pillar-type-selection option:selected").val();
	var niId = $("#ni-selection option:selected").val();
	var indexBarChartOptions;
	if (pillarType === "gv") {
		indexBarChartOptions = {
			chartTitle: "The Global Innovation Index 2013"
		};
	} else if (pillarType === "pi" && niId === "0") {
		var pillarName = $("#pillar-selection option:selected").text();
		indexBarChartOptions = {
			chartTitle: "GII 2013 - " + pillarName
		};
	} else {
		var pillarName = $("#pillar-selection option:selected").text();
		var niName = $("#ni-selection option:selected").text();
		indexBarChartOptions = {
			chartTitle: pillarName + " - " + niName
		};
	}
	
	if ('undefined' !== typeof data) {
		indexBarChart.setData(data);
	}
	if ('undefined' !== typeof indexBarChartOptions) {
		indexBarChart.setOptions(indexBarChartOptions);
	}
	indexBarChart.draw();
}

function setInfoForCharts(){
	$('#info-icon').tooltip('destroy');
	$("#info-icon").removeAttr("title");
	
	var pillarType = $("#pillar-type-selection option:selected").val();
	var niId = $("#ni-selection option:selected").val();
	
	if(pillarType === "gv"){ // global values
		$("#info-icon").tooltip({
			animation: true,
			placement: "left",
			html: true,
			title: '<div style="text-align: left; font-size: 11px;"><h5><i class="fa fa-info-circle fa-lg"></i> GII - 2013</h5><p>A composite indicator that ranks countries/economies in terms of their enabling environment to innovation and their innovation outputs. It is co-published by Cornell University, INSEAD and the World Intellectual Property Organization (WIPO).</p></div>'
		});
	} else if (pillarType === "pi") { // pillar
		$("#info-icon").tooltip({
			animation: true,
			placement: "left",
			html: true,
			title: '<div style="text-align: left; font-size: 11px;"><h5><i class="fa fa-info-circle fa-lg"></i> GII - 2013</h5><p>A composite indicator that ranks countries/economies in terms of their enabling environment to innovation and their innovation outputs. It is co-published by Cornell University, INSEAD and the World Intellectual Property Organization (WIPO).</p></div>'
		});
	}
}

function setWidthsForSelections(){
	var place = $("#placeholder");
	var placeWidth = place.width();
	
	var pillarTypeSelection = $("#pillar-type-selection");
	var pillarSelection = $("#pillar-selection");
	var niSelection = $("#ni-selection");
	
	var pillarTypeSelectionWidth = 20;
	var pillarSelectionWidth = 20;
	var niSelectionWidth = 20;
	
	if (placeWidth < 320){
		pillarTypeSelectionWidth = 30;
		pillarSelectionWidth = 15;
		niSelectionWidth = 45;
	} else if (placeWidth < 350){
		pillarTypeSelectionWidth = 40;
		pillarSelectionWidth = 25;
		niSelectionWidth = 55;
	} else if (placeWidth < 380){
		pillarTypeSelectionWidth = 50;
		pillarSelectionWidth = 35;
		niSelectionWidth = 65;
	} else if (placeWidth < 410){ // 2x2 in wide screen
		pillarTypeSelectionWidth = 60;
		pillarSelectionWidth = 45;
		niSelectionWidth = 75;
	} else if (placeWidth < 440){
		pillarTypeSelectionWidth = 70;
		pillarSelectionWidth = 55;
		niSelectionWidth = 85;
	} else if (placeWidth < 470){
		pillarTypeSelectionWidth = 80;
		pillarSelectionWidth = 65;
		niSelectionWidth = 95;
	} else if (placeWidth < 500){
		pillarTypeSelectionWidth = 90;
		pillarSelectionWidth = 75;
		niSelectionWidth = 105;
	} else if (placeWidth < 530){
		pillarTypeSelectionWidth = 100;
		pillarSelectionWidth = 85;
		niSelectionWidth = 115;
	} else if (placeWidth < 560) {
		pillarTypeSelectionWidth = 110;
		pillarSelectionWidth = 95;
		niSelectionWidth = 125;
	} else if (placeWidth < 590) {
		pillarTypeSelectionWidth = 120;
		pillarSelectionWidth = 105;
		niSelectionWidth = 135;
	} else if (placeWidth < 620) {
		pillarTypeSelectionWidth = 130;
		pillarSelectionWidth = 115;
		niSelectionWidth = 145;
	} else if (placeWidth < 650) { // 3x3 in wide screen
		pillarTypeSelectionWidth = 140;
		pillarSelectionWidth = 125;
		niSelectionWidth = 155;
	} else if (placeWidth < 680) {
		pillarTypeSelectionWidth = 140;
		pillarSelectionWidth = 135;
		niSelectionWidth = 165;
	} else if (placeWidth < 710) {
		pillarTypeSelectionWidth = 140;
		pillarSelectionWidth = 145;
		niSelectionWidth = 175;
	} else {
		pillarTypeSelectionWidth = 140;
		pillarSelectionWidth = 220;
		niSelectionWidth = 240;
	}
	
	pillarTypeSelection.css({"width": pillarTypeSelectionWidth + "px"});
	pillarSelection.css({"width": pillarSelectionWidth + "px"});
	niSelection.css({"width": niSelectionWidth + "px"});
}

function disableControls(){
	$("#btnChartTypeMap").attr("disabled", "disabled");
	$("#btnChartTypeBar").attr("disabled", "disabled");
	$("#btnChartTypeList").attr("disabled", "disabled");
	
	$("#pillar-type-selection").attr("disabled", "disabled");
	$("#pillar-selection").attr("disabled", "disabled");
	$("#ni-selection").attr("disabled", "disabled");
}

function enableControls(){
	$("#btnChartTypeMap").removeAttr("disabled");
	$("#btnChartTypeBar").removeAttr("disabled");
	$("#btnChartTypeList").removeAttr("disabled");
	
	$("#pillar-type-selection").removeAttr("disabled");
	$("#pillar-selection").removeAttr("disabled");
	$("#ni-selection").removeAttr("disabled");
}
