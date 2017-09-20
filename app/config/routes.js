import Home from './../components/home.vue'
import AccountChrome from './../components/account-chrome.vue'
import TradeList from './../components/trades.vue'
import RegisterTrade from './../components/register-trade.vue'
import TradeDetail from './../components/trade-detail.vue'

export default { routes: [
  { name: 'home', path: '/', component: Home },
  {
    path: '/trades',
    props: true,
    component: AccountChrome,
    children: [{
      name: 'trade area',
      path: '',
      props: true,
      component: TradeList
    },
    {
      name: 'register trade',
      path: 'trades/register',
      props: true,
      component: RegisterTrade
    },
    {
      name: 'trade detail',
      path: 'trades/:tradeReferenceCode',
      props: true,
      component: TradeDetail
    }]
  }
]}
