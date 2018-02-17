pragma solidity ^0.4;

contract OnOff {
	event StateChange(
		bool indexed _value,
		address indexed _id
	);

	address creator;
	bool state;
	function OnOff() public payable {
		creator = msg.sender;
		state = false;
	}

	function changeState() {
		if (state == true) {
			state = false;
		} else if (state == false) {
			state = true; 
		}
		StateChange(state, msg.sender)

	}

}
