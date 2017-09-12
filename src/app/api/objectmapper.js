export default {
    trade: function (fields, account, referenceData) {
        var trade = {
            referenceCode: web3.toUtf8(fields[0]),
            issueDate: fields[1],
            offerExpiry: fields[2],
            offerAccepted: fields[3],
            isOfferAccepted: fields[3] != 0,
            status: referenceData.tradeStatusesMap[web3.toDecimal(fields[4].toString())],
            vendor: fields[5],
            counterparty: fields[6],
            isVendor: account === fields[5],
            isCounterparty: account === fields[6]
        }
        trade.isOfferExpired =  referenceData.tradeStatuses.created.value === trade.status.value && (trade.offerExpiry) >= (new Date().getTime() / 1000)
        return trade
    },

    createTrade: function (payload) {
        var trade = {
            referenceCode: web3.fromUtf8(payload.referenceCode),
            issueDate: new Date(payload.issueDate).getTime() / 1000, // A unix timestamp, seconds since the epoch (1970-01-01T00:00:00Z)
            offerExpiry: new Date(payload.offerExpiry).getTime() / 1000,
            vendor: payload.vendor,
            counterparty: payload.counterparty
        }
        return trade;
    }
}
