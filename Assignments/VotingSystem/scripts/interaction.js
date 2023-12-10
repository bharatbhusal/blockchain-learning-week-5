const { ethers } = require("ethers");
require("dotenv/config");
const contractAddress = "0x18512185cF9a9CE45A6e2F1E1A5e1cDe4D3429Ac";

function getAbiBytecode(filePath) {
    const { abi, bytecode } = require(filePath);
    return { abi, bytecode };
}

function createProvider(node) {
    return new ethers.JsonRpcProvider(node);
}

function createContract(address, abi, provider) {
    return new ethers.Contract(address, abi, provider);
}


function createWallet(privateKey, provider) {
    return new ethers.Wallet(privateKey, provider);
}


async function sendTransaction(wallet, address, contract, functionName, argumentsList) {
    try
    {
        const transaction = await wallet.sendTransaction({
            to: address,
            data: contract.interface.encodeFunctionData(functionName, argumentsList),
        });

        const receipt = await transaction.wait();
        console.log('Transaction receipt:', receipt);
    } catch (error)
    {
        console.error(error);
    }
}



// Listening to logMint event
async function interaction(contract) {
    const { abi } = getAbiBytecode("../artifacts/contracts/VotingSystem.sol/VotingSystem.json");
    const provider = createProvider(`https://polygon-mumbai.infura.io/v3/${process.env.INFURA_API_KEY}`)
    const contract = createContract(contractAddress, abi, provider)
    const wallet = createWallet(process.env.PRIVATE_KEY, provider)



    // const eventFilter = contract.filters.Voted();
    // contract.on(eventFilter, (voter, candidate) => {
    //     console.log("Voted event: \nVoted by: ", voter, "\nCandidate: ", candidate);
    // });


    const owner = await sendTransaction(createWallet(process.env.PRIVATE_KEY, provider), contractAddress, createContract(contractAddress, abi, provider), "owner", []);
    console.log(owner)
    console.log("Candidates: ", await contract.getCandidates());

    console.log("Votes of candidate 0: ", await contract.getTotalVotes(0));

    // contract.off(eventFilter);
}

async function main() {
    const { abi } = getAbiBytecode("../artifacts/contracts/VotingSystem.sol/VotingSystem.json");
    const provider = createProvider(`https://polygon-mumbai.infura.io/v3/${process.env.INFURA_API_KEY}`)
    const contract = createContract(contractAddress, abi, provider);
    await interaction(contract);
}

main();
