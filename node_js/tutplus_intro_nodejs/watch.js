
var fs = require("fs");
var configStr = fs.readFileSync("config.json");
console.log(""+configStr);
var config = JSON.parse(configStr);
console.log(config);
fs.watchFile("config.json",function(current,previous){
	
	console.log("",current.toString());
});
