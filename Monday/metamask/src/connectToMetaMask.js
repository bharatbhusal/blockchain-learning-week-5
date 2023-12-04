const { ethers } = require('ethers');

export async function connectToMetaMask() {
    // Check if running in a browser environment
    if (typeof window !== 'undefined' && typeof window.ethereum !== 'undefined')
    {
        // Request account access
        await window.ethereum.request({ method: 'eth_requestAccounts' });

        // Get provider
        const provider = new ethers.BrowserProvider(window.ethereum);
        // Get signer
        const signer = await provider.getSigner();

        // Now you can use ethers.js to interact with the connected MetaMask account
        const address = signer.address;
        console.log('Connected to MetaMask with address:', address);
        return signer
    } else
    {
        console.log('MetaMask is not installed or window is not available');
        return null
    }
}
