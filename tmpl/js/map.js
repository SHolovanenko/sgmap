var map;
var markers = [];
var markersOnMap = [];
var directionsService;
var directionsDisplay;
var infoWindow;

function initMap() {
    
    var uluru = {
        lat: 50.891894,
        lng: 34.842990,
    };

    map = new google.maps.Map(document.getElementById("googleMap"), {
        zoom: 16,
        center: uluru,
    });

    directionsService = new google.maps.DirectionsService;
    directionsDisplay = new google.maps.DirectionsRenderer;

    directionsDisplay.setMap(map);
}

function calculateAndDisplayRoute() {

    directionsService.route({
        origin: document.getElementById('start').value,
        destination: document.getElementById('end').value,
        travelMode: google.maps.TravelMode.DRIVING
    }, function (response, status) {
        if(status === 'OK') {
            directionsDisplay.setDirections(response);
        } else {
            window.alert("Error with request: " + status);
        }
    });
}

function main() {

    document.getElementById("name").value = "";
    document.getElementById("city").value = "";
    markers = loadMarkers(dataMarkers);
    console.log(dataMarkers);
    //markers = dataMarkers;
    displayMarkers(markers.universities);
}

function displayMarkers(markers) {

    for (var i = 0; i < markers.length; i++) {
        addMarker(markers[i]);
    }
}

function addMarker(data) {
    console.log(data);
    var contentString = "<p>Назва: " + data.Name + "</p>" +
            "<p>Адреса: " + data.City + " " + data.Street + " " + data.Building + "</p>";

    if (data.Info){
        let numberOfAdditionalInfo = data.Info.length;
        for (let i = 0; i < numberOfAdditionalInfo; i++){
            contentString += "<p>" + data.Info[i].title + ": " + data.Info[i].value + "</p>";
        }
    }

    var infoWindow = new google.maps.InfoWindow({
        content: contentString
    });

    var marker = new google.maps.Marker({
        position: new google.maps.LatLng(data.Lat, data.Lng),
        map: map
    });

    marker.addListener("click", function () {
        infoWindow.open(map, marker);
    });

    markersOnMap.push(marker);
    //map.setCenter(marker.getPosition());
}

function deleteMarkers() {
    
    for (var i = 0; i < markersOnMap.length; i++) {
        markersOnMap[i].setMap(null);
    }

    markersOnMap = [];
}

function filterMarkers() {
    
    var name = document.getElementsByName("name")[0].value;
    var city = document.getElementsByName("city")[0].value;

    const result = markers.universities.
    filter(function (m) { return m.Name.includes(name); }).
    filter(function (m) { return m.City.includes(city); });

    deleteMarkers();
    displayMarkers(result);
}

function loadMarkers(data) {
    let universities = {"universities": []};
    let numberOfElements = data.length;
    for (let i = 0; i < numberOfElements; i++) {
        let marker = {
            "Name":"",
            "City":"",
            "Street":"",
            "Building":"",
            "Lat":"",
            "Lng":"",
            "Info":[]
        };
        let numberOfFields = data[i].element.length;
        for (let j = 0; j < numberOfFields; j++) {
            switch (data[i].element[j].title) {
                case "Name": {
                    marker.Name = data[i].element[j].value;
                    break;
                }
                case "City": {
                    marker.City = data[i].element[j].value;
                    break;
                }
                case "Street": {
                    marker.Street = data[i].element[j].value;
                    break;
                }
                case "Building": {
                    marker.Building = data[i].element[j].value;
                    break;
                }
                case "Lat": {
                    marker.Lat = data[i].element[j].value;
                    break;
                }
                case "Lng": {
                    marker.Lng = data[i].element[j].value;
                    break;
                } 
                default: {
                    marker.Info.push({
                        "title": data[i].element[j].title, 
                        "value": data[i].element[j].value
                    });
                    break;
                }
            }
        }
        universities.universities.push(marker);
    }
    return universities;
}