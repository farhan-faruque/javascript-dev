var fs = require("fs");
console.log("starting");
fs.readFile("sample.txt",function(error,data){
	console.log("content file "+data);
});
console.log("carry on executing")
