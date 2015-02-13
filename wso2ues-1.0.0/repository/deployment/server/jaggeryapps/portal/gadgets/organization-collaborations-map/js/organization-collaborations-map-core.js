var pref = new gadgets.Prefs();
var mapData, orgData;
var chartType;
var geocoder, map;
var startMarker;
var currentMarkers = [];
var currentPolylines = [];

$(document).ready(function(){
	// setting chart type
	chartType = pref.getString("chartType").toLowerCase();
	if(chartType !== "map" && chartType !== "list"){
		chartType = "map";
	}
	
	$(".btn-group button").removeClass("btn-success");
	if (chartType === "map"){
		$("#btnChartTypeMap").addClass("btn-success");
	} else if (chartType === "list"){
		$("#btnChartTypeList").addClass("btn-success");
	} else {
		$("#btnChartTypeMap").addClass("btn-success");
	}
	
	initGeocoderAndMap();

	fetchOrgData();
	
	setInfoForCharts();
	
	// on resize the window
	$(window).resize(function(){
		resetMap();
	});
	
	// switching charts
	$(".btn-group button").click(function(){
		$(".btn-group button").removeClass("btn-success");
		$(this).addClass("btn-success");
		$(this).blur();
		chartType = $(this).text().toLowerCase();
		drawMapAndList(mapData);
	});
	
	$("#orgs-select").change(function(){
		$(this).blur();
		var selectedOrgId = parseInt($("#orgs-select option:selected").val());
		fetchCustomData(selectedOrgId);
	});
	
	console.clear();
});

function fetchOrgData(){
	disableControls();
	var url = "../../portal/gadgets/organization-collaborations-map/data-files/organization-data.jag";
	$.ajax({
		url: url,
		type: "GET",
		dataType: "json",
		success: onOrgDataReceived
	});
}

function onOrgDataReceived(data) {
	orgData = data.org_data;
	createOrgSelectMenu(orgData);
	
	// load initial collaborations
	var selectedOrgId = $("#orgs-select option:selected").val();
	fetchCustomData(selectedOrgId);
	enableControls();
}

function createOrgSelectMenu(data){
	var selectElem = $("#orgs-select");
	selectElem.empty();
	var strCont = "";
	
	if (data.length > 0) {
		for (var i = 0; i < data.length; i++) {
			strCont += '<option value="' + data[i].org_id + '">' + data[i].org_name + '</option>';
		}
	} else {
		strCont += '<option value="" data-org-long="" data-org-lati="">-- Data Not Available --</option>';
	}
	selectElem.html(strCont);
}

function setStartLocation(){
	clearMarkers();
	currentMarkers = [];
	currentPolylines = [];
	var locId, locName, locImage, locLong, locLati;
	var selectedOrgId = parseInt($("#orgs-select option:selected").val());
	var curId;
	for (var i = 0; i < orgData.length; i++) {
		curId = parseInt(orgData[i].org_id);
		if (curId === selectedOrgId) {
			resetMap();
			locId = orgData[i].org_id;
			locName = orgData[i].org_name;
			locImage = orgData[i].org_image;
			locLong = orgData[i].org_long;
			locLati = orgData[i].org_lati;
			break;
		}
	}
	if ("undefined" === typeof locLong || "undefined" === typeof locLati || locLong === null || locLati === null || locLong === "" || locLati === "") {
		geocoder.geocode( { 'address': locName + ", Sri Lanka"}, function(results, status) {
			if (status == google.maps.GeocoderStatus.OK) {
				drawStartMarker(locId, locImage, results[0].geometry.location.lng(), results[0].geometry.location.lat());
			}
		});
	} else {
		drawStartMarker(locId, locImage, locLong, locLati);
	}
}

function drawStartMarker(locId, locImage, locLong, locLati){
	var image = {
		url: '../../images/organizations/' + locImage,
		scaledSize: new google.maps.Size(20, 20),
		origin: new google.maps.Point(0, 0),
		anchor: new google.maps.Point(10, 10)
	};
	
	var latlng = new google.maps.LatLng(locLati, locLong);
	
	startMarker = new google.maps.Marker({
		map: map,
		position: latlng,
		icon: image
	});
	
	google.maps.event.addListener(startMarker, 'click', function() {
		map.setZoom(8);
		map.setCenter(startMarker.getPosition());
	});
	
	currentMarkers.push(startMarker);
}

function fetchCustomData(oid) {
	disableControls();
	var url = "../../portal/gadgets/organization-collaborations-map/data-files/organization-collaborations-map-data.jag";
	$.ajax({
		url: url,
		data: {
			id: oid
		},
		type: "GET",
		dataType: "json",
		success: onDataReceived
	});
}

function onDataReceived(data) {
	mapData = data.clb_data;
	drawMapAndList(mapData);
	enableControls();
}

function setGeoLocations(orgData) {
	for (var i = 0; i < orgData.length; i++) {
		var orgName = orgData[i].name;
		var orgCountry = orgData[i].cou_name;
		setLocationTimeout(i, orgName, orgCountry);
	}
}

