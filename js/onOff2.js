var privateKey = '256357d39b29b6d49bb96b573cb5347b6f004560795e0bf1edf7dbcc1f88edc4';

const isDevMode = false;

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
privateKey = '0x'+privateKey;
var wallet = new ethers.Wallet(privateKey, provider);

function deploy() {
	return new Promise(resolve => {
		var sendPromise = wallet.sendTransaction(deployTransaction);
		sendPromise.then(function(transaction) {
			var contractAddress = ethers.utils.getContractAddress(transaction);
			let addy = transaction.from;
			
			var contract = new ethers.Contract(contractAddress, abiDefinition, wallet);
			resolve(contract);
		});
	})
}

function bindEventListener(contract, fn) {
	log(contract);
    contract.onstatechange = function(val, sender) {
    	this.getBlock().then(function(block) {
    		if (typeof fn == 'function') fn(val, sender);
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
