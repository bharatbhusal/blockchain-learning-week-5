// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");

async function main() {
    //ethers@5.7.0
    // const VotingSystem = await hre.ethers.getContractFactory("VotingSystem")
    // const votingSystem = await VotingSystem.deploy(["Bharat", "Geeta", "Neeta", "Pabitra"]);
    // await votingSystem.deployed();
    // console.log(`Contract deployed at ${votingSystem.address}`);

    //ethers@6.9.0
    const votingSystem = await hre.ethers.deployContract("VotingSystem", [["Bharat", "Geeta", "Neeta", "Pabitra"]], {});
    await votingSystem.waitForDeployment();
    console.log(`Contract deployed at ${votingSystem.target}`);

}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
