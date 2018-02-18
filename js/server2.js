const contract = require('./onOff2.js')


// var TestRPC = require("ethereumjs-testrpc");
// var server = TestRPC.server();


// var port = 3000;
// server.listen(port, function() {
// });


// app.listen(port, function() {
//     homeController.check_health();
// });

const express = require('express')
const app = express()

app.get('/', (req, res) => res.send('Hello World!'))

app.listen(3000, () => {
	console.log('Example app listening on port 3000!');
	contract.deploy().then(res => {
		var c = contract.bindEventListener(res);
		contract.sendTx(c);
		console.log('done')
		contract.getState().then(console.log)
	})
	// let c = contract.deploy();
	// contract.bindEventListener(c);
	// contract.sendTx(c);
	// console.log('done');
});