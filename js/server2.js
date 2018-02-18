const contract = require('./onOff2.js')

const express = require('express')
const app = express()

var SerialPort = require('serialport');
var arduino = new SerialPort("/dev/ttyACM0",9600);


function cycle(){
getTimeout(function(){ arduino.write("6"); },2000);
}

app.get('/', (req, cycle) => res.send('Hello World!'))

app.listen(3000, () => {
	console.log('Example app listening on port 3000!');
	contract.deploy().then(res => {

		var c = contract.bindEventListener(res);

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
			console.log('st');
			return contract.getState(c);
		}).then(res => {
			console.log('done', res);
		});
	})
});

arduino.close();
