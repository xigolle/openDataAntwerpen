var app = angular.module("myapp", []);


var bootstrap = angular.module("myBootstrap", ['ui.bootstrap'])




var OpenWifiData; //variable to store openWifiData
var initialLocation;
var geoLocation = new Boolean();
var distance = 999999999999999999999999999999999999;
var closest;

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
    OpenWifiData = myService.async().then(function (d) {
        //$scope.data = d;
        //console.log(OpenWifiData);
        console.log("When am i done?");
        initialize();
    });

        
    
        initialize = function () {
            directionsService = new google.maps.DirectionsService;
            directionsDisplay = new google.maps.DirectionsRenderer;
            map = new google.maps.Map(document.getElementById('map'), {
                zoom: 14
            });

            var icon = {
                url: "../Images/WifiIcon.png",
                scaledSize: new google.maps.Size(50,50)
            };         

            // Try W3C Geolocation (Preferred)
            if (navigator.geolocation) {               
                navigator.geolocation.getCurrentPosition(function (position) {
                    initialLocation = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
                    geoLocation = true;
                    map.setCenter(initialLocation);
                    putMarkers(position.coords.latitude, position.coords.longitude, geoLocation);
                    
                }, function () {
                    geoLocation = false;
                    handleNoGeolocation(geoLocation);
                });
            }
                // Browser doesn't support Geolocation
            else {
                geoLocation = false;
                handleNoGeolocation(geoLocation);
            }

            function handleNoGeolocation(geoLocationSucces) {
                map.setCenter({ lat: 51.219710, lng: 4.409398 });
                putMarkers(51.219710, 4.409398, geoLocationSucces);
            }

            function putMarkers(userLat, userLong, geoLocationSucces) {

                for (var i = 0 ; i < OpenWifiData.data.length; i++) {
                    marker = new google.maps.Marker({
                        map: map,
                        position: { lat: parseFloat(OpenWifiData.data[i].point_lat), lng: parseFloat(OpenWifiData.data[i].point_lng) },
                        title: OpenWifiData.data[i].locatie,
                        icon: icon

                    });
                    
                    newDistance = Math.abs(userLat - parseFloat(OpenWifiData.data[i].point_lat)) + Math.abs(userLong - parseFloat(OpenWifiData.data[i].point_lng));
                    if (distance > newDistance) {
                        distance = newDistance;
                        closest = OpenWifiData.data[i];
                    }
                    
                }
                if (geoLocationSucces) {
                    marker = new google.maps.Marker({
                        map: map,
                        position: initialLocation,
                        title: "User"
                    });
                    directionsDisplay.setMap(map);
                    calculateAndDisplayRoute(/*directionsService, directionsDisplay*/);
                }
            }

           

            /*directionsDisplay.setMap(map);

            onChangeHandler = function () {
                calculateAndDisplayRoute(directionsService, directionsDisplay);
            };
            //onChangeHandler();*/
        }
      

        calculateAndDisplayRoute = function () {
            directionsService.route({
                origin: initialLocation,
                destination: { lat: parseFloat(closest.point_lat), lng: parseFloat(closest.point_lng) },
                travelMode: google.maps.TravelMode.WALKING
            }, function (response, status) {
                if (status === google.maps.DirectionsStatus.OK) {
                    directionsDisplay.setDirections(response);
                } else {
                    window.alert('Directions request failed due to ' + status);
                }
            });
        }

        //google.maps.event.addDomListener(window, 'load', initialize);

    
    //.error(function (err) {
    //    console.log(err);
    //});

    

});

app.controller("ListController", function ($scope, $interval, $http, myService) {
    $scope.naam = "joey";
    $scope.value = "value";
    $scope.item = "item";
    //$scope.value = OpenWifiData.data;
    myService.async().then(function (d) {
        $scope.openData = d;
    })
    
});
//TODO: lijst mooier maken en button toevoegen.



