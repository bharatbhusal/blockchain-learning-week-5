// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract CorrectedCode {
    mapping(address => uint256) public balances;
    mapping(address => bool) private reentrancyGuard;

    // Function to deposit funds into the user's balance
    function deposit(address user, uint256 amount) public {
        // Reentrancy guard to prevent multiple calls during execution
        require(!reentrancyGuard[user], "Reentrant call detected");
        reentrancyGuard[user] = true;

        // Overflow check before updating the balance
        require(balances[user] + amount >= balances[user], "Overflow detected");

        // Update the user's balance
        balances[user] += amount;

        // Release the reentrancy guard
        reentrancyGuard[user] = false;
    }

    // Function to withdraw funds from the user's balance
    function withdraw(address user, uint256 amount) public {
        // Reentrancy guard to prevent multiple calls during execution
        require(!reentrancyGuard[user], "Reentrant call detected");
        reentrancyGuard[user] = true;

        // Check for insufficient balance and underflow before updating the balance
        require(amount <= balances[user], "Insufficient balance");
        require(
            balances[user] - amount <= balances[user],
            "Underflow detected"
        );

        // Update the user's balance
        balances[user] -= amount;

        // Release the reentrancy guard
        reentrancyGuard[user] = false;
    }
}
