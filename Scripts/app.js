var app = angular.module("myapp", []);


var bootstrap = angular.module("myBootstrap",['ui.bootstrap'])




var OpenWifiData; //variable to store openWifiData

app.controller("ListController", function ($scope, $interval, $http) {
    $scope.value = "Hallo Joey";
});

app.controller("MapController", function ($scope, $interval, $http) {

    $http.get("http://localhost:3000/api/openData")
    .success(function (posts) {
        //collect the data from the api and put it in a object
        OpenWifiData = posts;
        $scope.items = OpenWifiData.data[0];
        console.log($scope.items);
        initialize = function () {
            console.log(OpenWifiData.data);
            directionsService = new google.maps.DirectionsService;
            directionsDisplay = new google.maps.DirectionsRenderer;
            map = new google.maps.Map(document.getElementById('map'), {
                zoom: 7,
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
        
    })
    .error(function (err) {
        console.log(err);
    });

   
   
});




