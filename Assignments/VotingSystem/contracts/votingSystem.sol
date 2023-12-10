// SPDX-License-Identifier: MIT
pragma solidity 0.8.23;

contract VotingSystem {
    address public owner;
    string[] private candidates;

    event Voted(address indexed voter, string candidates);

    mapping(address => bool) public voters;
    mapping(string => uint256) votesReceived;

    modifier newVoter() {
        require(!voters[msg.sender], "Already voted");
        _;
    }
    modifier validCandidate(uint256 _candidateIndex) {
        require(_candidateIndex < candidates.length, "Invalid Candidate Index");
        require(
            bytes(candidates[_candidateIndex]).length != 0,
            "Candidate removed by Admin"
        );
        _;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Not Owner");
        _;
    }

    constructor(string[] memory _candidates) {
        owner = msg.sender;
        candidates = _candidates;
    }

    function removeCandidate(
        uint256 _candidateIndex
    ) public onlyOwner validCandidate(_candidateIndex) {
        delete candidates[_candidateIndex];
    }

    function addCandidate(string memory _candidateName) public onlyOwner {
        candidates.push(_candidateName);
    }

    function getNameForIndex(
        uint256 _candidateIndex
    ) private view validCandidate(_candidateIndex) returns (string memory) {
        return candidates[_candidateIndex];
    }

    function vote(
        uint256 _candidateIndex
    ) public newVoter validCandidate(_candidateIndex) {
        voters[msg.sender] = true;
        votesReceived[getNameForIndex(_candidateIndex)] += 1;

        emit Voted(msg.sender, getNameForIndex(_candidateIndex));
    }

    function getTotalVotes(
        uint256 _candidateIndex
    ) public view returns (uint256) {
        return votesReceived[getNameForIndex(_candidateIndex)];
    }

    function hasVoted(address voter) public view returns (bool) {
        return voters[voter];
    }

    function getCandidatesWithTotalVotes()
        public
        view
        returns (string[] memory)
    {
        return candidates;
    }
}
