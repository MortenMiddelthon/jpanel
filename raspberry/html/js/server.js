"use strict";

var serialport = require("serialport"); 
var SerialPort = serialport;

var serialPort = new SerialPort("/dev/ttyUSB0", {
	  baudrate: 9600,
	    parser: serialport.parsers.readline("\n")
});

var delay = 10000;
var timeoutID;

// Optional. You will see this name in eg. 'ps' or 'top' command
process.title = 'jpanel-server';

// Port where we'll run the websocket server
var webSocketsServerPort = 31337;

// websocket and http servers
var webSocketServer = require('websocket').server;
var http = require('http');

/**
 * Global variables
 */
// latest 100 messages
var history = [ ];
// list of currently connected clients (users)
var clients = [ ];

// judge_panels
var panels = ["-", "-", "-"];

/**
 * Helper function for escaping input strings
 */
function htmlEntities(str) {
    return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;')
                      .replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

/**
 * HTTP server
 */
var server = http.createServer(function(request, response) {
    // Not important for us. We're writing WebSocket server, not HTTP server
});
server.listen(webSocketsServerPort, function() {
    console.log((new Date()) + " Server is listening on port " + webSocketsServerPort);
});

/**
 * WebSocket server
 */
var wsServer = new webSocketServer({
    // WebSocket server is tied to a HTTP server. WebSocket request is just
    // an enhanced HTTP request. For more info http://tools.ietf.org/html/rfc6455#page-6
    httpServer: server
});

// This callback function is called every time someone
// tries to connect to the WebSocket server
wsServer.on('request', function(request) {
    console.log((new Date()) + ' Connection from origin ' + request.origin + '.');

    // accept connection - you should check 'request.origin' to make sure that
    // client is connecting from your website
    // (http://en.wikipedia.org/wiki/Same_origin_policy)
    var connection = request.accept(null, request.origin); 
    // we need to know client index to remove them on 'close' event
    var index = clients.push(connection) - 1;
    var userName = false;
    var userColor = false;

    console.log((new Date()) + ' Connection accepted.');

    // user disconnected
    connection.on('close', function(connection) {
        if (userName !== false && userColor !== false) {
            console.log((new Date()) + " Peer "
                + connection.remoteAddress + " disconnected.");
            // remove user from the list of connected clients
            clients.splice(index, 1);
        }
    });
});

serialPort.on('data', function (data) {
	console.log('Data: ' + data);
	var id = 0;
	var button = 0;
	id = data.substr(1,1);
	button = data.substr(3,1);
	id.trim();
	button.trim();
	console.log('ID: ', id);
	console.log('button: ', button);
	var json = JSON.stringify({ type:'message', id: id, button: button });
	panels[id] = json;
//	console.log("JSON ", id, panels[id]);
	transmit();
});

function transmit() {
	// if variables are set for all panels
	// broadcast message to all connected clients
	if(isJSON(panels[0]) && isJSON(panels[1]) && isJSON(panels[2])) {
		console.log("All panels pressed");
		for (var i=0; i < clients.length; i++) {
			clients[i].sendUTF(panels[0]);
			clients[i].sendUTF(panels[1]);
			clients[i].sendUTF(panels[2]);
		}
		// Reset
		panels = ["-", "-", "-"];
		timeoutID = window.setTimeout(pause, delay);
	}
}

function isJSON(str) {
	try {
		JSON.parse(str);
	} catch (e) {
		return false;
	}
	return true;
}

function pause() {
}
