var pubPieChart, pubBarChart;
var pubChartData;
var pubSelectedType;
var pubChartType;
var pubSelectedAoiId, pubSelectedAoiName;

$(document).ready(function(){
	
	pubSelectedType = "aoi";
	pubChartType = "pie";
	
	initPubPieChart();
	initPubBarChart();

	fetchPubsCountData("aoi", null, "");
	
	// on resize the window
	$(window).resize(function(){
		drawPubChartsAndList();
	});
	
	$("#pub-chart-back").click(function(){
		if (pubSelectedType === "saoi") {
			fetchPubsCountData("aoi", null, "");
		} else if (pubSelectedType === "ssaoi") {
			fetchPubsCountData("saoi", pubSelectedAoiId, pubSelectedAoiName);
		}
		$(this).blur();
	});
	
	// switching charts
	$("input:radio[name=pub-view]").change(function() {
        pubChartType = $("input:radio[name=pub-view]:checked").val();
        drawPubChartsAndList();
    });
	
});

function fetchPubsCountData(type, id, aoiName) {
	var url =  "scripts/org-pubs-count-data.jag";
	var oidParameter = $("#orgid").val();
	pubSelectedType = type;
	
	if (pubSelectedType === "saoi") {
		pubSelectedAoiId = id;
		pubSelectedAoiName = aoiName;
	}
	
	$.ajax({
		url: url,
		type: "GET",
		dataType: "json",
		data: {
			oid: oidParameter,
			type: pubSelectedType,
			id: id
		},
		success: onPubsCountDataReceived
	});
	
	if (pubSelectedType !== "aoi") {
		$("#pub-chart-back").show();
	} else {
		$("#pub-chart-back").hide();
	}
	
	setOptionsForPubCharts();
	
	setPubChartTitle(aoiName, type);
}

function onPubsCountDataReceived(data) {
	pubChartData = data.pub_count_data;
	drawPubChartsAndList(pubChartData);
}

function drawPubChartsAndList(data){
	var place = $("#pub-chart-holder");
	place.empty();
	
	if ("undefined" === typeof data || data === null) {
		data = pubChartData;
	}
	
	if (hasValidPubData(data)) {
		if (pubChartType === "pie") {
			drawPubPieChart(data);
		} else if (pubChartType === "bar") {
			drawPubBarChart(data);
		}
	} else {
		showPubNotAvailbleMsg();
	}
}

function setOptionsForPubCharts(){
	if ("undefined" === typeof pubSelectedType || pubSelectedType === "aoi") {
		var cnfg = {
			barBottomColor: "#3365CA",
			barTopColor: "#254A94",
			cursorType: "pointer"
		};
		pubBarChart.setOptions(cnfg);
		
		cnfg = {
			cursorType: "pointer"
		};
		pubPieChart.setOptions(cnfg);
	} else if (pubSelectedType === "saoi"){
		var cnfg = {
			barBottomColor: "#0E8615",
			barTopColor: "#109518",
			cursorType: "pointer"
		};
		pubBarChart.setOptions(cnfg);
		
		cnfg = {
			cursorType: "pointer"
		};
		pubPieChart.setOptions(cnfg);
	} else if (pubSelectedType === "ssaoi"){
		var cnfg = {
			barBottomColor: "#E27100",
			barTopColor: "#A75300",
			cursorType: "auto"
		};
		pubBarChart.setOptions(cnfg);
		
		cnfg = {
			cursorType: "auto"
		};
		pubPieChart.setOptions(cnfg);
	}
}

function setPubChartTitle(name, type){
	if (type === "aoi") {
		$("#pub-chart-title").html("");
	} else if (type === "saoi") {
		$("#pub-chart-title").html('<span class="text-info">' + pubSelectedAoiName + '</span>');
	} else if (type === "ssaoi") {
		$("#pub-chart-title").html('<span class="text-info">' + pubSelectedAoiName + '</span><span class="text/muted"> / </span><span class="text-info">' + name + '</span>');
	}
}

function showPubNotAvailbleMsg(){
	var place = $("#pub-chart-holder");
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

function hasValidPubData(data){
	for (var i = 0; i < data.length; i++) {
		if (parseInt(data[i].value) > 0) {
			return true;
		}
	}
	return false;
}

function initPubPieChart(){
	var data = [];
	var pieChartOptions = {
		marginTop: 20,
		marginRight: 20,
		marginBottom: 20,
		marginLeft: 20,
		colors: ["#3366CC", "#DC3912", "#FF9900", "#109618", "#990099", "#0099C6", "#DD4477", "#AAAA11", "#E67300", "#B77322", "#16D620"],
		cursorType: "pointer"
    };
	
	pubPieChart = new PubPieChart("pub-chart-holder", data, pieChartOptions);
}

function drawPubPieChart(data, options){
	if ('undefined' !== typeof data) {
		pubPieChart.setData(data);
	}
	if ('undefined' !== typeof options) {
		pubPieChart.setOptions(options);
	}
	pubPieChart.draw();
}

function initPubBarChart(){
	var data = [];
	var barChartOptions = {
        marginTop: 20,
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
	pubBarChart = new PubBarChart("pub-chart-holder", data, barChartOptions);
}

function drawPubBarChart(data, options){
	if ('undefined' !== typeof data) {
		pubBarChart.setData(data);
	}
	if ('undefined' !== typeof options) {
		pubBarChart.setOptions(options);
	}
	pubBarChart.draw();
}
