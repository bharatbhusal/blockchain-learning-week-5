const { ethers } = require("ethers")
const hre = require("hardhat")


async function getTools() {
    const provider = new ethers.JsonRpcProvider(`https://goerli.infura.io/v3/${INFURA_API_KEY}`);
    const INFURA_API_KEY = process.env.INFURA_API_KEY;

    const wallet = new ethers.Wallet(PRIVATE_KEY, provider);
    return { provider, wallet }
}

async function DeployContract() {
    const mySimpleContract = await hre.ethers.deployContract("MySimpleContract", [], {});
    await mySimpleContract.waitForDeployment();
    const address = mySimpleContract.target;
    const abi = mySimpleContract.abi;
    console.log(address, abi)

}

DeployContract()