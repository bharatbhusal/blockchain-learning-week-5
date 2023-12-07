// SPDX-License-Identifier: MIT
pragma solidity 0.8.23;

contract TokenBharat {
    // Public states
    string public name;
    string public symbol;
    uint256 public totalSupply;
    uint8 decimal;
    address public owner;

    event logMint(address to, uint256 amount);
    event logBurn(address from, uint256 amount);
    event logTransfer(address from, address to, uint256 amount);

    // balance of the given address. balance getter function.
    mapping(address => uint256) public balances;

    constructor(
        string memory _name,
        string memory _symbol,
        uint8 _decimal,
        uint256 initialSupply
    ) {
        name = _name;
        symbol = _symbol;
        decimal = _decimal;

        // total supply of the token is equal to the initially set supply
        totalSupply = initialSupply;

        //owner of the contract owns all the supply of the token.
        balances[msg.sender] = totalSupply;

        //TokenBharat contract's constructor caller is the owner of the contract.
        owner = msg.sender;
    }

    // function to mint the tokens
    function mint(uint256 amount) public {
        //only owner can mint.
        require(msg.sender == owner, "Only owner can mint");
        //adding the balance to owner's wallet and increasing the supply.
        balances[msg.sender] += amount;
        totalSupply += amount;

        emit logMint(msg.sender, amount);
    }

    //function to burn the tokens.
    function burn(uint256 amount) public {
        //only owner can burn the token. owner should hold enough tokens to burn.
        require(msg.sender == owner, "Only owner can burn");
        require(balances[msg.sender] >= amount, "Insufficient balance");

        //subtracting balance from owner's wallet and total supply
        balances[msg.sender] -= amount;
        totalSupply -= amount;

        emit logBurn(msg.sender, amount);
    }

    //function to transfer the tokens from one wallet to another.
    function tranfer(uint256 amount, address to) public {
        //the receiving wallet should be valid and sender should have enough balance.
        require(balances[msg.sender] >= amount, "Insufficient balance");
        require(to != address(0), "Invalid address");
        //subtracting balance from sender and adding in receiver.
        balances[msg.sender] -= amount;
        balances[to] += amount;

        emit logTransfer(msg.sender, to, amount);
    }
}
