/*eslint no-console: 0*/
"use strict";
var express = require("express");
var app = express();
var http = require("http");
var port = process.env.PORT || 3000;
var https = require("https");
var request = require("request");

app.get('/DeviceTest1', function (req, res) {
	//	console.log(req.body);
		console.log ("Hi below is request body");
	var options = {
		hostname: 'ibmprod.eu10.cp.iot.sap',
		port: null,
		//path: '/iot/processing/api/v1/tenant/2/measures/capabilities/'+capacityId+'?filter=(sensorId%20eq%20%27'+sensorId+'%27)&skip=0&top=100', 
		path: '/iot/processing/api/v1/tenant/2/measures/capabilities/a0a616fa-9c58-466d-835e-18e5b8f6e5b5?filter=(sensorId%20eq%20%2752f54ec1-8df2-4e2a-bf11-5624a6b319fe%27)&skip=0&top=100', 
		
		//path: '/ibmprod/iot/core/api/v1/tenant/2/devices/cbe4ee84-048c-4b78-9e56-2565782f0099/measures?skip=0&top=100', 
	//	https://ibmprod.eu10.cp.iot.sap/ibmprod/iot/core/api/v1/tenant/2/devices/cbe4ee84-048c-4b78-9e56-2565782f0099/measures?skip=0&top=100
		method: 'GET',
		
		headers: {
			   "cache-control": "no-cache",
           "authorization": "Basic c3VkaXB0YW06SW5pdDEyMzQ="
		}
	};

var requst=	https.request(options, function (resp) {
		var body = '';
		 var chunks = [];

		resp.on('data', function (chunk) {
			body += chunk;
		  chunks.push(chunk);
			
		});
		
		resp.on('end', function () {
			var dat = body;
			 var bod = Buffer.concat(chunks);
          //  console.log(bod.toString());
		//	console.log ("Hi");
		//	console.log(dat);
			
		res.type("application/json").status(200).send(dat);
		});

		//console.log("Server listening on port %d", port);
	});
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
