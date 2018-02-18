// Kostco: node server2.js 463bf15d64f138ac495718752fd73f2ef37eed33c29d1119f045744734dcc033 y y /dev/cu.usbmodem1461

const contract = require('./onOff2.js')

const express = require('express')
const app = express()

var SerialPort = require('serialport');
var arduino = false;
var c = false;

// 1 - privKey, 2 - arduino?
process.argv.forEach((val, index) => {
  console.log(`${index}: ${val}`);
});

// e.g. node server2.js 0x45.. true true
var privKey = process.argv[2] || '463bf15d64f138ac495718752fd73f2ef37eed33c29d1119f045744734dcc033';
var isDevMode = process.argv[3] == 'y' || false;
var runArduino = process.argv[4] == 'y' || false;
var arduinoPort = process.argv[5] || "/dev/ttyACM0";

function startArduino() {
	arduino = new SerialPort(arduinoPort,9600);
}


var lights = [5,6,7]; 
var currLight = 0;
function cycle(){
	console.log("Cycle run.");
	if (runArduino){
		currLight++;
		if (currLight == 3) currLight = 0; 
		arduino.write(lights[currLight]+''); 
	};
}

if (runArduino) startArduino();

app.get('/', (req, res) => {
	if (c) contract.sendTx(c).then(console.log);
	res.send('Hello World! Lets change the lights!!!!');
})

app.listen(3000, () => {
	console.log('Example app listening on port 3000!');
	contract.deploy(privKey, isDevMode).then(res => {

		c = contract.bindEventListener(res, cycle);

		// start seq
		if (runArduino){ arduino.write("9"); };

		contract.sendTx(c).then(res => {
			console.log('st');
			return contract.getState(c);
		}).then(res => {
			console.log('gt', res);
			return contract.sendTx(c);
		}).then(res => {
			console.log('st');
			return contract.getState(c);
		}).then(res => {
			console.log('gt', res);
			return contract.sendTx(c);
		}).then(res => {
			console.log('done', res);
		});

		// .then(res => {
		// 	console.log('gt', res);
		// 	return contract.sendTx(c);
		// }).then(res => {
		// 	console.log('st');
		// 	return contract.getState(c);
		// })

		// contract.sendTx(c).then(res => {
		// 	console.log('st');
		// 	return contract.getState(c);
		// }).then(res => {
		// 	console.log('gt', res);
		// 	return contract.sendTx(c);
		// }).then(res => {
		// 	console.log('st');
		// 	return contract.getState(c);
		// }).then(res => {
		// 	console.log('gt', res);
		// 	return contract.sendTx(c);
		// }).then(res => {
		// 	console.log('st');
		// 	return contract.getState(c);
		// }).then(res => {
		// 	console.log('done', res);
		// });

	})
});


