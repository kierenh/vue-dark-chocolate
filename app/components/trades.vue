<template>
    <div>
        <trades-list v-bind:trades="privateState.trades"></trades-list>
    </div>
</template>
<script>
import TradesList from './trades-list.vue'

export default {
    name: 'trades',
    components: { 'trades-list': TradesList },
    props: ['apis'],
    data() {
        return {
            privateState: {
                trades: []
            },
            sharedState: this.$store.state
        }
    },
    computed: {
    },
    created() {
        this.loadData()
    },
    mounted() {
    },
    methods: {
        loadData: function () {
            this.getTradesAsync()
        },
        getTradesAsync: function () {
            var self = this
            return this.$apis.trade.actions.getTrades({ account: this.$store.getters.currentAccount, referenceData: this.sharedState.referenceData}).then(function(returnValue) {
                self.privateState.trades = returnValue.trades
            })
        }
    },
    destroyed() {
    }
}
</script>
