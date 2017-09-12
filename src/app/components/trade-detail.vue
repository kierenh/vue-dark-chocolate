<template>
    <div v-if="currentTrade != null">
        <div class="row col-lg-12 top_20">
            <div class="col-lg-8">
                <h3 class="text-left">
                    Trade
                    <em>{{ currentTrade.referenceCode }}</em>
                </h3>
            </div>
        </div>

        <div class="row col-lg-12 top_20">
            <div class="col-lg-4">
                <span>Counterparty</span>
                <h5 class="top_10">{{ currentTrade.counterparty }}</h5>
            </div>
            <div class="col-lg-2"></div>
            <div class="col-lg-2">
                <span>Issue date</span>
                <h5 class="top_10">{{ sharedState.referenceData.dateTimeFormat.format(currentTrade.issueDate * 1000) }}</h5>
            </div>
            <div class="col-lg-2">
                <span>Offer expiry</span>
                <h5 class="top_10">{{ sharedState.referenceData.dateTimeFormat.format(currentTrade.offerExpiry * 1000) }}</h5>
            </div>
            <div class="col-lg-2">
                <span>Offer accepted</span>
                <h5 class="top_10">{{ currentTrade.isOfferAccepted ? sharedState.referenceData.dateTimeFormat.format(currentTrade.offerAccepted * 1000) : '-' }}</h5>
            </div>
        </div>

        <!-- Status -->
        <div v-if="canCounterpartyCertify" class="row">
            <div class="col-lg-6 offset-lg-3" align="middle">
                <span>As the authorised representative of
                    <strong>{{ currentAccount }}</strong> I hereby solemnly and sincerely declare that this trade is sold and I am bound to this agreement. And I make this solemn declaration conscientiously believing the same to be true.</span>
            </div>
            <div class="col-lg-4 offset-lg-4" align="middle">
                <button class="btn status-green right" type="submit" v-on:click="certifyTradeAsBuyer">Certify</button>
            </div>
        </div>
        <div v-else class="row col-lg-12 top_10 center">
            <div class="col-lg-12" align="middle">
                <div class="col-lg-4" align="middle">
                    <strong>Status</strong>
                </div>
                <div v-bind:class="currentTrade.status.code" class="col-lg-4 top_10" align="middle">
                    <div class="trade-status">
                        <h5>{{ currentTrade.status.description }}</h5>
                        <em>{{ statusMessage }}</em>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: 'trade-detail',
    props: ['tradeReferenceCode'],
    data() {
        return {
            privateState: {
                currentTrade: undefined
            },
            sharedState: this.$store.state
        }
    },
    computed: {
        currentAccount(state) {
            return this.$store.getters.currentAccount
        },
        statusMessage(state) {
            if (this.currentTrade.status.value === this.sharedState.referenceData.tradeStatuses.created.value) {
                return "Awaiting certification from counterparty"
            } else if (this.currentTrade.status.value === this.sharedState.referenceData.tradeStatuses.counterPartyCertified.value) {
                return "Trade is certified by counterparty"
            } else if (this.currentTrade.status.value === this.sharedState.referenceData.tradeStatuses.counterPartyRejected.value) {
                return "Trade is rejected by counterparty"
            }
        },
        currentTradeReferenceCode(state) {
            return this.sharedState.route.params.tradeReferenceCode
        },
        currentTrade(state) {
            return this.privateState.currentTrade
        },
        canCounterpartyCertify(state) {
            return this.currentTrade && this.currentTrade.isCounterparty && this.currentTrade.status.value === this.sharedState.referenceData.tradeStatuses.created.value
        },
    },
    created() {
        this.loadData()
    },
    mounted() {
    },
    methods: {
        loadData: function() {
            this.getTradeAsync()
        },
        getTradeAsync: function() {
            var self = this
            return this.$apis.trade.actions.getTrade({ account: this.currentAccount, tradeReferenceCode: this.currentTradeReferenceCode, referenceData: this.sharedState.referenceData }).then(function(returnValue) {
                self.privateState.currentTrade = returnValue.trade
            })
        },
        certifyTradeAsCounterparty() {
            // TODO: Call the trade API to certify the trade
        }
    },
    destroyed() {
    }
}
</script>
