
describe("Trades Tests", function () {

    var Trades = artifacts.require("./Trades.sol");

    contract('Trades', function (accounts) {
        it("should track sent trades for an entity and be retrievable by reference code", function () {

            var accountA = "0x2945df8f0a8d3b8971db3a4408433ea049f0c843";
            var tradeReferenceCode = web3.fromUtf8('trade-reference-code-1');

            // Create an trade
            return Trades.deployed().then(function (instance) {
                return instance.addSentTrade(accountA, tradeReferenceCode)
                    .then(function () {
                        return instance.getSentTrade(accountA, 0)
                    })
                    .then(function (returnValue) {
                        assert.equal(web3.toUtf8(returnValue), web3.toUtf8(tradeReferenceCode));
                    });
            });
        });
    });

    contract('Trades', function (accounts) {
        it("should track received trades for an entity and be retrievable by reference code", function () {

            var accountA = "0x2945df8f0a8d3b8971db3a4408433ea049f0c843";
            var tradeReferenceCode = web3.fromUtf8('trade-reference-code-2');

            // Create an trade
            return Trades.deployed().then(function (instance) {
                return instance.addReceivedTrade(accountA, tradeReferenceCode)
                    .then(function () {
                        return instance.getReceivedTrade(accountA, 0)
                    })
                    .then(function (returnValue) {
                        assert.equal(web3.toUtf8(returnValue), web3.toUtf8(tradeReferenceCode));
                    });
            });
        });
    });

    contract('Trades', function (accounts) {
        it("should track sent and received trades for an entity and be retrievable by reference code", function () {

            var accountA = "0x2945df8f0a8d3b8971db3a4408433ea049f0c843";
            var tradeReferenceCode1 = web3.fromUtf8('trade-reference-code-1');
            var tradeReferenceCode2 = web3.fromUtf8('trade-reference-code-2');

            // Create an trade
            return Trades.deployed().then(function (instance) {
                return instance.addReceivedTrade(accountA, tradeReferenceCode1)
                    .then(function () {
                        return instance.getReceivedTrade(accountA, 0)
                    })
                    .then(function (returnValue) {
                        assert.equal(web3.toUtf8(returnValue), web3.toUtf8(tradeReferenceCode1));
                    })
                    .then(function () {
                        return instance.addReceivedTrade(accountA, tradeReferenceCode2)
                    })
                    .then(function () {
                        return instance.getReceivedTrade(accountA, 1)
                    })
                    .then(function (returnValue) {
                        assert.equal(web3.toUtf8(returnValue), web3.toUtf8(tradeReferenceCode2));
                    });
            });
        });
    });
});
