
const hre = require("hardhat");

async function sleep(ms) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve();
        }, ms);
    });
}

async function main() {
    const TokenBharat = await hre.ethers.deployContract("TokenBharat");
    const bharatToken = await TokenBharat.deploy("BharatToken", "BHT", 18, 500);

    await bharatToken.deployed();

    console.log(`BharatToken contract deployed at ${bharatToken.address}`);

    await sleep(55 * 1000);

    await hre.run("verify:verify", {
        address: bharatToken.address,
        constructorArguments: ["Bharat", "BHT", 18, 500],
    });
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
