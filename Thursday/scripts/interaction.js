const { ethers, providers } = require("ethers")
require("dotenv/config")
const abi = require("../artifacts/contracts/TokenBharat.sol/TokenBharat.json").abi;
const bytecode = require("../artifacts/contracts/TokenBharat.sol/TokenBharat.json").bytecode;

function getAbiBytecode(filePath) {
    const abi = require(filePath).abi;
    const bytecode = require(filePath).bytecode;
    return { abi, bytecode }
}
function createProvider(node) {
    return new ethers.providers.JsonRpcProvider(node);

}
function createWallet(privateKey, provider) {
    return new ethers.Wallet(privateKey, provider);
}

function createFactory(abi, bytecode, wallet) {
    return new ethers.ContractFactory(abi, bytecode, wallet);
}

async function getOwner(provider) {
    return (await provider.getSigner().getAddress());
}

async function deployContract() {
    const { abi, bytecode } = getAbiBytecode("../artifacts/contracts/TokenBharat.sol/TokenBharat.json");
    const provider = createProvider(process.env.HARDHAT_NODE);
    const wallet = createWallet(process.env.PRIVATE_KEY, provider);
    const factory = createFactory(abi, bytecode, wallet);
    const contract = await factory.deploy("TokenBharat", "BHT", 18, 500);
    await contract.deployed();
    return contract
}

//Listening to logMint event
async function interact(contract) {
    const eventFilter = contract.filters.logMint();
    contract.on(eventFilter, (from, amount) => {
        console.log("Mint evernt: \nMinted to: ", from.toString(), "\nAmount: ", amount.toString())
    })

    await contract.mint(55);

    contract.off(eventFilter);
}

async function main() {
    await interact(await deployContract());
}

main()