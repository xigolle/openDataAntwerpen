var app = angular.module("myapp", []);

app.controller("MapController", function ($scope) {
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
            origin: { lat: 41.85, lng: -87.65 },
            destination: { lat: 40.85, lng: -87.35 },
            travelMode: google.maps.TravelMode.WALKING
        }, function (response, status) {
            if (status === google.maps.DirectionsStatus.OK) {
                directionsDisplay.setDirections(response);
                console.write("het werkt volledig")
            } else {
                window.alert('Directions request failed due to ' + status);
            }
        });
    }

    google.maps.event.addDomListener(window, 'load', initialize);
})

/*function initialize() {
    var directionsService = new google.maps.DirectionsService;
    var directionsDisplay = new google.maps.DirectionsRenderer;
    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 7,
        center: { lat: 41.85, lng: -87.65 }
    });
    directionsDisplay.setMap(map);

    var onChangeHandler = function () {
        calculateAndDisplayRoute(directionsService, directionsDisplay);
    };
    onChangeHandler();
}

function calculateAndDisplayRoute(directionsService, directionsDisplay) {
    directionsService.route({
        origin: { lat: 41.85, lng: -87.65 },
        destination: { lat: 40.85, lng: -87.35 },
        travelMode: google.maps.TravelMode.WALKING
    }, function (response, status) {
        if (status === google.maps.DirectionsStatus.OK) {
            directionsDisplay.setDirections(response);
            console.log("het werkt volledig");
        } else {
            window.alert('Directions request failed due to ' + status);
        }
    });
}
google.maps.event.addDomListener(window, 'load', initialize);*/