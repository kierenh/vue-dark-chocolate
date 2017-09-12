<template>
    <div>
        <div class="container-fluid text-center">
            <div class="row">
                <!-- Left Menu -->
                <div class="col-lg-2 sidenav">
                    <div id="sidemenu">
                        <ul class="nav-item text-left">
                            <li class="sidebar-nav-item">
                                <router-link :to="{ name: 'trade area' }">
                                    <span>
                                        Trades</span>
                                </router-link>
                            </li>
                            <li class="sidebar-nav-item">
                                <router-link v-show="canRegisterTrade" :to="{ name: 'register trade' }">
                                    Register a Trade</router-link>
                            </li>
                        </ul>
                    </div>
                </div>
                <!-- Main Content -->
                <div class="col-lg-10 section-content text-left">
                    <router-view></router-view>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'account-chrome',
    data() {
        return {
            privateState: {},
            sharedState: this.$store.state
        }
    },
    methods: {
    },
    computed: {
        title() {
            return this.sharedState.title
        },
        currentAccount() {
            return this.$store.getters.currentAccount
        },
        canRegisterTrade() {
            return true
        }
    },
    beforeRouteUpdate(to, from, next) {
        next()
    },
    created() {
    },
    mounted() {
    },
    methods: {
    },
    destroyed() {
    }
}
</script>
