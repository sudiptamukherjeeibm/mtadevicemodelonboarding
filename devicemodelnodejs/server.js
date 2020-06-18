/*eslint no-console: 0*/
"use strict";
var express = require("express");
var async = require("async");
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
var alternateIdDev = req.body.alternateIdDev;
var DeviceKey = req.body.DeviceKey;
var DeviceVal = req.body.DeviceVal;
var GatewayID= req.body.GatewayID;
var DeviceName = req.body.DeviceName;
var alternateIdSen = req.body.alternateIdSen;
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

/*POST service to create multiple Capabilities at a time using Asyncronous way
JSON Body sample
{
	"CreateCapability" : {
		"HostName" : "ibmprod.eu10.cp.iot.sap",
		"TenantId" : 2,
		"alternateId" : ["mescap7","mescap8"],
		"name" : ["MESTempCapability7","MESTempCapability8"],
		"propertyname" : ["MESTempProp7","MESTempProp8"],
		"dataType" : ["float","float"],
		"unitOfMeasure" : ["Celsius","Celsius"]
	}
}
*/
app.post('/CreateCapabilityAsync', function (req, res) {
	
	var HostName= req.body.CreateCapability.HostName;
	var TenantId= req.body.CreateCapability.TenantId;	
	var alternateIdCap = req.body.CreateCapability.alternateId;
	var CapabilityName = req.body.CreateCapability.name;
	var PropName = req.body.CreateCapability.propertyname;
	var dataTypeProp = req.body.CreateCapability.dataType;
	var UOM = req.body.CreateCapability.unitOfMeasure;
	var ResponseArray = [];
	console.log (UOM);
	async.each(CapabilityName, function (eachCapability, callback) {
		
		var currentitem = CapabilityName.indexOf(eachCapability);
		var PostMsg={
			"alternateId": alternateIdCap[currentitem],
			"name": CapabilityName[currentitem],
			"properties": [
    			{
    				"dataType": dataTypeProp[currentitem],
    				"formatter": {
        				"dataType": dataTypeProp[currentitem],
        				"scale": 0,
        				"shift": 0,
        				"swap": true
    				},
    				"name": PropName[currentitem],
    				"unitOfMeasure": UOM[currentitem]
    			}
			]
		};
		
		var options = {
			 method: 'POST',
			 hostname: HostName,
			 port: null,
			 path: '/ibmprod/iot/core/api/v1/tenant/'+TenantId+'/capabilities',
			 headers: {
			"accept": "*/*",
	    	"content-type": "application/json",
	    	"cache-control": "no-cache",
	    	"authorization": "Basic c3VkaXB0YW06SW5pdDEyMzQ="
			}
		};
	
		var dataEncoded=JSON.stringify(PostMsg);
		
		var requst = https.request(options, function (resp) {
			var body = '';
			resp.on('data', function (chunk) {
				//console.log("entered in data");
				body += chunk;
			});
			resp.on('end', function () {
				//console.log("entered in end");
				var dat = body;
				//console.log(dat);
				var msg = JSON.parse(dat);
				console.log(msg.name);
				ResponseArray.push(msg.name);
				callback(null);
			});
		});
		
		requst.write(dataEncoded);
		requst.end();
		// Async call is done, alert via callback

	}, function (err) {
		console.log("After successfully pushing data in response array");
		console.log(err);
		//If any of the user creation failed may throw error.
		if (err) {
			// One of the iterations produced an error.
			// All processing will now stop.
			console.log('something went wrong');
		} else {
			console.log("response array is:");
			console.log(ResponseArray);
			console.log("response array length is:");
			console.log(ResponseArray.length);
			res.type("application/json").status(202).send(ResponseArray);
			console.log("Success");
		}
	}); 

});
/*POST service to create multiple Devices at a time using Asyncronous way
JSON Body sample
{
	"CreateDevice" : {
"HostName" : "ibmprod.eu10.cp.iot.sap",
 "TenantId": "2",
 "alternateIdDev" : ["AsyncDevice1","AsyncDevice2"],
 "DeviceKey" : ["DevKey1","DevKey2"],
 "DeviceVal" : ["DevVal1","DevVal2"],
 "GatewayID" : ["3","3"],
 "DeviceName" : ["DeviceMES06","DeviceMES05"],
 "alternateIdSen" : ["AsyncSensor1","AsyncSensor2"],
 "SensorKey" : ["SenKey1","SenKey2"],
 "SensorValue" : ["SenVal1","SenVal12"],
 "SensorName" : ["SensorMES04","SensorMES05"],
 "SensorTypeId" : ["032fcf31-7b84-41e8-8ef9-50a7b2a48bd7","032fcf31-7b84-41e8-8ef9-50a7b2a48bd7"]
 }
}*/

app.post('/CreateDeviceAsync', function (req, res) {
	
var HostName= req.body.CreateDevice.HostName;
var TenantId= req.body.CreateDevice.TenantId;
var Path= '/ibmprod/iot/core/api/v1/tenant/'+TenantId+'/devices';
var alternateIdDev = req.body.CreateDevice.alternateIdDev;
var DeviceKey = req.body.CreateDevice.DeviceKey;
var DeviceVal = req.body.CreateDevice.DeviceVal;
var GatewayID= req.body.CreateDevice.GatewayID;
var DeviceName = req.body.CreateDevice.DeviceName;
var alternateIdSen = req.body.CreateDevice.alternateIdSen;
var SensorKey = req.body.CreateDevice.SensorKey;
var SensorValue = req.body.CreateDevice.SensorValue;
var SensorName = req.body.CreateDevice.SensorName;
var SensorTypeId = req.body.CreateDevice.SensorTypeId;
var ResponseArray = [];
	
	async.each(DeviceName, function (eachDevice, callback) {
		
		var currentitem = DeviceName.indexOf(eachDevice);
	var PostMsg={
  "alternateId": alternateIdDev[currentitem],
  "customProperties": [
    {
      "key": DeviceKey[currentitem],
      "value": DeviceVal[currentitem]
    }
  ],
  "gatewayId": GatewayID[currentitem],
  "name": DeviceName[currentitem],
  "sensors": [
    {
      "alternateId": alternateIdSen[currentitem],
      "customProperties": [
        {
          "key": SensorKey[currentitem],
          "value": SensorValue[currentitem]
        }
      ],
      "name": SensorName[currentitem],
      "sensorTypeId": SensorTypeId[currentitem]
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
		 

		resp.on('data', function (chunk) {
			body += chunk;
		  //chunks.push(chunk);
			
		});
		
		resp.on('end', function () {
			var dat = body;
			//var bod = Buffer.concat(chunks);
		var msg = JSON.parse(dat);
				console.log(msg.name);
				ResponseArray.push(msg.name);
				callback(null);
		
		});

	});
	
	//requst.write(postData);
	requst.write(dataEncoded);
    requst.end();
}, function (err) {
		console.log("After successfully pushing data in response array");
		console.log(err);
		//If any of the user creation failed may throw error.
		if (err) {
			// One of the iterations produced an error.
			// All processing will now stop.
			console.log('something went wrong');
		} else {
			console.log("response array is:");
			console.log(ResponseArray);
			console.log("response array length is:");
			console.log(ResponseArray.length);
			res.type("application/json").status(202).send(ResponseArray);
			console.log("Success");
		}
	}); 
});

/*http.createServer(function (req, res) {
  res.writeHead(200, {"Content-Type": "text/plain"});
  res.end("Hello World\n");
}).listen(port);*/

app.listen(port, function () {
	console.info("Listening on port: " + port );
});


console.log("Server listening on port %d", port);
