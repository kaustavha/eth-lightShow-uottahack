const fs = require('fs');

const solc = require('solc');

const contractSrc = fs.readFileSync('../contracts/1OnOff.sol', 'utf8');

const compiledCtrct = solc.compile(contractSrc);
const byteCode = compiledCtrct.contracts[':OnOff'].bytecode;
const abiDefinition = JSON.parse(compiledCtrct.contracts[':OnOff'].interface);

console.log(byteCode, abiDefinition)
//ethers
const ethers = require('ethers')


var providers = require('ethers').providers;
var network = providers.networks.rinkeby;
var provider = new providers.JsonRpcProvider('http://localhost:8545', network);

var deployTransaction = ethers.Contract.getDeployTransaction('0x'+byteCode, abiDefinition);

console.log(deployTransaction);

// var provider = ethers.providers.getDefaultProvider();

/**

Available Accounts
==================
(0) 0x3a96e05472c19c1bc52c8e962506ff8d19530fad
(1) 0x9f1d5ee803e07f7e168b6ca4354144ceba6ef0e1
(2) 0xaa574b4263ce68267437e46d3a8fdfbc574f4fba
(3) 0x762bd69a21db0f34ad609f0ded20d726daa9b306
(4) 0x588daafcc42311ab3fffb9af5c655266a7b139b5
(5) 0x43307fe0b95d2f8be287b663352d3d959584a8c1
(6) 0x7fccdad4d146b3964954bfcfd28b079a1a526a75
(7) 0x4dcaf52bb095e9268c0c0b1351da4b6d1a5e05f5
(8) 0xdca5eeae485ca3f5110738cd05ec69d2aec04f63
(9) 0xd7ef7fedb64e50e660db273ff796a48282c20bc7

Private Keys
==================
(0) 10fbb6d8450af4a54f1e7304ecbe022605e27a0655e1a92a4a31a592f7611d8f
(1) ff1be17d0b09b62f6c342d27d3d56dcce587c3ab322ec9a8acaa078950aeabbe
(2) a9dc7a68cd62463510957c986618ea9ba1d014cf84b187f70bb0c8421acaefba
(3) a442278ce0d7e0dcbc68b610dd5a10cb03627f8a74f29478029ca48096146db5
(4) 678b303ad3727401afab1f335959675820b4e1daeab8dc4ebe5c8de6f17b30f2
(5) 4429c938050c5225605ba2a27de183d1c58c60bf5e832cf6b1c5d22b3f023ea3
(6) 850eac1873a46ca1e7b9230614cbb5bf51c765ca732b12ae9084ee5dcdd38e98
(7) 679be6c4d0143bbbc0c40cf77f72ad56e2b72235e6e23e0b0d5295a9d41391bd
(8) e7f213a783fdd24cacfba89bd2b652ca68a81a6ebd7983d10b2840f505770c85
(9) e1b95500b89315817362dac4b8176b920e029a0a3be145c67b57ed48feed1056

**/

var privateKey = '9e8abd014035f8283022e37f411b5f1c5e66d6e0a16845d38fe3bf28285f24b5';

privateKey = '0x'+privateKey;
// var wallet = new ethers.Wallet(privateKey, provider);
// wallet.provider = provider;

var wallet = new ethers.Wallet(privateKey, provider);

// var contract = new ethers.Contract(addy, abiDefinition, wallet);

// var contract = new ethers.Contract(contract_address, contract_abi, wallet);
// var provider_contract = new ethers.Contract(contract_address, contract_abi, provider);

// var overrideOptions = {
//     gasLimit: 250000,
//     nonce: 0,
//     value: ethers.utils.parseEther('1.0')
// };

// exports.deploy = async function() {
// 	await wallet.sendTransaction(deployTransaction);
// 	var contract = new ethers.Contract(addy, abiDefinition, wallet);
// }

// exports.check_health = function(req, res) {
//   console.log('started event');
//   contract.events.onstatechange = function(sender, val) {
//     	console.log('state change');
//     	console.log(sender);
//     	console.log(val);
//     }
// }; 

// async function deploy() {

// // var sendPromise = wallet.sendTransaction(deployTransaction);
// // let transaction = await sendPromise();
// let transaction = await wallet.sendTransaction(deployTransaction);
// let addy = transaction.from;
// var contract = new ethers.Contract(addy, abiDefinition, wallet);
// console.log(transaction);
// return contract;
// }

function deploy() {
	return new Promise(resolve => {
		var sendPromise = wallet.sendTransaction(deployTransaction);
		sendPromise.then(function(transaction) {
			let addy = transaction.from;
			var contract = new ethers.Contract(addy, abiDefinition, wallet);
			resolve(contract);
		});
	})
}

function bindEventListener(contract) {
	console.log(contract);
	 contract.onstatechange = function(sender, val) {
    	console.log('state change');
    	console.log(sender);
    	console.log(val);
    }
    return contract;
}

function sendTx(contract) {
	console.log('sendTx', contract);
	var overrideOptions = {
    gasLimit: 250000,
    gasPrice: 9000000000,
    nonce: 0,
    value: ethers.utils.parseEther('1.0')
};

	var sp = contract.changeState();
	sp.then(console.log)


// contract.functions.changeState(overrideOptions);
// return sendPromise;
	// let tx = await contract.functions.changeState(overrideOptions);
}

function getState(c) {
	return new Promise(res => {
		c.GetState().then(resolve);
	})
}

exports.getState = getState;

exports.deploy = deploy;

exports.bindEventListener = bindEventListener;

exports.sendTx = sendTx;

// var sendPromise = wallet.sendTransaction(deployTransaction);
// sendPromise.then(function(transaction) {
//     console.log(transaction);
//     let addy = transaction.from;
//     var contract = new ethers.Contract(addy, abiDefinition, wallet);
//     console.log(contract);
//     contract.events.onstatechange = function(sender, val) {
//     	console.log('state change');
//     	console.log(sender);
//     	console.log(val);
//     }

//     var sendPromise = contract.functions.changeState();
//     sendPromise.then(console.log)
// var TestRPC = require("ethereumjs-testrpc");
// var server = TestRPC.server();


// var port = 3000;
// server.listen(port, function() {
// });


// });






