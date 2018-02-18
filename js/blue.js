//Ryan Fleck - uOttaHack 2018 - blue.js
//Usage: node blue.js

var SerialPort = require('serialport');
var arduino = new SerialPort("/dev/ttyACM0",9600);

setTimeout(function(){
  arduino.write("7");
  arduino.close(); 
  },2000);
