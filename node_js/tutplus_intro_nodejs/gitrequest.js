var https = require("https");
var username = "farhan-faruque";
var options = {
	host:"api.github.com",
	path:"/users/"+username+"/repos",
	method:"GET",
	headers: {'user-agent': 'node.js'}
};
var request = https.request(options,function(response){
	var body = '';
	
	response.on("data",function(chunk){
        body += chunk.toString("utf8");
    });

    response.on("end",function(){
    	var json = JSON.parse(body);
    	console.log("Lenght :",json.length)
    });

});

request.end();