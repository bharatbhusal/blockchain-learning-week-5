require("dotenv/config")
const { ethers, formatUnits } = require("ethers")

async function createWallet(privateKey) {
    const INFURA_API_KEY = process.env.INFURA_API_KEY;
    const wallet = new ethers.Wallet(privateKey);
    const address = wallet.address;
    const infuraProvider = new ethers.JsonRpcProvider(`https://goerli.infura.io/v3/${INFURA_API_KEY}`);
    const balance = formatUnits(await infuraProvider.getBalance(address), 18);

    // const hardhatNodeProvider = new ethers.JsonRpcProvider("http://127.0.0.1:8545/");
    // const balance = formatUnits(await hardhatNodeProvider.getBalance(address), 18);
    return { address, balance }
}

async function main() {
    const HARDHAT_WALLET_PRIVATE_KAY = process.env.HARDHAT_WALLET_PRIVATE_KAY;
    console.log(await createWallet(HARDHAT_WALLET_PRIVATE_KAY))
}

main()