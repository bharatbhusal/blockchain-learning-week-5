// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import {Exercise_2} from "./Exercise2.sol";

contract ReentrancyVulnerable {
    Exercise_2 vulnerableContract;

    // Attacker's contract
    function attack() public payable {
        vulnerableContract.withdraw(msg.sender, msg.value);
    }

    // Fallback function to receive funds
    receive() external payable {}
}
