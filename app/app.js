// Import the page's CSS. Webpack will know what to do with it.
import './images/favicon.ico'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import "./stylesheets/app.css"

// Import libraries we need.
import { default as Web3 } from 'web3';

// Vuex libs and bootstrap
import Vue from 'vue'
import Vuex from 'vuex'
import VueRouter from 'vue-router'
import { sync } from 'vuex-router-sync'
import BootstrapVue from 'bootstrap-vue'
import App from './components/app.vue'
import Routes from './config/routes.js'
import Store from './components/store.js'

Vue.use(BootstrapVue)
Vue.use(VueRouter)
Vue.use(Vuex)

// Import our contract artifacts and turn them into usable abstractions.
import { default as contract } from 'truffle-contract'
import traderegister_artifacts from './../build/contracts/TradeRegister.json'
import Trade from './api/trade.js'

window.addEventListener('load', function () {
  // The environmental web3 check is wrapped in a window.addEventListener('load', ...) handler. 
  // This approach avoids race conditions with web3 injection timing.
  // As per recommendation here: https://github.com/MetaMask/faq/blob/master/DEVELOPERS.md

  // Checking if Web3 has been injected by the browser (Mist/MetaMask)
  if (typeof web3 !== 'undefined') {
    console.warn("Using web3 detected from external source. If you find that your accounts don't appear, ensure you've configured that source properly. If using MetaMask, see the following link. http://truffleframework.com/tutorials/truffle-and-metamask")
    // Use Mist/MetaMask's provider
    window.web3 = new Web3(web3.currentProvider)
  } else {
    console.warn("No web3 detected. Falling back to http://localhost:8545. You should remove this fallback when you deploy live, as it's inherently insecure. Consider switching to Metamask for development. More info here: http://truffleframework.com/tutorials/truffle-and-metamask");
    // fallback - use your fallback strategy (local node / hosted node + in-dapp id mgmt / fail)
    window.web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"))
  }

  web3.version.getNetwork((err, netId) => {
    switch (netId) {
      case "1":
        console.log('This is mainnet')
        break
      case '27666':
        console.log('This is the development-no-data-seed network')
        break
      default:
        console.log('This is an unknown network.')
        break
    }
  })

  const ProxiedWeb3 = require("./api/ProxiedWeb3.js");
  window.proxiedWeb3 = new ProxiedWeb3(web3);

  // TradeRegister is our usable smart contract abstraction, which we'll use through the code below.
  var TradeRegister = contract(traderegister_artifacts)

  // Bootstrap the TradeRegister abstraction for Use.
  TradeRegister.setProvider(web3.currentProvider)

  const apis = {
    web3,
    proxiedWeb3,
    trade: new Trade(web3, TradeRegister),
  }

  var store = new Store(apis)
  var router = new VueRouter({
    linkActiveClass: 'active',
    linkExactActiveClass: 'active',
    routes: Routes.routes,
  })

  // set an account and then create the App instance (as App has a dependency on account) 
  store.dispatch('setAccount').then(function () {
    sync(store, router)
    window.app = new Vue({
      router,
      store,
      apis,
      el: '#app',
      title: store.state.title,
      render: h => h(App)
    })
  });
  
  Object.defineProperty(Vue.prototype, '$apis', { value: apis });

})
