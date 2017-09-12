<template>
  <div v-if="currentTrade != null">
    <form>
      <div class="row col-lg-12 top_20">
        // TODO:
      </div>
    </form>
  </div>
</template>

<script>
export default {
  name: 'register-trade',
  props: ['account'],
  data() {
    return {
      privateState: {
        currentTrade: undefined
      },
      sharedState: this.$store.state
    }
  },
  computed: {
    currentAccount() {
      return this.$store.getters.currentAccount
    },
    currentTrade() {
      return this.privateState.currentTrade
    }
  },
  created() {
    this.create()
  },
  mounted() {
  },
  methods: {
    create() {
      this.privateState.currentTrade = {
        // TODO: initialize the trade object
      }
    },
    register() {
      this.save()
    },
    save() {
      // TODO: Call the trade API
    }
  },
  destroy() {
  }
}
</script>
