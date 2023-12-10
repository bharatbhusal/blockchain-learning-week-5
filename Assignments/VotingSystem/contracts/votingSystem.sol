// SPDX-License-Identifier: MIT
pragma solidity 0.8.23;

contract VotingSystem {
    address public owner;
    string[] public candidates;

    mapping(address => bool) public voters;
    mapping(string => uint256) votesReceived;

    modifier newVoter() {
        require(!voters[msg.sender], "Already voted");
        _;
    }
    modifier validCandidate(uint256 candidateIndex) {
        require(candidateIndex < candidates.length, "invalid Candidate Index");
        _;
    }

    constructor(string[] memory _candidates) {
        owner = msg.sender;
        candidates = _candidates;
    }

    function vote(
        uint256 candidateIndex
    ) public newVoter validCandidate(candidateIndex) {
        voters[msg.sender] = true;
        votesReceived[candidates[candidateIndex]] += 1;
    }
}
