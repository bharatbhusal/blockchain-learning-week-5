// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

// Import SafeMath library for secure arithmetic operations
import "@openzeppelin/contracts/utils/math/Math.sol";

contract Exercise_2 {
    using Math for uint256; // Use SafeMath for secure arithmetic operations

    mapping(address => uint256) public balances;

    function deposit(address user, uint256 amount) public {
        // Mitigate overflow by using SafeMath
        (, balances[user]) = balances[user].tryAdd(amount);
    }

    function withdraw(address user, uint256 amount) public {
        // Mitigate underflow by using SafeMath
        require(amount <= balances[user], "Insufficient balance");
        (, balances[user]) = balances[user].trySub(amount);

        // Update state before external call to prevent reentrancy
        (bool success, ) = user.call{value: amount}("");
        require(success, "Transfer failed");
    }

    function addBalances(address user, uint256 amount) public {
        // Mitigate overflow by using SafeMath
        (, balances[user]) = balances[user].tryAdd(amount);
    }

    function subtractBalances(address user, uint256 amount) public {
        // Mitigate underflow by using SafeMath
        require(amount <= balances[user], "Insufficient balance");
        (, balances[user]) = balances[user].trySub(amount);
    }

    function destroyContract(address payable recipient) public {
        // Mitigate risks by updating state before selfdestruct
        uint256 contractBalance = address(this).balance;
        recipient.transfer(contractBalance);
    }

    // Fallback function to handle incoming Ether
    receive() external payable {
        // Handle incoming Ether, if needed
    }
}
