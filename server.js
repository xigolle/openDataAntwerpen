/* <summary>
 * 
 Node JS file for the server configuration 
 Server works on port 3000
 File sends all the information including the different sub folders
 </summary>*/

var express = require("express");
var http = require("http");
var request = require("request");
var bodyparser = require("body-parser");
var path = require('path');

var app = express();
app.use(bodyparser.json());





var optionsget = {
    host: "datasets.antwerpen.be",
    path: "/v4/gis/wifiopenbaar.json",
    method: "GET"
}
var OpenWifiSpots = "";

var reqGet = http.request(optionsget, function(res) {
    res.on('data', function(mData) {
        OpenWifiSpots += mData;
    });
    res.on('end', function() {
        OpenWifiSpots = JSON.parse(OpenWifiSpots);
    });
    reqGet.on('error', function(e) {
        console.error(e);
    });
});

reqGet.end();


//make sure it gets all the folders and files.
app.use(express.static(path.join(__dirname, '')));

app.get("/api/openData", function (req, res) {
    //api with the json data on the server. Retrieved from reqget
            res.json(OpenWifiSpots);
    
    
    


});
//get the url and send the index.html
app.get("/", function (req, res) {
    
    res.sendFile(path.join(__dirname+"/index.html"));
    res.render('mytemplate', { data: OpenWifiSpots });
    
});
//listen to port 3000 
var serverOptions = {
    port: 3000,
    host:"localhost"
    };
var server = app.listen(serverOptions, function () {
    var address = server.address().address;
    var port = server.address().port;
    console.info("Server listening: http://%s:%s", address, port);
})
