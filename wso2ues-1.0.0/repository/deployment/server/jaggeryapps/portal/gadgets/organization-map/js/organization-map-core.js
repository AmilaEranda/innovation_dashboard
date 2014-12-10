var pref = new gadgets.Prefs();
var mapData, aoiData;
var geocoder, map;
var currentMarkers = [];

$(document).ready(function(){
	initGeocoderAndMap();

	fetchData();
	
	fetchAOIData();
	
	// on resize the window
	$(window).resize(function(){
		resetMap();
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
		fetchCustomData();
		$("#ssaoi-selection").blur();
	});
});

function fetchAOIData() {
	var url =  "../../portal/gadgets/organization-map/data-files/aoi-data.jag";
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

function fetchData() {
	var url = "../../portal/gadgets/organization-map/data-files/organization-map-data.jag"; // pref.getString("dataSource");
	$.ajax({
		url: url,
		type: "GET",
		dataType: "json",
		success: onDataReceived
	});
}

function onDataReceived(data) {
	mapData = data.org_data;
	setGeoLocations(mapData);
}

function fetchCustomData() {
	var aoiId = $("#aoi-selection option:selected").val();
	var saoiId = $("#saoi-selection option:selected").val();
	var ssaoiId = $("#ssaoi-selection option:selected").val();
	
	var url = "../../portal/gadgets/organization-map/data-files/organization-map-data.jag";
	
	$.ajax({
		url: url,
		type: "GET",
		dataType: "json",
		data: {
			aoiId: aoiId,
			saoiId: saoiId,
			ssaoiId: ssaoiId
		},
		success: onDataReceived
	});
}

function initGeocoderAndMap() {
	$("#placeholder").empty();
	geocoder = new google.maps.Geocoder();
	var latlng = new google.maps.LatLng(7.904744859248549, 80.76626096874999);
	var mapOptions = {
		zoom: 7,
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
}

function setGeoLocations(orgData){
	//var orgLocData = [];
	clearMarkers();
	currentMarkers = [];
	for(var i = 0; i < orgData.length; i++){
		var orgName = orgData[i].name;
		var orgImage = orgData[i].image;
		console.log("ori|"+orgImage+"|");
		setLocationTimeout(i, orgName, orgImage)
	}
}

function setLocationTimeout(i, orgName, orgImage){
	console.log("|"+orgImage+"|");
	setTimeout(function(){
		geocoder.geocode( { 'address': orgName}, function(results, status) {
			if (status == google.maps.GeocoderStatus.OK) {
				//if(orgImage === null || orgImage === ""){
					orgImage = "org.png";
				//}
				var image = {
					url: '../../innodb-image-test/images/organizations/' + orgImage,
					scaledSize: new google.maps.Size(24, 24),
					origin: new google.maps.Point(0, 0),
					anchor: new google.maps.Point(12, 12)
				};
				
				var contentString = '<div style="width: 200px; height: 100px;">'+
					'<h4>' + orgName + '</h4>'+
				'</div>';
				
				var infowindow = new google.maps.InfoWindow({
					content: contentString
				});
				
				var marker = new google.maps.Marker({
					map: map,
					position: results[0].geometry.location,
					icon: image,
					title: orgName
				});
				
				google.maps.event.addListener(marker, 'click', function() {
					infowindow.open(map, marker);
				});
				currentMarkers.push(marker);
			} else {
				// not found or error
				//console.log(status);
			}
		});
	}, i * 500);
}

function clearMarkers(){
	for (var i = 0; i < currentMarkers.length; i++) {
		currentMarkers[i].setMap(null);
	}
}

function resetMap() {
	var x = map.getZoom();
	var c = map.getCenter();
	google.maps.event.trigger(map, 'resize');
	map.setZoom(x);
	map.setCenter(c);
}
