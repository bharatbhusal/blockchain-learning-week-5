import { ether, parseEther } from "ethers"
import { connectToMetaMask } from "./connectToMetaMask";


export async function sendEth() {
  const signer = await connectToMetaMask();

  // Example: Send a transaction
  const transaction = {
    to: '0xdD2FD4581271e230360230F9337D5c0430Bf44C0',
    value: parseEther('10'),
  };

  const txHash = await signer.sendTransaction(transaction);
  console.log('Transaction sent. Transaction hash:', txHash);
}