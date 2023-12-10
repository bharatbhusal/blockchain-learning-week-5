# VotingSystem Smart Contract Testing

## Introduction

This document provides an overview of the testing scenarios for the `VotingSystem` smart contract. The smart contract is designed to facilitate a simple voting system where users can cast votes for different candidates.

## Contract Features

The `VotingSystem` contract has the following features:

- Deployment with initial candidates.
- Adding and removing candidates by the contract owner.
- Casting votes by users for their preferred candidates.
- Retrieving the list of candidates.
- Checking if a voter has already cast a vote.
- Getting the total votes received by a candidate.

## Testing Scenarios

The testing scenarios cover various aspects of the smart contract, ensuring that it functions correctly and securely. The scenarios are organized based on the functionalities being tested.

### 1. Deployment

- **Scenario:** The `VotingSystem` contract is deployed with initial candidates.
- **Expected Result:** The deployment is successful, and the initial list of candidates is set.

### 2. Candidate Management

#### a. Removing Candidates

- **Scenario:** The owner removes a candidate from the list.
- **Expected Result:** The specified candidate is removed from the list.

- **Scenario:** A non-owner attempts to remove a candidate.
- **Expected Result:** The removal transaction is reverted with an error message indicating that only the owner can perform this action.

- **Scenario:** The owner attempts to remove a candidate with an invalid index.
- **Expected Result:** The removal transaction is reverted with an error message indicating an invalid candidate index.

#### b. Adding Candidates

- **Scenario:** The owner adds a new candidate to the list.
- **Expected Result:** The new candidate is successfully added to the list.

- **Scenario:** A non-owner attempts to add a new candidate.
- **Expected Result:** The addition transaction is reverted with an error message indicating that only the owner can perform this action.

### 3. Voting

- **Scenario:** Any user casts a vote for a valid candidate.
- **Expected Result:** The vote is successfully cast, and the total votes for the candidate are incremented.

- **Scenario:** Any user attempts to cast a vote twice.
- **Expected Result:** The second vote transaction is reverted with an error message indicating that the user has already voted.

- **Scenario:** Any user attempts to cast a vote for an invalid candidate index.
- **Expected Result:** The vote transaction is reverted with an error message indicating an invalid candidate index.

### 4. Retrieving Information

#### a. Retrieving Candidates

- **Scenario:** The list of candidates is retrieved.
- **Expected Result:** The returned list matches the initial list of candidates.

#### b. Checking if a Voter has Voted

- **Scenario:** Checking if a voter who hasn't voted is correctly identified.
- **Expected Result:** The function returns `false` for a voter who hasn't cast a vote.

- **Scenario:** Checking if a voter who has voted is correctly identified.
- **Expected Result:** The function returns `true` for a voter who has cast a vote.

#### c. Retrieving Total Votes for a Candidate

- **Scenario:** Retrieving the total votes for a candidate.
- **Expected Result:** The returned count matches the number of votes cast for the specified candidate.

## Conclusion

The comprehensive testing scenarios cover various functionalities of the `VotingSystem` smart contract, ensuring its reliability and correctness in handling candidate management, voting, and information retrieval.

