// SPDX-License-Identifier: MIT
pragma solidity 0.8.23;

contract VotingSystem {
    address public owner;
    string[] public candidates;

    mapping(address => bool) public voters;
    mapping(address => uint256) votesReceived;

    constructor(string[] memory _candidates) {
        owner = msg.sender;
        candidates = _candidates;
    }
}
