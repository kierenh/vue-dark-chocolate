// Note: Not working - TODO....

describe("TradeRegister Tests", function () {

    var TradeRegister = artifacts.require("./TradeRegister.sol");

    contract('TradeRegister', function (accounts) {
        it("should create trade and assign as a sent trade from the seller and received trade from the buyer", function () {

            var accountA = "0xf4c7b880962ed3995bdc21a4ae30da60187b7f07";
            var accountB = "0x55bf520c1a551c8628750c7f5a52a07ee7cb92d4";

            var trade = {
                referenceCode: web3.fromUtf8("A-to-B-trade-1"),
                issueDate: new Date().getTime() / 1000,
                offerExpiry: (new Date() + 1).getTime() / 1000,
                vendor: accountA,
                counterparty: accountB
            };

            // Create an trade
            return TradeRegister.deployed().then(function (instance) {
                return instance.createTrade(trade.referenceCode, trade.issueDate, trade.offerExpiry, trade.vendor, trade.counterparty)
                    .then(function () {
                        return instance.getTradeCount.call();
                    })
                    .then(function (returnValue) {
                        assert.equal(1, returnValue);

                        // Get for the vendor
                        return instance.getTradesByAddress.call(accountA);
                    })
                    .then(function (returnValue) {
                        // Assert the entity was created as expected

                        var businessASentTrades = returnValue[0];
                        var businessAReceivedTrades = returnValue[1];

                        var index = web3.toDecimal(businessASentTrades[0]).toString();
                        assert.equal(1, businessASentTrades.length);
                        assert.equal(index, 0);
                        assert.equal(0, businessAReceivedTrades.length);

                        return instance.getTradeByIndex.call(tradeId);
                    })
                    .then(function (returnValue) {

                        assert.equal(7, returnValue.length);

                        assert.equal(web3.toUtf8(returnValue[0]), web3.toUtf8(trade.referenceCode));

                        // bah todo here
                        assert.equal(web3.toUtf8(returnValue[3]), web3.toUtf8(trade.issueDate));
                        assert.equal(web3.toUtf8(returnValue[4]), web3.toUtf8(trade.offerExpiry));
                        assert.equal(web3.toDecimal(returnValue[6].toString()), '0');


                        // Get received trades for the BUYER
                        return instance.getTradesByAddress.call(accountB);
                    }).then(function (returnValue) {
                        // Assert the entity was created as expected

                        var sentTrades = returnValue[0];
                        var receivedTrades = returnValue[1];

                        var tradeId = web3.toDecimal(receivedTrades[0]).toString();
                        assert.equal(1, receivedTrades.length);
                        assert.equal(tradeId, "0");
                        assert.equal(0, sentTrades.length);

                        return instance.getTradeById.call(tradeId);
                    }).then(function (returnValue) {

                        assert.equal(11, returnValue.length);

                        assert.equal(web3.toBigNumber(returnValue[0]).toString(), "0");
                        assert.equal(web3.toUtf8(returnValue[1]), web3.toUtf8(trade.referenceCode));
                        assert.equal(web3.toUtf8(returnValue[3]), web3.toUtf8(trade.total));
                        assert.equal(web3.toUtf8(returnValue[4]), web3.toUtf8(trade.gst));
                        assert.equal(web3.toDecimal(returnValue[6].toString()), '0');
                        // These are set to now in ethereum (which is effectively when the block is mined)
                        assert.notEqual(returnValue[7], 0);
                        assert.notEqual(returnValue[8], 0);
                        assert.equal(returnValue[9], entityA.address);
                        assert.equal(returnValue[10], entityB.address);
                    });
            });
        });
    });

    contract('TradeRegister', function (accounts) {
        it("trade is created and certified by counterparty", function () {

            var accountA = "0xf4c7b880962ed3995bdc21a4ae30da60187b7f07";
            var accountB = "0x55bf520c1a551c8628750c7f5a52a07ee7cb92d4";

            var tradeStatuses = {
                Pending: '0',
                BuyerCertified: '1',
                BankCertified: '2',
                GstPaid: '3',
                GstRefund: '4'
            };

            var trade = {
                referenceCode: web3.fromUtf8("A-to-B-trade-1"),
                issueDate: new Date().getTime() / 1000,
                offerExpiry: (new Date() + 1).getTime() / 1000,
                vendor: accountA,
                counterparty: accountB
            };

            var tradeId = 0;

            // Create an trade
            return TradeRegister.deployed().then(function (instance) {
                return instance.createTrade(trade.referenceCode, trade.issueDate, trade.offerExpiry, trade.vendor, trade.counterparty)
                    .then(function () {
                        return instance.getTradeCount.call();
                    })
                    .then(function (returnValue) {
                        assert.equal(1, returnValue);

                        // Certify trade as buyer
                        return instance.certifyTradeAsCounterparty(tradeId, accountB);
                    })
                    .then(function () {
                        // Assert the entity was created as expected

                        return instance.getTradeById(tradeId);
                    }).then(function (returnValue) {

                        // Check buyer certified
                        assert.equal(11, returnValue.length);
                        assert.equal(returnValue[0], tradeId);
                        assert.equal(web3.toDecimal(returnValue[6]).toString(), tradeStatuses.BuyerCertified);

                        // Certify trade as bank
                        return instance.certifyTradeAsBank(tradeId, bankAddress);
                    });
            });
        });
    });
});
