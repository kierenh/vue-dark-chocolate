<template>
  <div class="row col-lg-12">
    <table class="table">
      <thead>
        <tr>
          <th class="text-left">Ref Code</th>
          <th class="text-left">Counterparty</th>
          <th class="text-right">Issue Date</th>
          <th class="text-right">Offer Expiry</th>
          <th class="text-right">Offer Accepted</th>
          <th class="text-center">Status</th>
        </tr>
      </thead>
      <tr class="clickable-row" v-for="(trade, i) in sortedTrades" v-bind:key="trade.id" v-on:click="selectTrade(trade)">
        <td class="text-left"> {{ trade.referenceCode }}</td>
        <td class="text-left"> {{ trade.counterparty }}</td>
        <td class="text-right"> {{ sharedState.referenceData.dateTimeFormat.format(trade.issueDate * 1000) }}</td>
        <td class="text-right"> {{ sharedState.referenceData.dateTimeFormat.format(trade.offerExpiry * 1000) }}</td>
        <td class="text-right"> {{ trade.isOfferAccepted ? sharedState.referenceData.dateTimeFormat.format(trade.offerAccepted * 1000) : '-' }}</td>
        <td v-bind:class="trade.status.code" class="trade-status-small text-center"> {{ trade.status.description }}</td>
      </tr>
    </table>
  </div>
</template>

<script>
export default {
  name: 'trades-list',
  props: ['trades'],
  data() {
    return {
      privateState: { },
      sharedState: this.$store.state
    }
  },
  computed: {
    sortedTrades() {
      return this.trades.sort((a, b) => b.issueDate - a.issueDate)
    }
  },
  methods: {
    selectTrade: function (trade) {
      var currentAccount = this.$store.getters.currentAccount
      this.$router.push({ name: 'trade detail', params: { account: currentAccount, tradeReferenceCode: trade.referenceCode } })
    }
  }
}
</script>
