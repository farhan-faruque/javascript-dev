var fs = require('fs');
fs.writeFile('message.txt',"Hello Node",callback);
var callback = function(err,data){
	console.log(""+data);
}
