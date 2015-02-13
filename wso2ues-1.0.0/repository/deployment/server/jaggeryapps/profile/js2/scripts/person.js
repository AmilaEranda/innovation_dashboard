var indexBarChart;

$(document).ready(function () {
	var pubsInitYear = parseInt($("#pubsYear").val());
	if(isNaN(pubsInitYear)){
		pubsInitYear = "";
	}
	$('#pub-table').DataTable({
		"search": {
			"search": "" + pubsInitYear + "" // insert search term here. (year)
		},
		"order": [2, 'desc']
	});
	initializeIndexBarChart();
});

function initializeIndexBarChart(){
	var indexData = [];
	
	var indexChartOptions = {
        marginTop: 5,
        marginRight: 5,
        marginBottom: 5,
        marginLeft: 5
    };
	
	indexBarChart = new IndexBarChart("person-index-chart", indexData, indexChartOptions);
}

function drawIndexBarChart(newData){
	//$("#person-index-chart").css({"width": $(window).width() - 220, "height": "100px"});
	if(typeof newData !== "undefined"){
		indexBarChart.setData(newData);
	}
	indexBarChart.draw();
}