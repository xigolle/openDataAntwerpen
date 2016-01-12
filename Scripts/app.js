var app = angular.module("myapp", []);


var bootstrap = angular.module("myBootstrap", ['ui.bootstrap'])




var OpenWifiData; //variable to store openWifiData
var initialLocation;
var browserSupportFlag = new Boolean();

app.factory('myService', function ($http) {
    var myService = {
        async: function () {
            //$http returns a promise, which has a then function, which also returns a promise
            var promise = $http.get('http://localhost:3000/api/openData').then(function (response) {
                //the then function here is an opportunity to modify the response
                //the return value gets picked up by the then in the controller
                OpenWifiData = response.data;
                return response.data.data;
            });
            //return promise to controller
            return promise;
        }
    }
    return myService;
});



app.controller("MapController", function ($scope, $interval, $http, myService) {

    //function which retrieves the data when retrieved sets it in the correct variable
    myService.async().then(function (d) {
        //$scope.data = d;
        //console.log(OpenWifiData);
    })
    
    
        initialize = function () {
            console.log(OpenWifiData.data);
            directionsService = new google.maps.DirectionsService;
            directionsDisplay = new google.maps.DirectionsRenderer;
            map = new google.maps.Map(document.getElementById('map'), {
                zoom: 14,
                center: { lat: 41.85, lng: -87.65 }
            });

            var icon = {
                url: "../Images/WifiIcon.png",
                scaledSize: new google.maps.Size(50,50)
                //origin: new google.maps.Point(0,0)
            };

            for (var i = 0 ; i < OpenWifiData.data.length; i++) {
                console.log(OpenWifiData.data[i]);
                marker = new google.maps.Marker({
                    map: map,
                    position: { lat:  parseFloat(OpenWifiData.data[i].point_lat), lng: parseFloat(OpenWifiData.data[i].point_lng) },
                    title: OpenWifiData.data[i].locatie,
                    icon: icon

                });
            }

            // Try W3C Geolocation (Preferred)
            if (navigator.geolocation) {
                browserSupportFlag = true;
                navigator.geolocation.getCurrentPosition(function (position) {
                    initialLocation = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
                    map.setCenter(initialLocation);
                }, function () {
                    handleNoGeolocation(browserSupportFlag);
                });
            }
                // Browser doesn't support Geolocation
            else {
                browserSupportFlag = false;
                handleNoGeolocation(browserSupportFlag);
            }

            function handleNoGeolocation(errorFlag) {
                if (errorFlag == true) {
                    alert("Geolocation service failed.");
                    //initialLocation = newyork;
                } else {
                    alert("Your browser doesn't support geolocation. We've placed you in Siberia.");
                    //initialLocation = siberia;
                }
                //map.setCenter(initialLocation);
            }

            directionsDisplay.setMap(map);

            onChangeHandler = function () {
                calculateAndDisplayRoute(directionsService, directionsDisplay);
            };
            //onChangeHandler();
        }


        calculateAndDisplayRoute = function () {
            directionsService.route({
                origin: { lat: 40.85, lng: -87.65 },
                destination: { lat: 45.85, lng: -87.35 },
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

        google.maps.event.addDomListener(window, 'load', initialize);

    
    //.error(function (err) {
    //    console.log(err);
    //});

    

});

app.controller("ListController", function ($scope, $interval, $http, myService) {
    //$scope.value = OpenWifiData.data;
    myService.async().then(function (d) {
        $scope.openData
    })
    
});




