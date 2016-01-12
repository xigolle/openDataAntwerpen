var app = angular.module("myapp", []);


var OpenWifiData; //variable to store openWifiData

//Json controller to get the JSON data from the api
app.controller("JSONController", function ($scope, $interval,$http) {
    $http.get("http://localhost:3000/api/openData")
    .success(function (posts) {
        //collect the data from the api and put it in a object
        OpenWifiData = posts;
    })
    .error(function (err) {
        console.log(err);
    });
   
});

app.controller("MapController", function ($scope) {
    //console.log("hello map controller");

    initialize = function () {
        directionsService = new google.maps.DirectionsService;
        directionsDisplay = new google.maps.DirectionsRenderer;
        map = new google.maps.Map(document.getElementById('map'), {
            zoom: 7,
            center: { lat: 41.85, lng: -87.65 }
        });
        directionsDisplay.setMap(map);

        onChangeHandler = function () {
            calculateAndDisplayRoute(directionsService, directionsDisplay);
        };
        onChangeHandler();
    }

    
    calculateAndDisplayRoute = function () {
        directionsService.route({
            origin: { lat: 40.85, lng: -87.65 },
            destination: { lat: 45.85, lng: -87.35 },
            travelMode: google.maps.TravelMode.WALKING
        }, function (response, status) {
            if (status === google.maps.DirectionsStatus.OK) {
                directionsDisplay.setDirections(response);
                document.write("het werkt volledig")
            } else {
                window.alert('Directions request failed due to ' + status);
            }
        });
    }

    google.maps.event.addDomListener(window, 'load', initialize);
});



