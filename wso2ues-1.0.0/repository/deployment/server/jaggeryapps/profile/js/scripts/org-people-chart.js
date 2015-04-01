var resPieChart, resBarChart;
var resChartData;
var resSelectedType;
var resChartType;
var resSelectedAoiId, resSelectedAoiName;

$(document).ready(function(){
	
	resSelectedType = "aoi";
	resChartType = "pie";
	
	initResPieChart();
	initResBarChart();

	fetchPeopleCountData("aoi", null, "");
	
	// on resize the window
	$(window).resize(function(){
		drawResChartsAndList();
	});
	
	$("#peo-chart-back").click(function(){
		if (resSelectedType === "saoi") {
			fetchPeopleCountData("aoi", null, "");
		} else if (resSelectedType === "ssaoi") {
			fetchPeopleCountData("saoi", resSelectedAoiId, resSelectedAoiName);
		}
		$(this).blur();
	});
	
	// switching charts
	$("input:radio[name=peo-view]").change(function() {
        resChartType = $("input:radio[name=peo-view]:checked").val();
        drawResChartsAndList();
    });
	
});

function fetchPeopleCountData(type, id, aoiName) {
	var url =  "scripts/org-people-count-data.jag";
	var oidParameter = $("#orgid").val();
	resSelectedType = type;
	
	if (resSelectedType === "saoi") {
		resSelectedAoiId = id;
		resSelectedAoiName = aoiName;
	}
	
	$.ajax({
		url: url,
		type: "GET",
		dataType: "json",
		data: {
			oid: oidParameter,
			type: resSelectedType,
			id: id
		},
		success: onPeopleCountDataReceived
	});
	
	if (resSelectedType !== "aoi") {
		$("#peo-chart-back").show();
	} else {
		$("#peo-chart-back").hide();
	}
	
	setOptionsForResCharts();
	
	setResChartTitle(aoiName, type);
}

function onPeopleCountDataReceived(data) {
	resChartData = data.psn_count_data;
	drawResChartsAndList(resChartData);
}

function drawResChartsAndList(data){
	var place = $("#res-chart-holder");
	place.empty();
	
	if ("undefined" === typeof data || data === null) {
		data = resChartData;
	}
	
	if (hasValidResData(data)) {
		if (resChartType === "pie") {
			drawResPieChart(data);
		} else if (resChartType === "bar") {
			drawResBarChart(data);
		}
	} else {
		showResNotAvailbleMsg();
	}
}

function setOptionsForResCharts(){
	if ("undefined" === typeof resSelectedType || resSelectedType === "aoi") {
		var cnfg = {
			barBottomColor: "#3365CA",
			barTopColor: "#254A94",
			cursorType: "pointer"
		};
		resBarChart.setOptions(cnfg);
		
		cnfg = {
			cursorType: "pointer"
		};
		resPieChart.setOptions(cnfg);
	} else if (resSelectedType === "saoi"){
		var cnfg = {
			barBottomColor: "#0E8615",
			barTopColor: "#109518",
			cursorType: "pointer"
		};
		resBarChart.setOptions(cnfg);
		
		cnfg = {
			cursorType: "pointer"
		};
		resPieChart.setOptions(cnfg);
	} else if (resSelectedType === "ssaoi"){
		var cnfg = {
			barBottomColor: "#E27100",
			barTopColor: "#A75300",
			cursorType: "auto"
		};
		resBarChart.setOptions(cnfg);
		
		cnfg = {
			cursorType: "auto"
		};
		resPieChart.setOptions(cnfg);
	}
}

function setResChartTitle(name, type){
	if (type === "aoi") {
		$("#res-chart-title").html("");
	} else if (type === "saoi") {
		$("#res-chart-title").html('<span class="text-info">' + resSelectedAoiName + '</span>');
	} else if (type === "ssaoi") {
		$("#res-chart-title").html('<span class="text-info">' + resSelectedAoiName + '</span><span class="text/muted"> / </span><span class="text-info">' + name + '</span>');
	}
}

function showResNotAvailbleMsg(){
	var place = $("#res-chart-holder");
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
	headingElem.innerHTML = '<span><i class="fa fa-exclamation-circle fa-lg"></i>&nbsp; Data Not Available</span>';
	
	var divElemDetails = document.createElement("div");
	divElemDetails.innerHTML = '<i>Currently no data is available to display for this level.</i>';
	
	divElem.appendChild(headingElem);
	divElem.appendChild(divElemDetails);
	place.append(divElem);
}

function hasValidResData(data){
	for (var i = 0; i < data.length; i++) {
		if (parseInt(data[i].value) > 0) {
			return true;
		}
	}
	return false;
}

function initResPieChart(){
	var data = [];
	var pieChartOptions = {
		marginTop: 20,
		marginRight: 20,
		marginBottom: 20,
		marginLeft: 20,
		colors: ["#3366CC", "#DC3912", "#FF9900", "#109618", "#990099", "#0099C6", "#DD4477", "#AAAA11", "#E67300", "#B77322", "#16D620"],
		cursorType: "pointer"
    };
	
	resPieChart = new ResPieChart("res-chart-holder", data, pieChartOptions);
}

function drawResPieChart(data, options){
	if ('undefined' !== typeof data) {
		resPieChart.setData(data);
	}
	if ('undefined' !== typeof options) {
		resPieChart.setOptions(options);
	}
	resPieChart.draw();
}

function initResBarChart(){
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
	resBarChart = new ResBarChart("res-chart-holder", data, barChartOptions);
}

function drawResBarChart(data, options){
	if ('undefined' !== typeof data) {
		resBarChart.setData(data);
	}
	if ('undefined' !== typeof options) {
		resBarChart.setOptions(options);
	}
	resBarChart.draw();
}
