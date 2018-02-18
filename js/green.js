//Ryan Fleck - uOttaHack 2018 - green.js
//Usage: node green.js

var SerialPort = require('serialport');
var arduino = new SerialPort("/dev/ttyACM0",9600);

setTimeout(function(){
  arduino.write("5");
  arduino.close(); 
  },2000);
