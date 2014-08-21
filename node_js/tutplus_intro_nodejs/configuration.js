var fs = require('fs');
var user = fs.readFileSync("config.json");
console.log(""+user);
var f = getJson(user);


if(f != null)
console.log(f.name);


function getJson(str){
var farhan = null;

	try{
	farhan = JSON.parse(str);
	}catch(e)
	{
	console.log(e.toString());
	 return null;	
	}
	return farhan;
}
