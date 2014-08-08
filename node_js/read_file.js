var fs = require("fs");
console.log("Running");
fs.readFile("my_time.txt",function(err,data){
	console.log("contents"+data);
});
console.log("completing");

