// http://truffle.readthedocs.io/en/beta/getting_started/migrations/

var Owned = artifacts.require("./Owned.sol");
var KeyedCollection = artifacts.require("./KeyedCollection.sol");
var Trades = artifacts.require("./Trades.sol");
var TradeManager = artifacts.require("./TradeManager.sol");
var TradeRegister = artifacts.require("./TradeRegister.sol");

module.exports = function (deployer, network, accounts) {

  deployer.deploy(Owned);
  // deployer.deploy(KeyedCollection);

  // deployer.deploy(Trades);
  // deployer.link(Owned, Trades);

  // deployer.deploy(TradeManager);
  // deployer.link(Owned, TradeManager);
  // deployer.link(KeyedCollection, TradeManager);

  deployer.deploy(TradeRegister);
  deployer.link(Owned, TradeRegister);
  // nb. some insight in to gas price and how to work out how much the deploy is going to cost
  // https://github.com/ConsenSys/truffle-webpack-demo/issues/2

  if (network == "development") {
    // ...
  } else {
    // Perform a different step otherwise.
  }
};
