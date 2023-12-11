// Import necessary libraries and modules
const { ethers, parseUnits } = require("ethers");
require("dotenv/config");

// Define contract address and import contract ABI
const contractAddress = "0x1b43fCeaaf67dff15Ad6B1E8791dC5b3e6bbd8BA";
const { _, abi } = require("../artifacts/contracts/VotingSystem.sol/VotingSystem.json");

// Initialize Ethereum provider and contract instances
const provider = new ethers.JsonRpcProvider(`https://polygon-mumbai.infura.io/v3/${process.env.INFURA_API_KEY}`)
const contract = new ethers.Contract(contractAddress, abi, provider)
const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider)

// Function to interact with the contract and change its state
async function stateChangingInteraction(functionName, argumentsList) {
    try
    {
        // Send a transaction to the contract
        const transaction = await wallet.sendTransaction({
            to: contractAddress,
            data: contract.interface.encodeFunctionData(functionName, argumentsList),
        });
        console.log("Transaction created");

        // Wait for the transaction to be mined and get the receipt
        const receipt = await transaction.wait();
        // console.log(receipt);
        return receipt;
    } catch (error)
    {
        console.error(error.reason);
    }
}

// Function to perform read-only interactions with the contract
async function interaction() {
    // Read various information from the contract
    const owner = await contract.owner();
    const candidates = await contract.getCandidates();
    const hasUserVoted = await contract.hasVoted(owner);
    const totalVotesBharat = await contract.getTotalVotes(2);

    // Print information to the console
    console.log("Owner: ", owner, "\nCandidates: ", candidates, "\nHas Owner casted Vote: ", hasUserVoted, "\nTotal votes of Bharat: ", totalVotesBharat);

    // Perform state-changing interactions
    const candidateName = "Someone";
    await stateChangingInteraction("addCandidate", [candidateName])
    await stateChangingInteraction("removeCandidate", [15])

    // Print updated list of candidates
    console.log(await contract.getCandidates());
}

// Main function to execute the script
async function main() {
    await interaction();
}

// Call the main function to start the script
main();
