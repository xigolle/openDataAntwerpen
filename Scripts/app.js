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
