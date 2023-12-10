// SPDX-License-Identifier: MIT
pragma solidity 0.8.23;

/**
 * @title VotingSystem
 * @dev A simple voting contract where users can vote for candidates.
 */
contract VotingSystem {
    // The address of the contract owner
    address public owner;

    // An array to store the names of candidates
    string[] private candidates;

    // Mapping to track whether an address has voted
    mapping(address => bool) public voters;

    // Mapping to store the number of votes received by each candidate
    mapping(string => uint256) votesReceived;

    // Event emitted when a voter casts a vote
    event Voted(address indexed voter, string candidate);

    //Event emiited when a candidate is removed
    event CandidateRemoved(string candidate, uint256 candidateIndex);

    //Event emiited when a candidate is added
    event CandidateAdded(string candidate, uint256 candidateIndex);

    // Modifier to ensure that a voter has not voted before
    modifier newVoter() {
        require(!voters[msg.sender], "Already voted");
        _;
    }

    // Modifier to ensure that the candidate index is valid
    modifier validCandidate(uint256 _candidateIndex) {
        require(_candidateIndex < candidates.length, "Invalid Candidate Index");
        require(
            bytes(candidates[_candidateIndex]).length != 0,
            "Candidate removed by Admin"
        );
        _;
    }

    // Modifier to ensure that the caller is the owner of the contract
    modifier onlyOwner() {
        require(msg.sender == owner, "Not Owner");
        _;
    }

    // Constructor to initialize the contract with candidate names
    constructor(string[] memory _candidates) {
        owner = msg.sender;
        candidates = _candidates;
    }

    // Function to remove a candidate by the contract owner
    function removeCandidate(
        uint256 _candidateIndex
    ) public onlyOwner validCandidate(_candidateIndex) {
        delete candidates[_candidateIndex];

        emit CandidateRemoved(
            getNameForIndex(_candidateIndex),
            _candidateIndex
        );
    }

    // Function to add a new candidate by the contract owner
    function addCandidate(string memory _candidateName) public onlyOwner {
        candidates.push(_candidateName);

        emit CandidateAdded(_candidateName, candidates.length - 1);
    }

    // Function for a voter to cast a vote
    function vote(
        uint256 _candidateIndex
    ) public newVoter validCandidate(_candidateIndex) {
        voters[msg.sender] = true;
        votesReceived[getNameForIndex(_candidateIndex)] += 1;

        emit Voted(msg.sender, getNameForIndex(_candidateIndex));
    }

    // Function to get the total votes received by a candidate
    function getTotalVotes(
        uint256 _candidateIndex
    ) public view returns (uint256) {
        return votesReceived[getNameForIndex(_candidateIndex)];
    }

    // Function to check if a voter has already voted
    function hasVoted(address voter) public view returns (bool) {
        return voters[voter];
    }

    // Function to get the list of all candidates
    function getCandidates() public view returns (string[] memory) {
        return candidates;
    }

    // Function to get the name of a candidate by index
    function getNameForIndex(
        uint256 _candidateIndex
    ) private view validCandidate(_candidateIndex) returns (string memory) {
        return candidates[_candidateIndex];
    }
}
