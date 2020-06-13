/*eslint no-console: 0*/
"use strict";
var express = require("express");
var app = express();
var http = require("http");
var port = process.env.PORT || 3000;
var https = require("https");
var request = require("request");
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: false
}));
app.post('/GetDeviceFromMES', function (req, res) {
	
var HostName= req.body.HostName;
var TenantId= req.body.TenantId;
var Path= '/ibmprod/iot/core/api/v1/tenant/'+TenantId+'/devices';
var options = {
  method: 'GET',
  hostname: HostName,
  path: Path,
  headers: {
    "authorization": "Basic c3VkaXB0YW06SW5pdDEyMzQ=",
	"content-type": "application/json"
  }

};

var req = https.request(options, function (resp) {
  var chunks = [];
   
  resp.on('data', function (chunk) {
    chunks.push(chunk);
  });

  resp.on("end", function (chunk) {
    var body = Buffer.concat(chunks);
    console.log(body.toString());
	res.type("application/json").status(202).send(body);
  });
				   

  resp.on("error", function (error) {
    console.error(error);
  });
});

req.end();

});

app.post('/CreateDeviceMES', function (req, res) {
	
var HostName= req.body.HostName;
var TenantId= req.body.TenantId;
var Path= '/ibmprod/iot/core/api/v1/tenant/'+TenantId+'/devices';
var alternateIdDev = req.body.alternateId;
var DeviceKey = req.body.DeviceKey;
var DeviceVal = req.body.DeviceVal;
var GatewayID= req.body.GatewayID;
var DeviceName = req.body.DeviceName;
var alternateIdSen = req.body.alternateId;
var SensorKey = req.body.SensorKey;
var SensorValue = req.body.SensorValue;
var SensorName = req.body.SensorName;
var SensorTypeId = req.body.SensorTypeId;

	var PostMsg={
  "alternateId": alternateIdDev,
  "customProperties": [
    {
      "key": DeviceKey,
      "value": DeviceVal
    }
  ],
  "gatewayId": GatewayID,
  "name": DeviceName,
  "sensors": [
    {
      "alternateId": alternateIdSen,
      "customProperties": [
        {
          "key": SensorKey,
          "value": SensorValue
        }
      ],
      "name": SensorName,
      "sensorTypeId": SensorTypeId
    }
  ]
};

	
	var options = {
		 method: 'POST',
		 hostname: HostName,
		 port: null,
		 path: Path ,

		 headers: {
		"accept": "*/*",
    	"content-type": "application/json",
    	"cache-control": "no-cache",
    	"authorization": "Basic c3VkaXB0YW06SW5pdDEyMzQ="
		}

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


app.post('/GetSensorTypeFromMES', function (req, res) {
	
var HostName= req.body.HostName;
var TenantId= req.body.TenantId;
var Path= '/ibmprod/iot/core/api/v1/tenant/'+TenantId+'/sensorTypes';
var options = {
  method: 'GET',
  hostname: HostName,
  path: Path,
  headers: {
    "authorization": "Basic c3VkaXB0YW06SW5pdDEyMzQ=",
	"content-type": "application/json"
  }
};
var req = https.request(options, function (resp) {
  var chunks = [];
  resp.on('data', function (chunk) {
    chunks.push(chunk);
  });
  resp.on("end", function (chunk) {
    var body = Buffer.concat(chunks);
    console.log(body.toString());
	res.type("application/json").status(202).send(body);
  });
				  
  resp.on("error", function (error) {
    console.error(error);
  });
});
req.end();
});

app.post('/CreateSensorTypeMES', function (req, res) {
	//	console.log(req.body);
var HostName= req.body.HostName;
var TenantId= req.body.TenantId;	
var alternateIdSensor = req.body.alternateId;
var SensorName = req.body.name;
var sensorId = req.body.id;
var sensorType = req.body.type;
//var UOM = req.body.unitOfMeasure;
	console.log ("Hi below is request body for POST");
	//console.log(fs.readFileSync(CERTIFICATE_FILE));
	var PostMsg=
				{
				"alternateId":alternateIdSensor,
					"capabilities":[
						{
							"id":sensorId,
							"type":sensorType
						}
					],
				"name":SensorName
				};
	
			
	var options = {
		 method: 'POST',
		 hostname: HostName,
		 port: null,
		 path: '/ibmprod/iot/core/api/v1/tenant/'+TenantId+'/sensorTypes',
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

app.post('/GetCapabilitiesFromMES', function (req, res) {
	
var HostName= req.body.HostName;
var TenantId= req.body.TenantId;
var Path= '/ibmprod/iot/core/api/v1/tenant/'+TenantId+'/capabilities';
var options = {
  method: 'GET',
  hostname: HostName,
  path: Path,
  headers: {
    "authorization": "Basic c3VkaXB0YW06SW5pdDEyMzQ=",
	"content-type": "application/json"
  }
};
var req = https.request(options, function (resp) {
  var chunks = [];
  resp.on('data', function (chunk) {
    chunks.push(chunk);
  });
  resp.on("end", function (chunk) {
    var body = Buffer.concat(chunks);
    console.log(body.toString());
	res.type("application/json").status(202).send(body);
  });
				  
  resp.on("error", function (error) {
    console.error(error);
  });
});
req.end();
});

app.post('/CreateCapabilityMES', function (req, res) {
	//	console.log(req.body);
var HostName= req.body.HostName;
var TenantId= req.body.TenantId;	
var alternateIdCap = req.body.alternateId;
var CapabilityName = req.body.name;
var PropName = req.body.propertyname;
var dataTypeProp = req.body.dataType;
var UOM = req.body.unitOfMeasure;
	console.log ("Hi below is request body for POST");
	//console.log(fs.readFileSync(CERTIFICATE_FILE));
	var PostMsg={
			"alternateId": alternateIdCap,
			"name": CapabilityName,
			"properties": [
    			{
    				"dataType": dataTypeProp,
    				"formatter": {
        				"dataType": dataTypeProp,
        				"scale": 0,
        				"shift": 0,
        				"swap": true
    				},
    				"name": PropName,
    				"unitOfMeasure": UOM
    			}
			]
		};
		
//	var postData =  "{\n  \"alternateId\": \"mescap4\",\n  \"name\": \"MESTempCapability4\",\n  \"properties\": [\n    {\n      \"dataType\": \"float\",\n      \"formatter\": {\n        \"dataType\": \"float\",\n        \"scale\": 0,\n        \"shift\": 0,\n        \"swap\": true\n      },\n      \"name\": \"MESTempProp4\",\n      \"unitOfMeasure\": \"Celsius\"\n    }\n  ]\n}";
	
	var options = {
		 method: 'POST',
		 hostname: HostName,
		 port: null,
		 path: '/ibmprod/iot/core/api/v1/tenant/'+TenantId+'/capabilities',
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

app.get('/CreateCapability', function (req, res) {
	//	console.log(req.body);
	console.log ("Hi below is request body for POST");
	//console.log(fs.readFileSync(CERTIFICATE_FILE));
	var PostMsg={
			"alternateId": "mescap7",
			"name": "MESTempCapability7",
			"properties": [
    			{
    				"dataType": "float",
    				"formatter": {
        				"dataType": "float",
        				"scale": 0,
        				"shift": 0,
        				"swap": true
    				},
    				"name": "MESTempProp7",
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
