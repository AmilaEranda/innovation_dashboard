var pref = new gadgets.Prefs();
var mapData, aoiData;
var chartType; // physical-map, administrative-map, list
var geocoder, map, politicalMap;
var currentMarkers = [];
var amZoomLevel, amZoomLatitude, amZoomLongitude;

$(document).ready(function(){
	// setting chart type
	chartType = pref.getString("chartType").toLowerCase();
	if (chartType !== "physical-map" && chartType !== "administrative-map" && chartType !== "list"){
		chartType = "physical-map";
	}
	
	$(".btn-group button").removeClass("btn-success");
	if (chartType === "physical-map") {
		$("#btnChartTypePhysicalMap").addClass("btn-success");
	} else if (chartType === "administrative-map") {
		$("#btnChartTypeAdministrativeMap").addClass("btn-success");
	} else if (chartType === "list") {
		$("#btnChartTypeList").addClass("btn-success");
	} else {
		$("#btnChartTypePhysicalMap").addClass("btn-success");
	}
	
	initGeocoderAndMap();
	
	initPoliticalMap();

	fetchCustomData();
	
	fetchAOIData();
	
	setInfoForCharts();
	
	// on resize the window
	$(window).resize(function(){
		setWidthsForAOI();
		resetPhysicalMap();
	});
	
	// switching charts
	$(".btn-group button").click(function(){
		$(".btn-group button").removeClass("btn-success");
		$(this).addClass("btn-success");
		$(this).blur();
		var btnText = $(this).text().toLowerCase();
		
		if (chartType === "administrative-map") {
			storePoliticalMapState();
		}
		
		if (btnText === "physical map") {
			chartType = "physical-map";
		} else if (btnText === "administrative map") {
			chartType = "administrative-map";
		} else if (btnText === "list") {
			chartType = "list";
		}
		drawMapsAndList(mapData);
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

		for (var i = 0; i < aoiData.length; i++) {
			if (aoiData[i].id == aoiId) {
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

		for (var i = 0; i < aoiData.length; i++) {
			if (aoiData[i].id == aoiId) {
				for (var j = 0; j < aoiData[i].data.length; j++) {
					if (aoiData[i].data[j].id == saoiId) {
						for (var k = 0; k < aoiData[i].data[j].data.length; k++) {
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
		if (chartType === "administrative-map") {
			storePoliticalMapState();
		}
		fetchCustomData();
		$("#ssaoi-selection").blur();
	});
	
	//console.clear();
	setWidthsForAOI();
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

function fetchCustomData() {
	disableControls();
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

function onDataReceived(data) {
	mapData = data.org_data;
	drawMapsAndList(mapData);
	enableControls();
}

function drawMapsAndList(data){
	if (chartType === "physical-map") {
		drawPhysicalMap(data);
	} else if (chartType === "administrative-map") {
		drawPoliticalMap(data);
	} else if (chartType === "list") {
		createOrganizationsList(data);
	}
}

function drawPhysicalMap(data){
	$("#listholder").hide();
	$("#politicalmapholder").hide();
	$("#placeholder").show();
	resetPhysicalMap();
	setGeoLocations(data);
}

function createOrganizationsList(data){
	$("#placeholder").hide();
	$("#politicalmapholder").hide();
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
	thElem1.style.width = "22%";
	var thElem2 = document.createElement("th");
	thElem2.style.width = "70%";
	
	var text = document.createTextNode(" # ");
	thElem0.appendChild(text);
	text = document.createTextNode("");
	thElem1.appendChild(text);
	text = document.createTextNode("Organization");
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
		tdElem1.style.textAlign = "center";
		var tdElem2 = document.createElement("td");
		
		var text = document.createTextNode((i + 1));
		tdElem0.appendChild(text);
		var logoImg = new Image();
		logoImg.src = '../../images/organizations/' + data[i].org_image;
		$(logoImg).css("width", "60px");
		tdElem1.appendChild(logoImg);
		var addrText = "";
		if(data[i].org_addr !== "" && data[i].org_addr !== null){
			addrText = '<span style="font-size: 12px;">' + data[i].org_addr +'</span>';
		}
		tdElem2.innerHTML = '<h4><a href="/profile/organization.jag?oid='+ data[i].org_id +'" target="_blank">'+ data[i].org_name +'</a></h4>'+ addrText;
		
		trElem.appendChild(tdElem0);
		trElem.appendChild(tdElem1);
		trElem.appendChild(tdElem2);
		tbodyElem.appendChild(trElem);
	}
	tableElem.appendChild(tbodyElem);
	
	place.append(tableElem);
}

function setGeoLocations(orgData){
	clearMarkers();
	currentMarkers = [];
	var orgId, orgName, orgImage, orgLong, orgLati;
	for (var i = 0; i < orgData.length; i++) {
		orgId = orgData[i].org_id;
		orgName = orgData[i].org_name;
		orgImage = orgData[i].org_image;
		orgLong = orgData[i].org_long;
		orgLati = orgData[i].org_lati;
		
		if ("undefined" === typeof orgLong || "undefined" === typeof orgLati || orgLong === null || orgLati === null || orgLong === "" || orgLati === "") {
			setLocationTimeout(i, orgId, orgName, orgImage);
		} else {
			drawPhysicalMarker(orgId, orgName, orgImage, orgLong, orgLati);
		}
	}
}

function setLocationTimeout(i, orgId, orgName, orgImage){
	var modOrgName = orgName + ", Sri Lanka";
	setTimeout(function(){
		geocoder.geocode( { 'address': modOrgName}, function(results, status) {
			if (status == google.maps.GeocoderStatus.OK) {
				drawPhysicalMarker(orgId, orgName, orgImage, results[0].geometry.location.lng(), results[0].geometry.location.lat());
			} else {
				// not found or error
			}
		});
	}, i * 500);
}

function drawPhysicalMarker(orgId, orgName, orgImage, orgLong, orgLati){
	if (orgImage === null || orgImage === ""){
		orgImage = "org.png";
	}
	
	var imgObj = new Image();
	imgObj.src = '../../images/organizations/' + orgImage;
	
	imgObj.onload = function() {
		var actualSize = new google.maps.Size(this.width, this.height);
		var ratio = this.width / 24;
		var newScaledSize = new google.maps.Size(24, (this.height / ratio));
		
		var image = {
			url: '../../images/organizations/' + orgImage,
			size: actualSize,
			scaledSize : newScaledSize,
			origin: new google.maps.Point(0, 0),
			anchor: new google.maps.Point(12, 12)
		};
		
		var contentString = '<div style="width: 300px; height: auto;">'+
			'<table style="width: 100%;"><tr>'+
			'<td><img style="padding: 5px;" src="../../images/organizations/'+ orgImage +'" /></td>'+
			'<td><h4>'+ orgName +'</h4><span style="font-size: 12px;"><a href="/profile/organization.jag?oid='+ orgId +'" target="_blank">View profile</a></span></td>'+
			'</tr></table>'+
		'</div>';
		
		var infowindow = new google.maps.InfoWindow({
			content: contentString
		});
		
		var latlng = new google.maps.LatLng(orgLati, orgLong);
		
		var marker = new google.maps.Marker({
			map: map,
			position: latlng,
			icon: image,
			title: orgName
		});
		
		google.maps.event.addListener(marker, 'click', function() {
			infowindow.open(map, marker);
		});
		currentMarkers.push(marker);
	}
}

function drawPoliticalMap(data){
	$("#listholder").hide();
	$("#placeholder").hide();
	
	var place = $("#politicalmapholder");
	place.empty();
	place.show();
	
	var politicalMapData = [];
	for (var i = 0; i < data.length; i++) {
		orgLong = data[i].org_long;
		orgLati = data[i].org_lati;
		if ("undefined" === typeof orgLong || "undefined" === typeof orgLati || orgLong === null || orgLati === null || orgLong === "" || orgLati === "") {
			//setPoliticalLocationTimeout(i, data[i].org_id, data[i].org_name, data[i].org_image);
		} else {
			var jsnObj = {
				"title": data[i].org_name, 
				"imageURL": "/images/organizations/"+data[i].org_image, 
				"latitude": data[i].org_lati, 
				"longitude": data[i].org_long, 
				"width": 24, 
				"height": 24,
				"description": '<p><a href="/profile/organization.jag?oid='+ data[i].org_id +'" target="_blank">View profile</a></p>'
			}
			politicalMapData.push(jsnObj);
		}
	}
	
	politicalMap.dataProvider.images = politicalMapData;
	
	//politicalMap.clear();
	//politicalMap.clearMap();
	
	// set same zoom levels to retain map position/zoom
    politicalMap.dataProvider.zoomLevel = amZoomLevel;
    politicalMap.dataProvider.zoomLatitude = amZoomLatitude;
    politicalMap.dataProvider.zoomLongitude = amZoomLongitude;
    
    // update map
	politicalMap.validateNow(); // should be called after you changed one or more properties of any class
	politicalMap.validateData(); // should be called after data in your data provider changed
	
	politicalMap.write("politicalmapholder");
}

function setPoliticalLocationTimeout(i, orgId, orgName, orgImage){
	var modOrgName = orgName + ", Sri Lanka";
	setTimeout(function(){
		geocoder.geocode( { 'address': modOrgName}, function(results, status) {
			if (status == google.maps.GeocoderStatus.OK) {
				//console.log(orgName +" : "+results[0].geometry.location.lng() + ", " + results[0].geometry.location.lat());
				drawPoliticalMarker(orgId, orgName, orgImage, results[0].geometry.location.lng(), results[0].geometry.location.lat());
			} else {
				// not found or error
			}
		});
	}, i * 250);
}

function drawPoliticalMarker(orgId, orgName, orgImage, orgLong, orgLati){
	if (orgImage === null || orgImage === ""){
		orgImage = "org.png";
	}
	var jsnObj = {
		"title": orgName,
		"imageURL": "/images/organizations/"+orgImage,
		"latitude": orgLati,
		"longitude": orgLong,
		"width": 24,
		"height": 24,
		"description": '<p><a href="/profile/organization.jag?oid='+ orgId +'" target="_blank">View profile</a></p>'
	}
	politicalMap.dataProvider.images.push(jsnObj);
	
	// set same zoom levels to retain map position/zoom
    politicalMap.dataProvider.zoomLevel = politicalMap.zoomLevel();
    politicalMap.dataProvider.zoomLatitude = politicalMap.zoomLatitude();
    politicalMap.dataProvider.zoomLongitude = politicalMap.zoomLongitude();
    
    // update map
	politicalMap.validateData(); // should be called after data in your data provider changed
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

function clearMarkers(){
	for (var i = 0; i < currentMarkers.length; i++) {
		currentMarkers[i].setMap(null);
	}
}

function resetPhysicalMap() {
	var x = map.getZoom();
	var c = map.getCenter();
	google.maps.event.trigger(map, 'resize');
	map.setZoom(x);
	map.setCenter(c);
}

function initPoliticalMap(){
	// create AmMap object
	politicalMap = new AmCharts.AmMap();
	politicalMap.pathToImages = "../../portal/gadgets/organization-map/css/ammap/images/";
	politicalMap.theme = "none";

	politicalMap.dataProvider = {
		map: "sriLankaHigh",
		getAreasFromMap: true
	};
	
	politicalMap.areasSettings = {
		autoZoom: true,
		color: "#F4F3F0",
		outlineColor: "#a27833",
		rollOverColor: "#f6b64c",
		rollOverOutlineColor: "#bf8e3c",
		selectedColor: "#f6b64c",
		selectedOutlineColor: "#bf8e3c",
	};
	
	politicalMap.dataProvider.areas = getDistrictAreas();
	
	politicalMap.legend = {
		width: "180",
		backgroundAlpha: 0.4,
		backgroundColor: "#FFFFFF",
		position: "absolute",
		top: 10,
		right: 10,
		horizontalGap: 4, // Horizontal space between legend item and left/right border.
		verticalGap: 6,
		spacing: 12, // Horizontal space between legend items, in pixels.
		data: [
			{
				title: "District boundary",
				color: "#a27833",
				markerType: "line"
			},
			{
				title: "District capital",
				color: "#c21313",
				markerType: "circle"
			},
			{
				title: "City",
				color: "#f37021",
				markerType: "square"
			}
		]
	};
	
	politicalMap.zoomControl = {
		buttonFillColor: "#f6b64c",
		buttonRollOverColor: "#daa144"
	};
	
	amZoomLevel = 1;
    amZoomLatitude = 7.881779;
    amZoomLongitude = 80.76248;
	
	politicalMap.dataProvider.zoomLevel = amZoomLevel;
    politicalMap.dataProvider.zoomLatitude = amZoomLatitude;
    politicalMap.dataProvider.zoomLongitude = amZoomLongitude;
	
	politicalMap.addListener("homeButtonClicked", function (event) {
		amZoomLevel = 1;
		amZoomLatitude = 7.881779;
		amZoomLongitude = 80.76248;
		
		politicalMap.dataProvider.zoomLevel = amZoomLevel;
		politicalMap.dataProvider.zoomLatitude = amZoomLatitude;
		politicalMap.dataProvider.zoomLongitude = amZoomLongitude;
		
		//politicalMap.validateNow(); // should be called after you changed one or more properties of any class
		//politicalMap.validateData(); // should be called after data in your data provider changed
	});
	
	politicalMap.validateNow(); // should be called after you changed one or more properties of any class
	politicalMap.validateData(); // should be called after data in your data provider changed
	
	//politicalMap.write("politicalmapholder");
}

function storePoliticalMapState() {
	try {
		amZoomLevel = politicalMap.zoomLevel();
		amZoomLatitude = politicalMap.zoomLatitude();
		amZoomLongitude = politicalMap.zoomLongitude();
	} catch (err) {
		amZoomLevel = 1;
		amZoomLatitude = 7.881779;
		amZoomLongitude = 80.76248;
	}
}

function getDistrictAreas(){
	var districtCapitalType = "bubble";
	var cityType = "rectangle";
	
	var districtCapitalColor = "#c21313";
	var cityColor = "#f37021";
	
	var districts = [
		{
			id: "LK-11", // Colombo
			color: "#F9E4CF",
			images: [
				{
					type: districtCapitalType,
					color: districtCapitalColor,
					label: "Colombo",
					latitude: 6.934105,
					longitude: 79.850102
				},{
					type: cityType,
					color: cityColor,
					label: "Dehiwala",
					latitude: 6.851313,
					longitude: 79.865983
				},{
					type: cityType,
					color: cityColor,
					label: "Homagama",
					latitude: 6.841402,
					longitude: 80.004035
				},{ 
					type: cityType,
					color: cityColor,
					label: "Avissawella",
					latitude: 6.952186,
					longitude: 80.212549
				}
			]
		},
		{
			id: "LK-12", // Gampaha
			color: "#F9E4CF",
			images: [
				{
					type: districtCapitalType,
					color: districtCapitalColor,
					label: "Gampaha",
					latitude: 7.092426, 
					longitude: 79.992262
				},{
					type: cityType,
					color: cityColor,
					label: "Negombo",
					latitude: 7.210304, 
					longitude: 79.841851
				},{
					type: cityType,
					color: cityColor,
					label: "Ragama",
					latitude: 7.028228, 
					longitude: 79.922439
				}
			]
		},
		{
			id: "LK-13", // Kaḷutara
			color: "#F9E4CF",
			images: [
				{
					type: districtCapitalType,
					color: districtCapitalColor,
					label: "Kaḷutara",
					latitude: 6.585415,
					longitude: 79.960577
				},{
					type: cityType,
					color: cityColor,
					label: "Panadura",
					latitude: 6.712298,
					longitude: 79.907418
				},{
					type: cityType,
					color: cityColor,
					label: "Horana",
					latitude: 6.716668, 
					longitude: 80.063183
				},{
					type: cityType,
					color: cityColor,
					label: "Matugama",
					latitude: 6.522946,
					longitude: 80.114213
				}
			]
		},
		{
			id: "LK-21", // Kandy
			color: "#E0D2E3",
			images: [
				{
					type: districtCapitalType,
					color: districtCapitalColor,
					label: "Kandy",
					latitude: 7.293135,
					longitude: 80.635024
				},{ 
					type: cityType,
					color: cityColor,
					label: "Gampola",
					latitude: 7.161875,
					longitude: 80.565847
				},{
					type: cityType,
					color: cityColor,
					label: "Nawalapitiya",
					latitude: 7.054904,
					longitude: 80.534385
				}
			]
		},
		{
			id: "LK-22", // Matale
			color: "#E0D2E3",
			images: [
				{
					type: districtCapitalType,
					color: districtCapitalColor,
					label: "Matale",
					latitude: 7.465977,
					longitude: 80.623448
				},{
					type: cityType,
					color: cityColor,
					label: "Dambulla",
					latitude: 7.874245,
					longitude: 80.651117
				}
			]
		},
		{
			id: "LK-23", // Nuwara Eliya
			color: "#E0D2E3",
			images: [
				{
					type: districtCapitalType,
					color: districtCapitalColor,
					label: "Nuwara Eliya",
					latitude: 6.971446,
					longitude: 80.766954
				},{
					type: cityType,
					color: cityColor,
					label: "Hatton",
					latitude: 6.894887,
					longitude: 80.595659
				}
			]
		},
		{
			id: "LK-31", // Galle
			color: "#D6CB71",
			images: [
				{
					type: districtCapitalType,
					color: districtCapitalColor,
					label: "Galle",
					latitude: 6.032857,
					longitude: 80.214924
				},{
					type: cityType,
					color: cityColor,
					label: "Ambalangoda",
					latitude: 6.236668, 
					longitude: 80.054370
				},{
					type: cityType,
					color: cityColor,
					label: "Bentota",
					latitude: 6.418863,
					longitude: 80.002435
				}
			]
		},
		{
			id: "LK-32", // Matara
			color: "#D6CB71",
			images: [
				{
					type: districtCapitalType,
					color: districtCapitalColor,
					label: "Matara",
					latitude: 5.948245,
					longitude: 80.547451
				},{
					type: cityType,
					color: cityColor,
					label: "Weligama",
					latitude: 5.973679,
					longitude: 80.429470
				},{
					type: cityType,
					color: cityColor,
					label: "Deniyaya",
					latitude: 6.340709,
					longitude: 80.560867
				}
			]
		},
		{
			id: "LK-33", // Hambantota
			color: "#D6CB71",
			images: [
				{
					type: districtCapitalType,
					color: districtCapitalColor,
					label: "Hambantota",
					latitude: 6.115908,
					longitude: 81.092127
				},{
					type: cityType,
					color: cityColor,
					label: "Tangalle",
					latitude: 6.028532,
					longitude: 80.794711
				},{
					type: cityType,
					color: cityColor,
					label: "Ambalantota",
					latitude: 6.122628,
					longitude: 81.026818
				},{
					type: cityType,
					color: cityColor,
					label: "Tissamaharama",
					latitude: 6.276229,
					longitude: 81.290513
				}
			]
		},
		{
			id: "LK-41", // Jaffna
			color: "#D3E488",
			images: [
				{
					type: districtCapitalType,
					color: districtCapitalColor,
					label: "Jaffna",
					latitude: 9.666476,
					longitude: 80.017584
				},{
					type: cityType,
					color: cityColor,
					label: "Chavakachcheri",
					latitude: 9.659181,
					longitude: 80.162276
				},{
					type: cityType,
					color: cityColor,
					label: "Point Pedro",
					latitude: 9.796002,
					longitude: 80.219897
				}
			]
		},
		{
			id: "LK-42", // Kilinochchi
			color: "#D3E488",
			images: [
				{
					type: districtCapitalType,
					color: districtCapitalColor,
					label: "Kilinochchi",
					latitude: 9.392665,
					longitude: 80.408273
				}
			]
		},
		{
			id: "LK-43", // Mannar
			color: "#D3E488",
			images: [
				{
					type: districtCapitalType,
					color: districtCapitalColor,
					label: "Mannar",
					latitude: 8.977245,
					longitude: 79.913768
				}
			]
		},
		{
			id: "LK-44", // Vavuniya
			color: "#D3E488",
			images: [
				{
					type: districtCapitalType,
					color: districtCapitalColor,
					label: "Vavuniya",
					latitude: 8.754219,
					longitude: 80.498198
				},{
					type: cityType,
					color: cityColor,
					label: "Puliyankulam",
					latitude: 8.964457,
					longitude: 80.525146
				}
			]
		},
		{
			id: "LK-45", // Mullaitivu
			color: "#D3E488",
			images: [
				{
					type: districtCapitalType,
					color: districtCapitalColor,
					label: "Mullaitivu",
					latitude: 9.269104,
					longitude: 80.812356
				},{
					type: cityType,
					color: cityColor,
					label: "Mankulam",
					latitude: 9.129832,
					longitude: 80.445607
				}
			]
		},
		{
			id: "LK-51", // Batticaloa
			color: "#FFF9AF",
			images: [
				{
					type: districtCapitalType,
					color: districtCapitalColor,
					label: "Batticaloa",
					latitude: 7.719950,
					longitude: 81.696589
				}
			]
		},
		{
			id: "LK-52", // Ampara
			color: "#FFF9AF",
			images: [
				{
					type: districtCapitalType,
					color: districtCapitalColor,
					label: "Ampara",
					latitude: 7.291143,
					longitude: 81.672373
				},{
					type: cityType,
					color: cityColor,
					label: "Kalmunai",
					latitude: 7.412990,
					longitude: 81.827064
				}
			]
		},
		{
			id: "LK-53", // Trincomalee
			color: "#FFF9AF",
			images: [
				{
					type: districtCapitalType,
					color: districtCapitalColor,
					label: "Trincomalee",
					latitude: 8.583782,
					longitude: 81.225662
				},{
					type: cityType,
					color: cityColor,
					label: "Mutur",
					latitude: 8.452043,
					longitude: 81.268321
				}
			]
		},
		{
			id: "LK-61", // Kurunegala
			color: "#F9A870",
			images: [
				{
					type: districtCapitalType,
					color: districtCapitalColor,
					label: "Kurunegala",
					latitude: 7.487052,
					longitude: 80.364969
				},{
					type: cityType,
					color: cityColor,
					label: "Kuliyapitiya",
					latitude: 7.470184,
					longitude: 80.043939
				}
			]
		},
		{
			id: "LK-62", // Puttalam
			color: "#F9A870",
			images: [
				{
					type: districtCapitalType,
					color: districtCapitalColor,
					label: "Puttalam",
					latitude: 8.036090,
					longitude: 79.834799
				},{
					type: cityType,
					color: cityColor,
					label: "Chilaw",
					latitude: 7.576667,
					longitude: 79.795687
				}
			]
		},
		{
			id: "LK-71", // Anuradhapura
			color: "#F6F3C0",
			images: [
				{
					type: districtCapitalType,
					color: districtCapitalColor,
					label: "Anuradhapura",
					latitude: 8.328733,
					longitude: 80.407518
				}
			]
		},
		{
			id: "LK-72", // Polonnaruwa
			color: "#F6F3C0",
			images: [
				{
					type: districtCapitalType,
					color: districtCapitalColor,
					label: "Polonnaruwa",
					latitude: 7.915830,
					longitude: 81.002232
				}
			]
		},
		{
			id: "LK-81", // Badulla
			color: "#FCD3C1",
			images: [
				{
					type: districtCapitalType,
					color: districtCapitalColor,
					label: "Badulla",
					latitude: 6.989799,
					longitude: 81.056904
				},{
					type: cityType,
					color: cityColor,
					label: "Bandarawela",
					latitude: 6.830461,
					longitude: 80.988783
				}
			]
		},
		{
			id: "LK-82", // Moneragala
			color: "#FCD3C1",
			images: [
				{
					type: districtCapitalType,
					color: districtCapitalColor,
					label: "Moneragala",
					latitude: 6.891614,
					longitude: 81.343561
				},{
					type: cityType,
					color: cityColor,
					label: "Bibile",
					latitude: 7.160659,
					longitude: 81.225425
				}
			]
		},
		{
			id: "LK-91", // Ratnapura
			color: "#CEDC7A",
			images: [
				{
					type: districtCapitalType,
					color: districtCapitalColor,
					label: "Ratnapura",
					latitude: 6.710995,
					longitude: 80.380338
				},{
					type: cityType,
					color: cityColor,
					label: "Balangoda",
					latitude: 6.650577,
					longitude: 80.699119
				}
			]
		},
		{
			id: "LK-92", // Kegalle
			color: "#CEDC7A",
			images: [
				{
					type: districtCapitalType,
					color: districtCapitalColor,
					label: "Kegalle",
					latitude: 7.252748,
					longitude: 80.341993
				},{
					type: cityType,
					color: cityColor,
					label: "Mawanella",
					latitude: 7.252198,
					longitude: 80.446806
				},{
					type: cityType,
					color: cityColor,
					label: "Ruwanwella",
					latitude: 7.045827,
					longitude: 80.253668
				}
			]
		}
	];
	return districts;
}

function setWidthsForAOI(){
	var place = $("#placeholder");
	var placeWidth = place.width();
	
	var aoi = $("#aoi-selection");
	var saoi = $("#saoi-selection");
	var ssaoi = $("#ssaoi-selection");
	
	if (placeWidth < 320){
		aoi.css({"width": "10px"});
		saoi.css({"width": "10px"});
		ssaoi.css({"width": "10px"});
	} else if (placeWidth < 350){
		aoi.css({"width": "15px"});
		saoi.css({"width": "15px"});
		ssaoi.css({"width": "15px"});
	} else if (placeWidth < 380){
		aoi.css({"width": "25px"});
		saoi.css({"width": "25px"});
		ssaoi.css({"width": "25px"});
	} else if (placeWidth < 410){
		aoi.css({"width": "35px"});
		saoi.css({"width": "35px"});
		ssaoi.css({"width": "35px"});
	} else if (placeWidth < 440){
		aoi.css({"width": "45px"});
		saoi.css({"width": "45px"});
		ssaoi.css({"width": "45px"});
	} else if (placeWidth < 470){
		aoi.css({"width": "55px"});
		saoi.css({"width": "55px"});
		ssaoi.css({"width": "55px"});
	} else if (placeWidth < 500){
		aoi.css({"width": "65px"});
		saoi.css({"width": "65px"});
		ssaoi.css({"width": "65px"});
	} else if (placeWidth < 530){
		aoi.css({"width": "75px"});
		saoi.css({"width": "75px"});
		ssaoi.css({"width": "75px"});
	} else if (placeWidth < 560) {
		aoi.css({"width": "85px"});
		saoi.css({"width": "85px"});
		ssaoi.css({"width": "85px"});
	} else if (placeWidth < 590) {
		aoi.css({"width": "95px"});
		saoi.css({"width": "95px"});
		ssaoi.css({"width": "95px"});
	} else if (placeWidth < 620) {
		aoi.css({"width": "105px"});
		saoi.css({"width": "105px"});
		ssaoi.css({"width": "105px"});
	} else if (placeWidth < 650) {
		aoi.css({"width": "115px"});
		saoi.css({"width": "115px"});
		ssaoi.css({"width": "115px"});
	} else if (placeWidth < 680) {
		aoi.css({"width": "125px"});
		saoi.css({"width": "125px"});
		ssaoi.css({"width": "125px"});
	} else if (placeWidth < 710) {
		aoi.css({"width": "135px"});
		saoi.css({"width": "135px"});
		ssaoi.css({"width": "135px"});
	} else {
		aoi.css({"width": "170px"});
		saoi.css({"width": "190px"});
		ssaoi.css({"width": "170px"});
	}
}

function setInfoForCharts(){
	$('#info-icon').tooltip('destroy');
	$("#info-icon").removeAttr("title");

	$("#info-icon").tooltip({
		animation: true,
		placement: "left",
		html: true,
		title: '<div style="text-align: left; font-size: 12px; margin: 8px 5px;"><p><i class="fa fa-info-circle fa-lg"></i>&nbsp; <b>Research institutes</b> in Sri Lanka with their physical location.</p><p>You can filter organizations and institutes by selecting area of interests from dropdown menu.</p></div>'
	});
}

function disableControls(){
	$("#btnChartTypeMap").attr("disabled", "disabled");
	$("#btnChartTypeList").attr("disabled", "disabled");
	$("#aoi-selection").attr("disabled", "disabled");
	$("#saoi-selection").attr("disabled", "disabled");
	$("#ssaoi-selection").attr("disabled", "disabled");
}

function enableControls(){
	$("#btnChartTypeMap").removeAttr("disabled");
	$("#btnChartTypeList").removeAttr("disabled");
	$("#aoi-selection").removeAttr("disabled");
	$("#saoi-selection").removeAttr("disabled");
	$("#ssaoi-selection").removeAttr("disabled");
}