function setLocationTimeout(i, orgName, orgCountry) {
	setTimeout(function() {
		geocoder.geocode( { 'address': orgName + ", " + orgCountry}, function(results, status) {
			if (status == google.maps.GeocoderStatus.OK) {
				var marker = new google.maps.Marker({
					map: map,
					position: results[0].geometry.location
				});
				
				var poly = new google.maps.Polyline({
					strokeColor: '#FF0000',
					strokeOpacity: 1.0,
					strokeWeight: 1,
					map: map,
					path: [startMarker.getPosition(), marker.getPosition()]
				});
				
				// info window
				var infoContent = '<div><h5>' + orgName + '</h5></div>';
				var infowindow = new google.maps.InfoWindow({
					content: infoContent,
					position: marker.getPosition()
				});
				google.maps.event.addListener(marker, 'click', function(event) {
					infowindow.open(map, this);
				});
				
				currentMarkers.push(marker);
				currentPolylines.push(poly);
				
			} else {
				// not found or error
				console.log(status);
			}
		});
	}, i * 500);
}

function drawMapAndList(data){
	if (chartType === "map") {
		drawCollaborationsMap(data);
	} else if (chartType === "list") {
		createCollaborationsList(data);
	}
}

function drawCollaborationsMap(data){
	$("#listholder").hide();
	$("#placeholder").show();
	setStartLocation();
	setGeoLocations(data);
}

function createCollaborationsList(data){
	$("#placeholder").hide();
	var place = $("#listholder");
	place.show();
	place.empty();
	
	var tableElem = document.createElement("table");
	tableElem.setAttribute("class", "table table-striped");
	var theadElem = document.createElement("thead");
	
	// heading row
	var trElem = document.createElement("tr");
	var thElem0 = document.createElement("th");
	thElem0.style.width = "8%";
	var thElem1 = document.createElement("th");
	thElem1.style.width = "46%";
	var thElem2 = document.createElement("th");
	thElem2.style.width = "46%";
	
	var text = document.createTextNode(" # ");
	thElem0.appendChild(text);
	text = document.createTextNode("Organization");
	thElem1.appendChild(text);
	text = document.createTextNode("Country");
	thElem2.appendChild(text);
	
	trElem.appendChild(thElem0);
	trElem.appendChild(thElem1);
	trElem.appendChild(thElem2);
	theadElem.appendChild(trElem);
	tableElem.appendChild(theadElem);
	
	var tbodyElem = document.createElement("tbody");
	
	for (var i = 0; i < data.length; i++) {
		trElem = document.createElement("tr");
		var tdElem0 = document.createElement("td");
		var tdElem1 = document.createElement("td");
		var tdElem2 = document.createElement("td");
		
		var text = document.createTextNode((i + 1));
		tdElem0.appendChild(text);
		text = document.createTextNode(data[i].name);
		tdElem1.appendChild(text);
		text = document.createTextNode(data[i].cou_name);
		tdElem2.appendChild(text);
		
		trElem.appendChild(tdElem0);
		trElem.appendChild(tdElem1);
		trElem.appendChild(tdElem2);
		tbodyElem.appendChild(trElem);
	}
	tableElem.appendChild(tbodyElem);
	
	place.append(tableElem);
}

function setInfoForCharts(){
	$('#info-icon').tooltip('destroy');
	$("#info-icon").removeAttr("title");

	$("#info-icon").tooltip({
		animation: true,
		placement: "left",
		html: true,
		title: '<div style="text-align: left; font-size: 12px; margin: 8px 5px;"><p><i class="fa fa-info-circle fa-lg"></i>&nbsp; <b>Organizational collaborations</b> with foreign institutions.</p><p>The institution you want can be selected from the dropdown list.</p><p>Click on the baloon to view the details.</p></div>'
	});
}

function clearMarkers(){
	for (var i = 0; i < currentMarkers.length; i++) {
		currentMarkers[i].setMap(null);
	}
	
	for (var i = 0; i < currentPolylines.length; i++) {
		currentPolylines[i].setMap(null);
	}
}

function initGeocoderAndMap() {
	$("#placeholder").empty();
	geocoder = new google.maps.Geocoder();
	var latlng = new google.maps.LatLng(34.133358596831147, 41.94423948437499);
	var mapOptions = {
		zoom: 2,
		center: latlng,
		panControl: false,
  		zoomControl: true,
   		mapTypeControl: false,
  		scaleControl: false,
  		streetViewControl: false,
  		overviewMapControl: false,
		mapTypeId: google.maps.MapTypeId.ROADMAP
	}
	map = new google.maps.Map(document.getElementById('placeholder'), mapOptions);
	
	var styles = [
	  /*{
		featureType: "road",
		stylers: [
		  { visibility: "off" }
		]
	  },
	  {
		featureType: "poi.business",
		elementType: "labels",
		stylers: [
		  { visibility: "off" }
		]
	  },*/
	  {
		featureType: "transit",
		elementType: "all",
		stylers: [
		  { visibility: "off" }
		]
	  },
	  {
		featureType: "poi.park",
		elementType: "all",
		stylers: [
		  { visibility: "off" }
		]
	  },
	  {
		featureType: "administrative.locality",
		elementType: "labels.text",
		stylers: [
		  { visibility: "off" }
		]
	  }
	];
	
	map.setOptions({styles: styles});
}

function resetMap() {
	var x = map.getZoom();
	var c = map.getCenter();
	google.maps.event.trigger(map, 'resize');
	map.setZoom(x);
	map.setCenter(c);
}

function disableControls(){
	$("#btnChartTypeMap").attr("disabled", "disabled");
	$("#btnChartTypeList").attr("disabled", "disabled");
	$("#orgs-select").attr("disabled", "disabled");
}

function enableControls(){
	$("#btnChartTypeMap").removeAttr("disabled");
	$("#btnChartTypeList").removeAttr("disabled");
	$("#orgs-select").removeAttr("disabled");
}
