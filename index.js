var express = require("express");
var parseString = require('xml2js').parseString;
var app = express();
app.set('views', "views")
app.set('view engine', 'jade')
app.use(express.static(__dirname));
app.get('/', function(req, res) {
    /*
//var options = { host: 'carpetsforairports.com', path: '/assets/data.xml'};
var options = { host: 'pastebin.com', path: '/raw.php?i=NhM4zDSk'};
var request = http.get(options).on('response', function(response) {
	var string = "";
	response.setEncoding("utf-8");
	response.on('data', function(data) {
		string=string+data;
	});
	response.on('end', function(){
		parseString(string, function (err, result) {
			var objArray=result["globe_location_list"]["location"];
			var dataArray = new Array;
			for(var ele in objArray) {
			dataArray.push(objArray[ele]["$"]);
			}
		    res.render('index',{ 
			data: JSON.stringify(dataArray)
			});
		});

	});
});
*/
});
var port = process.env.PORT || 3000;
app.listen(port, function() {
    console.log("Listening on " + port);
});