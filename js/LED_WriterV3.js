//Ryan Fleck - uOttaHack 2018 - LED_WriterV3.js
//Usage: node LED_WriterV3.js 5 <- insert 5,6 or 7.

var pin = process.argv[2];
var SerialPort = require('serialport');
var arduino = new SerialPort("/dev/ttyACM0",9600);

setTimeout(function(){
  arduino.write(pin);
  console.log("Sent '"+pin+"' to arduino.");
  arduino.close(); 
  },2000);
