# VotingSystem Smart Contract

## Overview

The `VotingSystem` smart contract is designed to facilitate a simple voting process where users can cast votes for different candidates. This is an overview of the contract's functionality, assumptions made during development, and any specific conditions that users or developers should be aware of.

## Features

1. **Adding and Removing Candidates:**
   - The contract owner (deployer) can add new candidates to the list of choices.
   - The owner can also remove candidates if necessary.

2. **Voting Mechanism:**
   - Users can cast votes for their preferred candidates.
   - Each voter can only vote once.

3. **Vote Tracking:**
   - The contract tracks the total number of votes each candidate receives.

4. **Ownership Control:**
   - Certain functions are restricted to the contract owner to maintain control over candidate management.

## Contract Processes

### 1. Contract Deployment

When deploying the contract, the deployer becomes the owner of the contract. The deployer can specify the initial list of candidates.

```solidity
constructor(string[] memory _candidates) {
    owner = msg.sender;
    candidates = _candidates;
}
```

### 2. Adding and Removing Candidates

The owner can add new candidates:

```solidity
function addCandidate(string memory _candidateName) public onlyOwner {
    candidates.push(_candidateName);

   emit CandidateAdded(_candidateName, candidates.length - 1);
}
```

And remove candidates:

```solidity
function removeCandidate(uint256 _candidateIndex) public onlyOwner validCandidate(_candidateIndex) {
    delete candidates[_candidateIndex];
    
    emit CandidateRemoved(
            getNameForIndex(_candidateIndex),
            _candidateIndex
        );
}
```

### 3. Voting

Users can cast votes for their preferred candidates. Each voter can vote only once.

```solidity
function vote(uint256 _candidateIndex) public newVoter validCandidate(_candidateIndex) {
    voters[msg.sender] = true;
    votesReceived[getNameForIndex(_candidateIndex)] += 1;

    emit Voted(msg.sender, getNameForIndex(_candidateIndex));
}
```

### 4. Checking Vote Results

The total votes received by a specific candidate can be checked using:

```solidity
function getTotalVotes(uint256 _candidateIndex) public view returns (uint256) {
    return votesReceived[getNameForIndex(_candidateIndex)];
}
```

### 5. Other Utility Functions

- Checking if a voter has already voted:

```solidity
function hasVoted(address voter) public view returns (bool) {
    return voters[voter];
}
```

- Retrieving the list of all candidates:

```solidity
function getCandidatesWithTotalVotes() public view returns (string[] memory) {
    return candidates;
}
```

## Assumptions and Specific Conditions

1. **Initial Candidates:**
   - It is assumed that the initial list of candidates is provided during contract deployment.

2. **Owner Control:**
   - Certain functions, such as adding and removing candidates, are restricted to the contract owner for control and security reasons.

3. **One Vote per Voter:**
   - The contract assumes that each voter can cast only one vote.

4. **Candidate Removal:**
   - When a candidate is removed, the associated votes are not transferred or redistributed.