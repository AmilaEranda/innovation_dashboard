var pref = new gadgets.Prefs();
var chartData, aoiData;
var selectedType;

$(document).ready(function(){
	fetchAOIData();
	
	// on resize the window
	$(window).resize(function(){
		//drawChartsAndList(chartData);
	});
	
	// radio buttons
	$("input:radio[name=search-type]").change(function(){
		var type = $("input:radio[name=search-type]:checked").val();
		$("#result-status").empty();
		$("#placeholder").empty();
		$("#search-term").val("");
		resetAoiSelections();
		if (type === "res"){
			$("#search-term").attr("placeholder", "Enter first name or last name");
			$("#result-status").html('<span><i class="fa fa-info-circle fa-lg"></i>&nbsp; Enter name of researcher and press <b>Search</b> button.</span>');
		} else if (type === "pub"){
			$("#search-term").attr("placeholder", "Enter name of the publication");
			$("#result-status").html('<span><i class="fa fa-info-circle fa-lg"></i>&nbsp; Enter name of publication and press <b>Search</b> button.</span>');
		}
		$(this).blur();
	});
	
	//form submission
	$( "#search-form" ).submit(function( event ) {
		fetchCustomData();
		$("#search-btn").blur();
		event.preventDefault();
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
		$("#ssaoi-selection").blur();
	});
});

