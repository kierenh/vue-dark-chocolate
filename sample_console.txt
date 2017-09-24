// Get a reference to the TradeRegister Smart Contract deployed to the blockchain
// We need this to interact with our smart contracts...

var tradeRegister
TradeRegister.deployed().then(function(deployed){tradeRegister=deployed})

// Note: Working with strings. As a simplification - strings are encoded in to byte arrays for storage in smart contract and ability to read them back out.
// This is because solidity cannot handle dynamic length arrays (i.e. strings). bytes32 is effectively UTF8 encoded fixed-length string converted to hex.
// So web3.fromUtf8( to convert a string to Hex (UTF8 encoded)
// to convert back to a string: 
// can use web3.toUtf8('0x412d746f2d422d696e762d320000000000000000000000000000000000000000')
// 

// Setup accounts (as per testrpc.txt dump of accounts)
// Also see ../migrations/seed_demo_data.js <-- As some data is automatically seeded for the demo

        var accounts = { zero: '0x97e51d8b79dda2066d9dae8ea59decd9cceac1d3', one: '0x6c5ef4bc898e9f6b0cd05c1855d11615afdf032c', two: '0x1ddbe68784acb0c4b458b698857d17a37df08b70', three: '0xa43ebe445b0d64a24dd0002aa4b80215d3e8bf82', four: '0x04f0f2b0939613cf4b05a5f06f6c6400824cafb7' }

// End accounts setup and test

// Now we will trade between two businesses

// Create a trade between zero & one


// Now let's register a trade

        var trades = [
            { referenceCode: 'A1', issueDate: new Date().getTime(), from: accounts.zero, counterParty: accounts.one },
            { referenceCode: 'B1', issueDate: new Date().getTime(), from: accounts.zero, counterParty: accounts.two },
            { referenceCode: 'C1', issueDate: new Date().getTime(), from: accounts.zero, counterParty: accounts.three },
            { referenceCode: 'D1', issueDate: new Date().getTime(), from: accounts.zero, counterParty: accounts.four },
        ]

        return Promise.all(trades.map(x => tradeRegister.createTrade(web3.fromUtf8(x.referenceCode), x.issueDate / 1000, x.from, x.counterParty)))

tradeRegister.getTradeCount()
tradeRegister.getTradesByOwnerAddress(accounts.zero)
tradeRegister.getTradesByOwnerAddress(accounts.one)


// Other stuff - see how much gas is used in a transaction
web3.eth.getBlock("latest")
