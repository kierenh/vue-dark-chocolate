<style>
@import url("https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css")
</style>
<style>
@import url("https://fonts.googleapis.com/css?family=Roboto")
</style>

<template>
  <div id="app" style="min-height: 200px">
    <header>
      <nav class="navbar navbar-expand-lg" id="mainNav">
        <div class="col-lg-6">
          <span class="navbar-brand">
            <router-link to="/">
              <i class="fa fa-home" aria-hidden="true"></i>
              <strong> {{ title }} </strong>
            </router-link>
          </span>
        </div>
        <div class="col-lg-6 user-info text-right">
          {{ currentAccount }}
        </div>
      </nav>
    </header>
    <div class="top_40">
    <router-view></router-view>
    </div>
    <footer>
      <div class="container">
        © 2017 {{ title }}
        <a href="https://github.com/kierenh/vue-dark-chocolate.git" target="_blank">Github</a>
      </div>
    </footer>
  </div>
</template>

<script>
export default {
  name: 'app',
  props: ['account'],
  data() {
    return {
      privateState: {
        accountInterval: {}
      },
      sharedState: this.$store.state
    }
  },
  computed: {
    title() {
      return this.sharedState.title
    },
    currentAccount() {
      return this.$store.getters.currentAccount
    }
  },
  created() {
    console.log("app created")

    // Listening for Selected Metamask Account Changes, as per: https://github.com/MetaMask/faq/blob/master/DEVELOPERS.md
    // Since these variables reflect user intention, but do not (currently) have events representing their values changing, we somewhat reluctantly recommend using an interval to check for account changes.
    // For example, if your application only cares about the web3.eth.accounts[0] value, you might add some code like this somewhere in your application:

    var self = this
    self.privateState.accountInterval = setInterval(function() {
      if (web3.eth.accounts[0] !== self.sharedState.account) {
        self.$store.commit('account', { address: web3.eth.accounts[0] })

        console.info("Account switched. Going back to home...")
        self.$router.push({ name: 'home' })
      }
    }, 1000)
  },
  mounted() {
  },
  methods: {
  },
  destroyed() {
    clearInterval(this.privateState.accountInterval)
  }
}
</script>
