var http = require("http");
var fs = require("fs");
var config = JSON.parse(fs.readFileSync("config.json"));
var port = config.port;
var host = config.host;
var server = http.createServer(function(request, response) {
    console.log("Received request"+request.url)
   	fs.readFile("./public"+request.url,function(err,data){
   		if (err) {
            response.writeHead(404, {"Content-Type": "text/plain"});
            response.end("Page not found");
        }else{
            response.writeHead(200, {"Content-Type": "text/html"});
            response.end(data);
        }
   	}); 

});
server.listen(port,host,function(){
  console.log("listening");
});

fs.watchFile("config.json",function(current,prev){
    config = JSON.parse(fs.readFileSync("config.json"));
    port = config.port;
    host = config.host;
    server.close();
    server.listen(port,host,function(){
        console.log("new listening"+config.port+":"+config.host);
    });


});