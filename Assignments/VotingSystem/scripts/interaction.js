const { ethers } = require("ethers");
require("dotenv/config");


const contractAddress = "0x18512185cF9a9CE45A6e2F1E1A5e1cDe4D3429Ac";
const { _, abi } = require("../artifacts/contracts/VotingSystem.sol/VotingSystem.json");
const provider = new ethers.JsonRpcProvider(`https://polygon-mumbai.infura.io/v3/${process.env.INFURA_API_KEY}`)
const contract = new ethers.Contract(contractAddress, abi, provider)
const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider)



async function sendTransaction(functionName, argumentsList) {
    try
    {
        const transaction = await wallet.sendTransaction({
            to: contractAddress,
            data: contract.interface.encodeFunctionData(functionName, argumentsList),
        });

        const receipt = await transaction.wait();
        return receipt;
    } catch (error)
    {
        console.error(error);
    }
}


// Listening to logMint event
async function interaction() {
    // const owner = await contract.owner();
    // const candidates = await contract.getCandidates();
    // const hasUserVoted = await contract.hasVoted(owner);
    // const totalVotesBharat = await contract.getTotalVotes(0);

    // console.log("Owner: ", owner, "\nCandidates: ", candidates, "\nHas Owner casted Vote: ", hasUserVoted, "\nTotal votes of Bharat: ", totalVotesBharat);


    const candidateName = "Someone";
    await sendTransaction("removeCandidate", ["0"])

    console.log(await contract.getCandidates());

}

async function main() {
    await interaction();
}

main();
