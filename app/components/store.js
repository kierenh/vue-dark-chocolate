import { Store } from 'vuex'

module.exports = function (apis) {

    var LOCALE = 'en-SG'
    var CURRENCY = 'SGD'
    var DATE_FORMAT = "mm/dd/yyyy"

    // as per ./../../contracts/TradeManager.sol: TradeStatus
    var tradeStatuses = [
        { code: 'created', value: 0, description: "Created" },
        { code: 'counterpartycertified', value: 1, description: "Counterparty Certified" },
        { code: 'counterpartyrejected', value: 2, description: "Counterparty Rejected" }
    ]

    const store = new Store({
        //strict: process.env.NODE_ENV !== 'production', // Off for production as per guideline here: https://vuex.vuejs.org/en/strict.html
        modules: {
        },
        state: {
            referenceData: {
                tradeStatuses: {},
                tradeStatusesMap: {},
                dateTimeFormat: new Intl.DateTimeFormat(LOCALE, {
                    weekday: undefined,
                    year: "numeric",
                    month: "numeric",
                    day: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: false
                })
            },
            title: 'Vue Dark Chocolate Truffle Box',
            account: ''
        },
        mutations: {
            account(state, payload) {
                state.account = payload.address
                apis.trade.getters.TradeRegister.defaults({
                    from: state.account,
                    //   gas: ...,
                    gasPrice: 1000000000,
                    //   value: ...
                })
            },
        },
        getters: {
            currentAccount(state, getters) {
                return state.account
            }
        },
        actions: {
            setAccount({ commit }) {
                return apis.proxiedWeb3.eth.getAccounts()
                    .then(function (returnValue) {
                        var account = { address: !!returnValue.length ? returnValue[0] : undefined }
                        commit('account', account)
                    }).catch(function (error) {
                        console.error('store.actions.setAccount error: %s', error)
                    })
            }
        }
    })

    tradeStatuses.forEach(x => {
        store.state.referenceData.tradeStatuses[x.code] = x
        store.state.referenceData.tradeStatusesMap[x.value] = x
    })

    return store;
}