function fetchAOIData() {
	var url =  "../../portal/gadgets/search/data-files/aoi-data.jag";
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

function fetchCustomData() {
	$("#loading-status").show();
	$("#result-status").hide();

	selectedType = $("input:radio[name=search-type]:checked").val();
	var searchTerm = $("#search-term").val();
	var aoiId = $("#aoi-selection option:selected").val();
	var saoiId = $("#saoi-selection option:selected").val();
	var ssaoiId = $("#ssaoi-selection option:selected").val();
	
	var url = "../../portal/gadgets/search/data-files/search-data.jag";
	
	if (searchTerm.trim() === "") {
		$("#result-status").html('<span><i class="fa fa-exclamation-circle"></i>&nbsp; Enter your search term and then press <b>Search</b> button.</span>');
		$("#result-status").show();
		$("#loading-status").hide();
		$("#search-term").val("");
		$("#search-term").focus();
	} else {
		$.ajax({
			url: url,
			type: "GET",
			dataType: "json",
			data: {
				type: selectedType,
				term: searchTerm,
				aoiId: aoiId,
				saoiId: saoiId,
				ssaoiId: ssaoiId
			},
			success: onDataReceived
		});
	}
}

function onDataReceived(data) {
	resultData = data.search_data;
	if (selectedType === "res") {
		createResearcherList(resultData);
	} else if (selectedType === "pub"){
		createPublicationList(resultData);
	}
}

function createResearcherList(data){
	if ('undefined' === typeof data){
		data = resultData;
	}
	
	$("#result-status").empty();
	var resTerm = data.length === 1 ? "" : "s";
	$("#result-status").html('<span><b>'+ data.length +'</b>&nbsp; result' + resTerm + ' found.</span>');
	
	var place = $("#placeholder");
	place.empty();
	
	var divElem = document.createElement("div");
	divElem.style.paddingLeft = "16px";
	divElem.style.paddingRight = "16px";
	
	var tableElem = document.createElement("table");
	tableElem.setAttribute("class", "table table-striped");
	tableElem.style.width = "98%";
	
	var tbodyElem = document.createElement("tbody");
	for (var i = 0; i < data.length; i++) {
		trElem = document.createElement("tr");
		var tdElem1 = document.createElement("td");
		tdElem1.style.width = "20%";
		tdElem1.style.textAlign = "center";
		var tdElem2 = document.createElement("td");
		
		var imgElem = document.createElement("img");
		if (data[i].image === null || data[i].image === "") {
			if (data[i].gender === null || data[i].gender === "1" || data[i].gender === 1){
				imgElem.setAttribute("src", "/userforms/images/users/man.png");
			} else {
				imgElem.setAttribute("src", "/userforms/images/users/woman.png");
			}
		} else {
			imgElem.setAttribute("src", "/userforms/images/users/" + data[i].id + "/" + data[i].image);
		}
		imgElem.style.width = "60px";
		
		tdElem1.appendChild(imgElem);
		
		var nameElem = document.createElement("div");
		nameElem.innerHTML = '<h4><a href="/profile/person.jag?pid='+ data[i].id +'" target="_blank">'+ data[i].name +'</a></h4>';
		tdElem2.appendChild(nameElem);
		
		var insPubsElem = document.createElement("div");
		var pubsElem = "";
		if (data[i].pbl_count === null || data[i].pbl_count === "" || parseInt(data[i].pbl_count) === 0) {
			pubsElem = "";
		} else {
			pubsElem = '<span title="publications"><i class="fa fa-newspaper-o"></i>&nbsp; '+ data[i].pbl_count +'</span>';
		} 
		insPubsElem.innerHTML = '<span style="margin-right: 30px;"><i class="fa fa-university"></i>&nbsp; '+ data[i].organization +'</span>' + pubsElem;
		
		tdElem2.appendChild(insPubsElem);
		
		trElem.appendChild(tdElem1);
        trElem.appendChild(tdElem2);
		
		tbodyElem.appendChild(trElem);
	}
	tableElem.appendChild(tbodyElem);
	
	divElem.appendChild(tableElem);
	
	$("#loading-status").hide();
	$("#result-status").show();
	place.append(divElem);
}

function createPublicationList(data){
	if ('undefined' === typeof data){
		data = resultData;
	}
	
	$("#result-status").empty();
	var resTerm = data.length === 1 ? "" : "s";
	$("#result-status").html('<span><b>'+ data.length +'</b>&nbsp; result' + resTerm + ' found.</span>');
	
	var place = $("#placeholder");
	place.empty();
	
	var divElem = document.createElement("div");
	divElem.style.paddingLeft = "16px";
	divElem.style.paddingRight = "16px";
	
	var tableElem = document.createElement("table");
	tableElem.setAttribute("class", "table table-striped");
	tableElem.style.width = "98%";
	
	var tbodyElem = document.createElement("tbody");
	for (var i = 0; i < data.length; i++) {
		trElem = document.createElement("tr");
		var tdElem1 = document.createElement("td");
		
		var divElemName = document.createElement("div");
		var publicationType = "";
		if (data[i].type === "1" || data[i].type === 1) {
			publicationType = "Journal Article";
		} else if (data[i].type === "2" || data[i].type === 2) {
			publicationType = "Book";
		} else if (data[i].type === "3" || data[i].type === 3) {
			publicationType = "Technical Article";
		} else if (data[i].type === "4" || data[i].type === 4) {
			publicationType = "Conference Proceeding";
		} else if (data[i].type === "5" || data[i].type === 5) {
			publicationType = "Book chapter";
		} else {
			publicationType = "Other";
		}
		divElemName.innerHTML = '<h4><a href="publication/path/publication.jag?pid=' + data[i].id + '" target="_blank">' + data[i].name + '</a>&nbsp; <small>' + publicationType + '</small></h4>';
		
		var divElemPublishers = document.createElement("div");
		divElemPublishers.innerHTML = '<span style="color: #666666;">' + data[i].publishers + '</span>';
		
		var divElemYear = document.createElement("div");
		divElemYear.innerHTML = '<span style="color: #999999;">' + data[i].year + '</span>';
		
		tdElem1.appendChild(divElemName);
		tdElem1.appendChild(divElemPublishers);
		tdElem1.appendChild(divElemYear);
		
		trElem.appendChild(tdElem1);
		
		tbodyElem.appendChild(trElem);
	}
	tableElem.appendChild(tbodyElem);
	
	divElem.appendChild(tableElem);
	
	$("#loading-status").hide();
	$("#result-status").show();
	place.append(divElem);
}

function resetAoiSelections(){
	$('#aoi-selection option:first-child').attr("selected", "selected");
	$('#aoi-selection')[0].selectedIndex = 0;
	$('#saoi-selection option:first-child').attr("selected", "selected");
	$('#saoi-selection')[0].selectedIndex = 0;
	$('#ssaoi-selection option:first-child').attr("selected", "selected");
	$('#ssaoi-selection')[0].selectedIndex = 0;
	
	$("#aoi-selection").change();
}
