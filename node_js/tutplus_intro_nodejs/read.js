var fs = require("fs");
fs.readFile("sample.txt",readFileCallback);
var readFileCallback = function(error,data){
	console.log(" "+data);
}

