var aoiData;
var researchersResultData, publicationsResultData, patentsResultData;

$(document).ready(function () {
	fetchAOIData();
	
	initResearchersAOISelections();
	initPublicationsAOISelections();
	
	// radio buttons
	$("input:radio[name=search-type]").change(function(){
		var type = $("input:radio[name=search-type]:checked").val();
		if (type === "res") {
			showResearchersControls();
			hidePublicationsControls();
			hidePatentsControls();
		} else if (type === "pub"){
			showPublicationsControls();
			hideResearchersControls();
			hidePatentsControls();
		} else if (type === "pat"){
			showPatentsControls();
			hideResearchersControls();
			hidePublicationsControls();
		}
		$(this).blur();
	});
	
	//form submission
	$("body").on("submit", "#form-researchers", function(event) {
		event.preventDefault();
		fetchResearchersData();
		$("#btn-search-res").blur();
	});
	
	$("body").on("submit", "#form-publications", function(event) {
		event.preventDefault();
		fetchPublicationsData();
		$("#btn-search-pub").blur();
	});
	
	$("body").on("submit", "#form-patents", function(event) {
		event.preventDefault();
		fetchPatentsData();
		$("#btn-search-pat").blur();
	});
	
});

function fetchAOIData() {
	var url =  "scripts/aoi-data.jag";
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
	var aoiSelection = $("#aoi-selection-res");
	for (var i = 0; i < aoiData.length; i++) {
		var optElem = document.createElement("option");
		optElem.setAttribute("value", aoiData[i].id);
		var text = document.createTextNode(aoiData[i].name);
		optElem.appendChild(text);
		aoiSelection.append(optElem);
	}
	
	var aoiPubSelection = $("#aoi-selection-pub");
	for (var i = 0; i < aoiData.length; i++) {
		var optElem = document.createElement("option");
		optElem.setAttribute("value", aoiData[i].id);
		var text = document.createTextNode(aoiData[i].name);
		optElem.appendChild(text);
		aoiPubSelection.append(optElem);
	}
}

function fetchResearchersData() {
	$("#loading-status").show();
	$("#result-researchers").hide();

	var searchTermInitsFn = $("#search-term-inits-fn").val().trim();
	var searchTermLn = $("#search-term-ln").val().trim();
	var searchTermExpertise = $("#search-term-expertise").val().trim();
	var gender = $("#gender-selection option:selected").val();
	var aoiId = $("#aoi-selection-res option:selected").val();
	var saoiId = $("#saoi-selection-res option:selected").val();
	var ssaoiId = $("#ssaoi-selection-res option:selected").val();
	
	var url = "scripts/researchers-data.jag";
	
	if (searchTermInitsFn === "" && searchTermLn === "" && searchTermExpertise === "" && gender === "-1" && aoiId === "0" && saoiId === "0" && ssaoiId === "0") {
		$("#result-researchers").html('<p><i class="fa fa-exclamation-circle"></i>&nbsp; Enter either a search term or select either area of interest or gender and then press <b>Search</b> button.</p><div style="text-align: center;"><img src="images/dev/researchers.svg" style="height: 280px; margin-top: 12px;" /></div>');
		$("#result-researchers").show();
		$("#loading-status").hide();
		$("#search-term-inits-fn").focus();
	} else {
		$.ajax({
			url: url,
			type: "GET",
			dataType: "json",
			data: {
				initsfn: searchTermInitsFn,
				ln: searchTermLn,
				expertise: searchTermExpertise,
				gender: gender,
				aoiId: aoiId,
				saoiId: saoiId,
				ssaoiId: ssaoiId
			},
			success: onResearchersDataReceived
		});
	}
}

function onResearchersDataReceived(data) {
	researchersResultData = data.search_data;
	createResearchersList(researchersResultData);
}

function createResearchersList(data){
	var place = $("#result-researchers");
	place.empty();
	place.show();
	
	var strCont = "";
	if (data.length === 0) {
		strCont = '<p>Your search did not match any researchers. Try with different term.</p><div style="text-align: center;"><img src="images/dev/researchers.svg" style="height: 280px; margin-top: 12px;" /></div>';
	} else if (data.length === 1) {
		strCont = '<p><b>1</b>&nbsp; researcher found.</p>';
	} else {
		strCont = '<p><b>'+ data.length +'</b>&nbsp; researchers found.</p>';
	}
	
	place.append(strCont);
	
	var divElem = document.createElement("div");
	divElem.style.paddingLeft = "16px";
	divElem.style.paddingRight = "16px";
	
	var tableElem = document.createElement("table");
	tableElem.setAttribute("class", "table table-striped");
	tableElem.style.width = "100%";
	
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
	place.append(divElem);
}

