// var privateKey = '463bf15d64f138ac495718752fd73f2ef37eed33c29d1119f045744734dcc033';

var isDevMode = false;

function log(str) {
	if (isDevMode) console.log(str);
}

const fs = require('fs');
const contractSrc = fs.readFileSync('../contracts/1OnOff.sol', 'utf8');

const solc = require('solc');
const compiledCtrct = solc.compile(contractSrc);
const byteCode = compiledCtrct.contracts[':OnOff'].bytecode;
const abiDefinition = JSON.parse(compiledCtrct.contracts[':OnOff'].interface);

log(byteCode, abiDefinition)
//ethers
const ethers = require('ethers')
var providers = ethers.providers;
var network = providers.networks.rinkeby;
var provider = new providers.JsonRpcProvider('http://localhost:8545', network);
var deployTransaction = ethers.Contract.getDeployTransaction('0x'+byteCode, abiDefinition);
// privateKey = '0x'+privateKey;
// var wallet = new ethers.Wallet(privateKey, provider);
var privateKey, wallet;

function deploy(privKey, isDevMode) {
	log('start deploy');
	privateKey = '0x'+privKey;
	wallet = new ethers.Wallet(privateKey, provider);
	isDevMode = isDevMode;
	return new Promise(resolve => {
		var sendPromise = wallet.sendTransaction(deployTransaction);
		sendPromise.then(function(transaction) {
			var contractAddress = ethers.utils.getContractAddress(transaction);
			let addy = transaction.from;
			
			var contract = new ethers.Contract(contractAddress, abiDefinition, wallet);
			log('fin deploy')
			resolve(contract);
		});
	})
}

function bindEventListener(contract, fn) {
	log('bindEventListener', contract, fn);
    contract.onstatechange = function(val, sender) {
    	this.getBlock().then(function(block) {
    		if (typeof fn == 'function') fn();
	    	log('state change!');
	    	log(val)
    		log(block)
    	})
    }
    return contract;
}

function sendTx(c) {
	return new Promise(resolve => {
		c.changeState().then(res => {
			log(provider.getBlockNumber());
			log('st', res)
			provider.waitForTransaction(res.hash).then(function(transaction) {
			    log('Transaction Minded: ' + transaction.hash);
			    log(transaction);
				resolve(res);
			});
		})
	})
}

function getState(c) {
	return new Promise(resolve => {
		var sp = c.GetState();
		sp.then(tx => {
			log(tx);
			resolve(tx);
		})
	})
}

module.exports = {
	getState: getState,
	deploy: deploy,
	bindEventListener: bindEventListener,
	sendTx: sendTx
}
