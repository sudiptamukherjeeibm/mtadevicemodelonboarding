/*eslint no-console: 0*/
"use strict";
var express = require("express");
var app = express();
var http = require("http");
var port = process.env.PORT || 3000;
var https = require("https");
var request = require("request");


app.get('/CreateCapability', function (req, res) {
	//	console.log(req.body);
	console.log ("Hi below is request body for POST");
	//console.log(fs.readFileSync(CERTIFICATE_FILE));
	var PostMsg={
			"alternateId": "mescap5",
			"name": "MESTempCapability5",
			"properties": [
    			{
    				"dataType": "float",
    				"formatter": {
        				"dataType": "float",
        				"scale": 0,
        				"shift": 0,
        				"swap": true
    				},
    				"name": "MESTempProp5",
    				"unitOfMeasure": "Celsius"
    			}
			]
		};
		
//	var postData =  "{\n  \"alternateId\": \"mescap4\",\n  \"name\": \"MESTempCapability4\",\n  \"properties\": [\n    {\n      \"dataType\": \"float\",\n      \"formatter\": {\n        \"dataType\": \"float\",\n        \"scale\": 0,\n        \"shift\": 0,\n        \"swap\": true\n      },\n      \"name\": \"MESTempProp4\",\n      \"unitOfMeasure\": \"Celsius\"\n    }\n  ]\n}";
	
	var options = {
		 method: 'POST',
		 hostname: 'ibmprod.eu10.cp.iot.sap',
		 port: null,
		 path: '/ibmprod/iot/core/api/v1/tenant/2/capabilities',
		 //cert: fs.readFileSync(CERTIFICATE_FILE_PEM),
		 //key: fs.readFileSync(CERTIFICATE_FILE_PEM),
         //passphrase: 'yTRWxuva3gR6HIbIhRzqe1Orfa8yulyYJy3x',
        // "authorization": "Basic c3VkaXB0YW06SW5pdDEyMzQ=",
		 headers: {
		"accept": "*/*",
    	"content-type": "application/json",
    	"cache-control": "no-cache",
    	"authorization": "Basic c3VkaXB0YW06SW5pdDEyMzQ="
		}
		/*agentOptions: {
        pfx: fs.readFileSync(CERTIFICATE_FILE_P12),
        passphrase: 'tHRsLVoPVeylHwRxWzOvVCxqAt1Pt8koIFS9'
    	}*/
	};
	var dataEncoded=JSON.stringify(PostMsg);

var requst=	https.request(options, function (resp) {
		var body = '';
		 var chunks = [];

		resp.on('data', function (chunk) {
			body += chunk;
		  //chunks.push(chunk);
			
		});
		
		resp.on('end', function () {
			var dat = body;
			//var bod = Buffer.concat(chunks);

		res.type("application/json").status(202).send(dat);
		});

	});
	
	//requst.write(postData);
	requst.write(dataEncoded);
    requst.end();

});

/*http.createServer(function (req, res) {
  res.writeHead(200, {"Content-Type": "text/plain"});
  res.end("Hello World\n");
}).listen(port);*/

app.listen(port, function () {
	console.info("Listening on port: " + port );
});


console.log("Server listening on port %d", port);
