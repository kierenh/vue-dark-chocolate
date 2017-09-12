import objectMapper from './objectmapper.js'

module.exports = function (web3, TradeRegister) {

    const tradeApi = {

        getters: {
            TradeRegister
        },

        actions: {
            getTrade(getTradeArgs) {
                return TradeRegister.deployed().then(function (instance) {
                    return instance.getTradeByReferenceCode(getTradeArgs.tradeReferenceCode).then(function (returnValues) {
                        var trade = objectMapper.trade(returnValues, getTradeArgs.account, getTradeArgs.referenceData)
                        return { trade }
                    })
                }).catch(function (error) {
                    console.error('apis.trade.actions::getTrade error: %s', error)
                })
            },

            getTrades(getTradesArgs) {

                // Get trades based on the account type 
                return TradeRegister.deployed().then(function (instance) {
                    // Retrieve trades on behalf of buyer or seller
                    return instance.getTradesByAddress(getTradesArgs.account)
                        .then(function (returnValues) {
                            // Return values is an array of arrays in the form [[sent trades reference codes], [received trades reference codes]] which we will use to lookup the actual trades

                            if (!!returnValues.length) {
                                // Flatten to [tradeId1, tradeId2, ..., tradeIdN]
                                var tradeIds = returnValues.reduce((acc, cur) => acc.concat(cur), [])
                                // Get each trade
                                return Promise.all(tradeIds.map(referenceCode => instance.getTradeByReferenceCode(referenceCode)))
                            } else {
                                // Account does not have any trades
                                return 0
                            }
                        }).then(function (returnValue) {
                            // Commit trades to the store

                            var trades = []
                            if (Array.isArray(returnValue) && (!!returnValue.length)) {
                                trades = returnValue.map(fields => objectMapper.trade(fields, getTradesArgs.account, getTradesArgs.referenceData))
                            }
                            return { trades }
                        })
                }).catch(function (error) {
                    console.error('apis.trade.actions::getTrades error: %s', error)
                })
            },

            saveTrade(saveTradeArgs) {

                // Map the UI data to create the accounts we need in the trade hierarchy
                var trade = objectMapper.createTrade(saveTradeArgs.trade)

                return TradeRegister.deployed()
                    .then(function (instance) {
                        return instance.createTrade(trade.referenceCode, trade.issueDate, trade.offerExpiry, trade.vendor, trade.counterparty, { from: saveTradeArgs.account })
                            .then(function (transaction) {
                                var tradeReferenceCode = web3.toDecimal(transaction.logs[0].args.referenceCode)
                                return tradeReferenceCode
                            })
                    })
            },

            certifyTradeAsCounterparty(certifyTradeAsCounterPartyArgs) {
                // TODO:
            }
        }
    }
    return tradeApi
}
