require("dotenv/config")
const { ethers } = require("ethers")

async function Transaction() {
    // const INFURA_API_KEY = process.env.INFURA_API_KEY;
    const PRIVATE_KEY = process.env.PRIVATE_KEY;

    // const provider = new ethers.JsonRpcProvider(`https://goerli.infura.io/v3/${INFURA_API_KEY}`);
    const provider = new ethers.providers.JsonRpcProvider(process.env.HARDHAT_NODE);
    const wallet = new ethers.Wallet(PRIVATE_KEY, provider);

    const transaction = {
        to: '0x1ce7BbFa437727495710fF8350b398d9Bc8Ec30A',
        value: ethers.utils.parseEther('10.0'),
        gasPrice: ethers.utils.parseUnits('30', 'gwei'), // Set gas price
        gasLimit: 21000, // Set gas limit
    };

    const tx = await wallet.sendTransaction(transaction)
    console.log(tx.hash)
}

Transaction()