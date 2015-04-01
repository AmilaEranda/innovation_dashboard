var pref = new gadgets.Prefs();
var multilineChart;
var chartData, countriesData, PillarData;
var chartType; // line, list
var selectedAoiId, selectedAoiName, selectedSaoiId, selectedSaoiName;

$(document).ready(function(){
	// setting chart type
	chartType = pref.getString("chartType").toLowerCase();
	if (chartType !== "line" && chartType !== "list") {
		chartType = "line";
	}
	
	$(".btn-group button").removeClass("btn-success");
	if (chartType === "line") {
		$("#btnChartTypeLine").addClass("btn-success");
	} else if (chartType === "list") {
		$("#btnChartTypeList").addClass("btn-success");
	} else {
		$("#btnChartTypeLine").addClass("btn-success");
	}
	
	$("#country-selection").select2({
		placeholder: "Select a Country",
		allowClear: true,
		maximumSelectionLength: 5
	});
	
	initMultiLineChart();
	
	fetchCountriesPiData();
	
	fetchCustomData();
	
	// on resize the window
	$(window).resize(function(){
		setWidthsForSelects();
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
	
	$("#pillar-type-selection").change(function(d, i) {
		var pillarType = $("#pillar-type-selection option:selected").val();
		if (pillarType === "pi"){
			$("#pillar-selection").show();
		} else {
			$('#pillar-selection option:first-child').attr("selected", "selected");
			$('#pillar-selection')[0].selectedIndex = 0;
		
			$("#pillar-selection").hide();
		}
		fetchCustomData();
		$("#pillar-type-selection").blur();
	});
	
	// select country
	$("#country-selection").change(function(d, i) {
		fetchCustomData();
	});
	
	// select pillar
	$("#pillar-selection").change(function(d, i) {
		fetchCustomData();
	});
	
	setWidthsForSelects();
});

function fetchCountriesPiData() {
	var url =  "../../portal/gadgets/gii-comparison-score/data-files/countries-pi-data.jag";
	$.ajax({
		url: url,
		type: "GET",
		dataType: "json",
		success: onCountriesPiDataReceived
	});
}

function onCountriesPiDataReceived(data){
	countriesData = data.cou_data;
	PillarData = data.pi_data;
	initCountrySelection();
	initPiSelection();
}

function initCountrySelection(){
	var countrySelection = $("#country-selection");
	for (var i = 0; i < countriesData.length; i++) {
		var optElem = document.createElement("option");
		optElem.setAttribute("value", countriesData[i].ccode);
		var text = document.createTextNode(countriesData[i].cname);
		optElem.appendChild(text);
		countrySelection.append(optElem);
	}
}

function initPiSelection(){
	var piSelection = $("#pillar-selection");
	for (var i = 0; i < PillarData.length; i++) {
		var optElem = document.createElement("option");
		optElem.setAttribute("value", PillarData[i].piname);
		var text = document.createTextNode(PillarData[i].piname);
		optElem.appendChild(text);
		piSelection.append(optElem);
	}
}

function fetchCustomData() {
	disableControls();
	var pillarType = $("#pillar-type-selection option:selected").val();
	var pillar = $("#pillar-selection option:selected").val();
	var ccode = $("#country-selection").val();
	var url = "../../portal/gadgets/gii-comparison-score/data-files/gii-comparison-score-data.jag";
	
	$.ajax({
		url: url,
		type: "GET",
		dataType: "json",
		data: {
			type: pillarType,
			pillar: pillar,
			coucodes: JSON.stringify(ccode)
		},
		success: onDataReceived
	});
	
	setOptionsForCharts();
	
	setInfoForCharts();
}

function onDataReceived(data) {
	chartData = data.gii_data;
	drawChartsAndList(chartData);
	enableControls();
}

function setOptionsForCharts(){
	var pillarType = $("#pillar-type-selection option:selected").val();
	var chartTitle = "";
	if (pillarType === "gv"){
		chartTitle = "Global Values";
	} else if (pillarType === "pi") {
		var pillar = $("#pillar-selection option:selected").val();
		chartTitle = pillar;
	}
	var cnfg = {
		chartTitle: chartTitle
	};
	multilineChart.setOptions(cnfg);
}

function drawChartsAndList(data){
	var place = $("#placeholder");
	place.empty();
	
	if ("undefined" === typeof data || data === null) {
		data = chartData;
	}
	
	if (chartType === "line"){
		drawMultiLineChart(data);
	} else if (chartType === "list"){
		createList(data);
	}
}

function initMultiLineChart(){
	var data = [];
	var multilineChartOptions = {
			marginTop: 20,
	        marginRight: 5,
	        marginBottom: 50,
	        marginLeft: 45,
	        chartTitle: "",
	        xAxisTitle: "",
	        yAxisTitle: "Score",
	        lineColor: "#A52A2A",
	        valuePrecision: 2,
	        nanMessage: "Data not available",
			cursorType: "auto",
			colors: ["#3366CC", "#DC3912", "#FF9900", "#109618", "#990099", "#0099C6", "#DD4477", "#AAAA11", "#E67300", "#B77322", "#16D620", "#3366CC", "#DC3912", "#FF9900", "#109618", "#990099", "#0099C6", "#DD4477", "#AAAA11", "#E67300", "#B77322", "#16D620"],
			legendPosition: "e",
			legendHorizontalGap: 30,
			legendWidth: 100
    };
	multilineChart = new MultiLineChart("placeholder", data, multilineChartOptions);
}

function drawMultiLineChart(data, options){
	$("#srcContent").show();
	if ('undefined' !== typeof data) {
		multilineChart.setData(data);
	}
	if ('undefined' !== typeof options) {
		multilineChart.setOptions(options);
	}
	multilineChart.draw();
}

function createList(data){
	if('undefined' === typeof data){
		data = chartData;
	}
	$("#srcContent").hide();
	var place = $("#placeholder");
	
	var divElem = document.createElement("div");
	divElem.style.paddingLeft = "16px";
	divElem.style.paddingRight = "16px";
	
	// title
	var pillarType = $("#pillar-type-selection option:selected").val();
	var divTitleElem = document.createElement("div");
	var h4TitleElem = document.createElement("h4");
	h4TitleElem.setAttribute("style", "font-weight: bold; color: #000000; text-align: center;");
	var titleText = document.createTextNode("");
	
	if (pillarType === "gv") {
		titleText = document.createTextNode("The Global Innovation Index");
	} else if (pillarType === "pi") {
		var pillarName = $("#pillar-selection option:selected").text();
		titleText = document.createTextNode(pillarName);
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
	var thElem1 = document.createElement("th");
	thElem1.style.width = "40%";
	var text = document.createTextNode("Country");
	thElem1.appendChild(text);
	trElem.appendChild(thElem1);
	
	// finding max num of years
	var maxYears = 1;
	var maxYearsIndex = 0;
	var yearsArr = [];
	for (var i = 0; i < data.length; i++) {
		if (maxYears < data[i].data.length) {
			maxYears = data[i].data.length;
			maxYearsIndex = i;
		}
	}
	
	// create th s for years
	for (var i = 0; i < maxYears; i++) {
		var thElem = document.createElement("th");
		var colWidthPct = 60 / maxYears;
		thElem.style.width = colWidthPct + "%";
		text = document.createTextNode(data[maxYearsIndex].data[i].name);
		yearsArr.push(parseInt(data[maxYearsIndex].data[i].name));
		thElem.appendChild(text);
		trElem.appendChild(thElem);
	}
	
	theadElem.appendChild(trElem);
    tableElem.appendChild(theadElem);
	
	var tbodyElem = document.createElement("tbody");
	for (var i = 0; i < data.length; i++) {
		trElem = document.createElement("tr");
		var tdElem1 = document.createElement("td");
		var text = document.createTextNode(data[i].linename);
		tdElem1.appendChild(text);
		trElem.appendChild(tdElem1);
		var ii = 0;
		
		for (var j = 0; j < maxYears; j++) {
			var tdElem = document.createElement("td");
			var tempVal = data[i].data[ii];
			if ("undefined" !== typeof tempVal && tempVal !== null) {
				if (yearsArr[j] === parseInt(data[i].data[ii].name)) {
					text = document.createTextNode(data[i].data[ii].value);
					ii = ii + 1;
				} else {
					text = document.createTextNode("--");
				}
			} else {
				text = document.createTextNode("--");
			}
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
	text = document.createTextNode("Source: The Global Innovation Index, ");
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
	
	var pillarType = $("#pillar-type-selection option:selected").val();
	
	if (pillarType === "gv") { // global values
		$("#info-icon").tooltip({
			animation: true,
			placement: "left",
			html: true,
			title: '<div style="text-align: left; font-size: 11px;"><p><i class="fa fa-info-circle fa-lg"></i>&nbsp; <b>Scores</b> in Global Innovation Index</p><p>Select a country to compare values with Sri Lanka</p><p>Change global values to pillars in the drop-down menu in order to compare pillar scores with Sri Lanka</p></div>'
		});
	} else if (pillarType === "pi") { // pillar
		$("#info-icon").tooltip({
			animation: true,
			placement: "left",
			html: true,
			title: '<div style="text-align: left; font-size: 11px;"><p><i class="fa fa-info-circle fa-lg"></i>&nbsp; <b>Scores</b> of the pillars in Global Innovation Index</p><p>Select a country to compare scores with Sri Lanka</p></div>'
		});
	}
}

function setWidthsForSelects(){
	var place = $("#placeholder");
	var placeWidth = place.width();
	
	var piTypeSelWidth = $("#pillar-type-selection").width();
	var piSelWidth = $("#pillar-selection").width();
	var buttonsWidth = 180; // line & list buttons width
	
	var couSel = $("#country-selection");
	
	$("#country-selection").select2({
		placeholder: "Select a Country",
		allowClear: true,
		width: (placeWidth - buttonsWidth - piTypeSelWidth - piSelWidth) + "px" 
	});
}

function disableControls(){
	$("#btnChartTypeLine").attr("disabled", "disabled");
	$("#btnChartTypeList").attr("disabled", "disabled");
	$("#country-selection").attr("disabled", "disabled");
	$("#pillar-type-selection").attr("disabled", "disabled");
	$("#pillar-selection").attr("disabled", "disabled");
}

function enableControls(){
	$("#btnChartTypeLine").removeAttr("disabled");
	$("#btnChartTypeList").removeAttr("disabled");
	$("#country-selection").removeAttr("disabled");
	$("#pillar-type-selection").removeAttr("disabled");
	$("#pillar-selection").removeAttr("disabled");
}
