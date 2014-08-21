var http = require("http");
var fs = require("fs");
var config = JSON.parse(fs.readFileSync("config.json"));
var port = config.port;
var host = config.host;
var express = require("express");
var app = express();
app.use(express.Router());
app.use(express.static(__dirname + '/public'));
app.get("/",function(request,response){
	response.send("hello");
});
app.get("/hello/:text",function(req,response){
	response.send("Hello "+ req.params.text);
});

app.listen(port,host);