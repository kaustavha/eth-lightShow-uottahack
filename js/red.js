//Ryan Fleck - uOttaHack 2018 - red.js
//Usage: node red.js

var SerialPort = require('serialport');
var arduino = new SerialPort("/dev/ttyACM0",9600);

setTimeout(function(){
  arduino.write("6");
  arduino.close(); 
  },2000);
