var TradeRegister = artifacts.require("./TradeRegister.sol");

module.exports = function (deployer, network, accounts) {
    // Seed data...

    if (network === 'development-no-data-seed') {
        // Except if you're running on this network
        // This is useful for preventing seed during unit test where we want a clean environment each time
        console.info("Skipping this migration, reason: Data seed is turned off for (network: %s)", network)
        return
    }

    // Seed some trades for dev/test

    return TradeRegister.deployed().then(function (instance) {
        console.log("TradeRegister contract deployed, seeding demo data...");

        var accounts = {
            zero: '0x97e51d8b79dda2066d9dae8ea59decd9cceac1d3',
            one: '0x6c5ef4bc898e9f6b0cd05c1855d11615afdf032c',
            two: '0x1ddbe68784acb0c4b458b698857d17a37df08b70',
            three: '0xa43ebe445b0d64a24dd0002aa4b80215d3e8bf82',
            four: '0x04f0f2b0939613cf4b05a5f06f6c6400824cafb7'
        }

        var pivotDate = new Date()

        var dates = {
            a: { issueDate: pivotDate, expiryDate: pivotDate },
            b: { issueDate: pivotDate, expiryDate: pivotDate },
            c: { issueDate: pivotDate, expiryDate: pivotDate },
            d: { issueDate: pivotDate, expiryDate: pivotDate },
        }

        var trades = [
            { referenceCode: 'A', issueDate: dates.a.issueDate, expiryDate: dates.a.expiryDate, vendor: accounts.zero, counterParty: accounts.one },
            { referenceCode: 'B', issueDate: dates.b.issueDate, expiryDate: dates.b.expiryDate, vendor: accounts.zero, counterParty: accounts.two },
            { referenceCode: 'C', issueDate: dates.c.issueDate, expiryDate: dates.c.expiryDate, vendor: accounts.zero, counterParty: accounts.three },
            { referenceCode: 'D', issueDate: dates.d.issueDate, expiryDate: dates.d.expiryDate, vendor: accounts.zero, counterParty: accounts.four },
        ]

        return Promise.all(trades.map(x => instance.createTrade(web3.fromUtf8(x.referenceCode), x.issueDate.getTime() / 1000, x.expiryDate.getTime() / 1000, x.vendor, x.counterParty)))
            .then(function () {
                return instance.getTradeCount()
            });

    }).catch(function (error) {
        console.error(error);
    });
}
