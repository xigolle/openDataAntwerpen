/* <summary>
 * 
 Node JS file for the server configuration 
 Server works on port 3000
 File sends all the information including the different sub folders
 </summary>*/

var express = require("express");
var app = express();
var request = require("request");
var path = require('path');
var OpenWifiSpots;

request('http://datasets.antwerpen.be/v4/gis/wifiopenbaar.json', function (error, response, body) {
    if (!error && response.statusCode == 200) {
        OpenWifiSpots = JSON.parse(body);
       
    }
});

//make sure it gets all the folders and files.
app.use(express.static(path.join(__dirname, '')));

//get the url and send the index.html
app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname+"/index.html"));
    res.render('mytemplate', { data: OpenWifiSpots });
});
//listen to port 3000 
app.listen(3000);
