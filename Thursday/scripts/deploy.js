
const hre = require("hardhat");

async function main() {
    const TokenBharat = await hre.ethers.getContractFactory("TokenBharat");
    const tokenBharat = await TokenBharat.deploy("TokenBharat", "BHT", 18, 500);
    await tokenBharat.deployed();
    console.log(`TokenBharat contract deployed at ${tokenBharat.address}`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
