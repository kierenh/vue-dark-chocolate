<template>
    <div class="container">
      <div class="jumbotron">
        <h1 class="display-3">Hello there!</h1>
        <p class="lead">You are about to enter the
          <em>{{ title }}</em> as
          <em>{{ currentAccount }}</em>
        </p>
        <p class="lead">
          <router-link :to="{ name: 'trade area' }" class="btn btn-primary btn-x-lg">
            <span>
              Proceed
            </span>
          </router-link>
        </p>
        <hr class="my-4">
        <p>Alternatively, use Metamask to switch accounts!</p>
      </div>
    </div>
</template>
<script>

export default {
  name: 'home',
  data() {
    return {
      privateState: {},
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
  created: function() {
  },
  destroyed: function() {
  }
}
</script>