function fetchPublicationsData() {
	$("#loading-status").show();
	$("#result-publications").hide();
	
	var searchTermTitle = $("#search-term-title").val().trim();
	var searchTermYear = $("#search-term-year").val().trim();
	var searchTermJn = $("#search-term-jn").val().trim();
	var searchTermAn = $("#search-term-auth-name").val().trim();
	var pubType = $("#pub-type-selection option:selected").val();
	var aoiId = $("#aoi-selection-pub option:selected").val();
	var saoiId = $("#saoi-selection-pub option:selected").val();
	var ssaoiId = $("#ssaoi-selection-pub option:selected").val();
	
	var url = "scripts/publications-data.jag";
	
	if (searchTermTitle === "" && searchTermYear === "" && searchTermJn === "" && searchTermAn === "" && pubType === "-1" && aoiId === "0" && saoiId === "0" && ssaoiId === "0") {
		$("#result-publications").html('<p><i class="fa fa-exclamation-circle"></i>&nbsp; Enter either a search term or select either area of interest or publication type and then press <b>Search</b> button.</p><div style="text-align: center;"><img src="images/dev/publications.svg" style="height: 280px; margin-top: 12px;" /></div>');
		$("#result-publications").show();
		$("#loading-status").hide();
		$("#search-term-title").focus();
	} else {
		$.ajax({
			url: url,
			type: "GET",
			dataType: "json",
			data: {
				title: searchTermTitle,
				pubyear: searchTermYear,
				jn: searchTermJn,
				an: searchTermAn,
				pubtype: pubType,
				aoiId: aoiId,
				saoiId: saoiId,
				ssaoiId: ssaoiId
			},
			success: onPublicationsDataReceived
		});
	}
}

function onPublicationsDataReceived(data) {
	publicationsResultData = data.search_data;
	createPublicationsList(publicationsResultData);
}

function createPublicationsList(data){
	var place = $("#result-publications");
	place.empty();
	place.show();
	
	var strCont = "";
	if (data.length === 0) {
		strCont = '<p>Your search did not match any publications. Try with different term.</p><div style="text-align: center;"><img src="images/dev/publications.svg" style="height: 280px; margin-top: 12px;" /></div>';
	} else if (data.length === 1) {
		strCont = '<p><b>1</b>&nbsp; publication found.</p>';
	} else {
		strCont = '<p><b>'+ data.length +'</b>&nbsp; publications found.</p>';
	}
	place.append(strCont);
	
	var divElem = document.createElement("div");
	divElem.style.paddingLeft = "16px";
	divElem.style.paddingRight = "16px";
	
	var tableElem = document.createElement("table");
	tableElem.setAttribute("class", "table table-striped");
	tableElem.style.width = "100%";
	
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
		divElemName.innerHTML = '<h4><a href="/publication/index.jag?pid=' + data[i].id + '" target="_blank">' + data[i].title + '</a>&nbsp; <small>' + publicationType + '</small></h4><small class="text-info">' + data[i].name + '</small>';
		
		var divElemPublishers = document.createElement("div");
		divElemPublishers.innerHTML = '<span style="color: #666666;">' + data[i].authors + '</span>';
		
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
	place.append(divElem);
}

function fetchPatentsData() {
	$("#loading-status").show();
	$("#result-patents").hide();
	
	var searchTermTitle = $("#search-term-pat-title").val().trim();
	var searchTermYear = $("#search-term-pat-year").val().trim();
	var searchTermIn = $("#search-term-inventor").val().trim();
	
	var url = "scripts/patents-data.jag";
	
	if (searchTermTitle === "" && searchTermYear === "" && searchTermIn === "") {
		$("#result-patents").html('<p><i class="fa fa-exclamation-circle"></i>&nbsp; Enter either a patent title or name of an inventor or year and then press <b>Search</b> button.</p><div style="text-align: center;"><img src="images/dev/patents.svg" style="height: 280px; margin-top: 12px;" /></div>');
		$("#result-patents").show();
		$("#loading-status").hide();
		$("#search-term-title").focus();
	} else {
		console.log("else");
		$.ajax({
			url: url,
			type: "GET",
			dataType: "json",
			data: {
				title: searchTermTitle,
				grntdyear: searchTermYear,
				inname: searchTermIn
			},
			success: onPatentsDataReceived
		});
	}
}

