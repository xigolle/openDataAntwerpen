﻿/* <summary>
 * 
 Node JS file for the server configuration 
 Server works on port 3000
 File sends all the information including the different sub folders
 </summary>*/

var express = require("express");
var app = express();
var path = require('path');



app.use(express.static(path.join(__dirname, '')));
app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname+"/index.html"));
});

app.listen(3000);
