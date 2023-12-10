// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import {Exercise_2} from "./Exercise2.sol";

contract OverflowUnderflowExample {
    Exercise_2 public exercise2Contract;

    constructor(address exercise2Address) {
        exercise2Contract = Exercise_2(exercise2Address);
    }

    // Overflow example
    function overflowExample() public {
        // Max uint256 value
        uint256 maxUint = type(uint256).max;

        // Trying to overflow the balances of a user
        exercise2Contract.addBalances(address(this), maxUint);
    }

    // Underflow example
    function underflowExample() public {
        // Setting a non-zero balance for the contract
        exercise2Contract.addBalances(address(this), 100);

        // Trying to underflow the balances of the contract
        exercise2Contract.subtractBalances(address(this), 200);
    }
}