function onPatentsDataReceived(data) {
	patentsResultData = data.search_data;
	createPatentsList(patentsResultData);
}

function createPatentsList(data){
	var place = $("#result-patents");
	place.empty();
	place.show();
	
	var strCont = "";
	if (data.length === 0) {
		strCont = '<p>Your search did not match any patents. Try with different term.</p><div style="text-align: center;"><img src="images/dev/patents.svg" style="height: 280px; margin-top: 12px;" /></div>';
	} else if (data.length === 1) {
		strCont = '<p><b>1</b>&nbsp; patent found.</p>';
	} else {
		strCont = '<p><b>'+ data.length +'</b>&nbsp; patents found.</p>';
	}
	place.append(strCont);
	
	var divElem = document.createElement("div");
	divElem.style.paddingLeft = "16px";
	divElem.style.paddingRight = "16px";
	
	var tableElem = document.createElement("table");
	tableElem.setAttribute("class", "table table-striped");
	tableElem.style.width = "100%";
	
	var tbodyElem = document.createElement("tbody");
	for (var i = 0; i < data.length; i++) {
		trElem = document.createElement("tr");
		var tdElem1 = document.createElement("td");
		
		var divElemName = document.createElement("div");
		divElemName.style.marginTop = "16px";
		divElemName.innerHTML = '<h4 class="text-primary">' + data[i].title + '</h4>';
		
		var divElemPublishers = document.createElement("div");
		divElemPublishers.innerHTML = '<p class="text-info">' + data[i].inventor + '</p>';
		
		var divElemYear = document.createElement("div");
		divElemYear.style.marginBottom = "16px";
		divElemYear.innerHTML = '<b>Granted Date: &nbsp;</b><span style="color: #555555;">' + data[i].year + '</span>';
		
		tdElem1.appendChild(divElemName);
		tdElem1.appendChild(divElemPublishers);
		tdElem1.appendChild(divElemYear);
		
		trElem.appendChild(tdElem1);
		
		tbodyElem.appendChild(trElem);
	}
	tableElem.appendChild(tbodyElem);
	
	divElem.appendChild(tableElem);
	
	$("#loading-status").hide();
	place.append(divElem);
}

function showResearchersControls(){
	$("#div-form-researchers").show();
	$("#result-researchers").show();
}

function hideResearchersControls(){
	$("#div-form-researchers").hide();
	$("#result-researchers").hide();
}

function showPublicationsControls(){
	$("#div-form-publications").show();
	$("#result-publications").show();
}

function hidePublicationsControls(){
	$("#div-form-publications").hide();
	$("#result-publications").hide();
}

function showPatentsControls(){
	$("#div-form-patents").show();
	$("#result-patents").show();
}

function hidePatentsControls(){
	$("#div-form-patents").hide();
	$("#result-patents").hide();
}

function initResearchersAOISelections(){
	$("#aoi-selection-res").change(function(d, i) {
		var aoiId = $("#aoi-selection-res option:selected").val();
		var saoiSelection = $("#saoi-selection-res");
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
		$( "#saoi-selection-res" ).change();
		$("#aoi-selection-res").blur();
	});
	
	$("#saoi-selection-res").change(function(d, i) {
		var aoiId = $("#aoi-selection-res option:selected").val();
		var saoiId = $("#saoi-selection-res option:selected").val();
		var ssaoiSelection = $("#ssaoi-selection-res");
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
		$( "#ssaoi-selection-res" ).change();
		$("#saoi-selection-res").blur();
	});
	
	$("#ssaoi-selection-res").change(function(d, i) {
		$("#ssaoi-selection-res").blur();
	});
}

function initPublicationsAOISelections(){
	$("#aoi-selection-pub").change(function(d, i) {
		var aoiId = $("#aoi-selection-pub option:selected").val();
		var saoiSelection = $("#saoi-selection-pub");
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
		$( "#saoi-selection-pub" ).change();
		$("#aoi-selection-pub").blur();
	});
	
	$("#saoi-selection-pub").change(function(d, i) {
		var aoiId = $("#aoi-selection-pub option:selected").val();
		var saoiId = $("#saoi-selection-pub option:selected").val();
		var ssaoiSelection = $("#ssaoi-selection-pub");
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
		$( "#ssaoi-selection-pub" ).change();
		$("#saoi-selection-pub").blur();
	});
	
	$("#ssaoi-selection-pub").change(function(d, i) {
		$("#ssaoi-selection-pub").blur();
	});
}