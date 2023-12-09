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

async function deployContract(arguments) {
    const { abi, bytecode } = getAbiBytecode("../artifacts/contracts/TokenBharat.sol/TokenBharat.json");
    const provider = createProvider(process.env.HARDHAT_NODE);
    const wallet = createWallet(process.env.PRIVATE_KEY, provider);
    const factory = createFactory(abi, bytecode, wallet);
    const contract = await factory.deploy(arguments);
    await contract.deployed();
    return contract.address;
}
async function getOwner(provider) {
    return (await provider.getSigner().getAddress());
}
function interact(address, abi, provider) {
    const contract = new ethers.Contract(address, abi, provider);
    const owner = provider.getSigner();
}
async function main() {
    // console.log(await deployContract("TokenBharat", "BHT", 18, 500))
    const provider = createProvider(process.env.HARDHAT_NODE);
    const owner = await getOwner(provider);
    console.log("Owner--> ", await owner);
}

main()