// DEPRECATION: Please use `require('serialport')` instead of `require('serialport').SerialPort`

var serialport = require("serialport"); 
var SerialPort = serialport;

var serialPort = new SerialPort("/dev/ttyUSB0", {
	  baudrate: 9600,
	    parser: serialport.parsers.readline("\n")
});

serialPort.on('data', function (data) {
	  console.log('Data: ' + data);
});
