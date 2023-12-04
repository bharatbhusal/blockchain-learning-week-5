const { ethers } = require("ethers")

const provider = new ethers.JsonRpcProvider(`http://127.0.0.1:8545`) // run a node in root directory. `npx hardhat node`

async function fetchBalance(address) {
    const balance = await provider.getBalance(address)
    console.log(`${address} has ${balance / BigInt(10 ** 18)} ETH\n`)

}
fetchBalance(`0xBcd4042DE499D14e55001CcbB24a551F3b954096`)