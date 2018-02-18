
pragma solidity ^0.4;

contract OnOff {
	event StateChange(
		bool indexed _value,
		address indexed _id
	);

	address creator;
	bool state;
	
	function OnOff() public {
		creator = msg.sender;
		state = false;
		i = 0;
	}

	function changeState() public {
		state = !state;
		StateChange(state, msg.sender);
	}
	
	function GetState() public view returns (bool){
	    return state;
	}
}
