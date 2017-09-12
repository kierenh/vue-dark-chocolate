# TODO THIS README

# truffle-init-vue-dark-chocolate
An example dApp boilerplate for Truffle with webpack, Vue, Vuex, Vue-Router and  Vue-Boostrap. Includes contracts, migrations, data seeding, tests, user interface and webpack build pipeline. Hot reloading for dev via webpack-dev-server and production-ready deployment via express. 
Deploy an express site to either IIS or a Linux Box.

## Usage

To initialize a project with this example, run `truffle init vue-dark-chocolate` inside an empty directory.

## Building and the frontend

1. First run `Restart-TestRpcInstance.ps1`
1. First run `truffle compile`, then run `truffle migrate` to deploy the contracts onto your network of choice (default "development").
1. Then run `truffle test`
1. Then run `npm run dev` to build the app and serve it on http://localhost:8081
1.
1.

## Possible upgrades

* Use the webpack hotloader to sense when contracts or javascript have been recompiled and rebuild the application. Contributions welcome!

## Common Errors

* **Error: Can't resolve '../build/contracts/MetaCoin.json'**

This means you haven't compiled or migrated your contracts yet. Run `truffle compile` and `truffle migrate` first.

Full error:

```
ERROR in ./app/main.js
Module not found: Error: Can't resolve '../build/contracts/MetaCoin.json' in '/Users/tim/Documents/workspace/Consensys/test3/app'
 @ ./app/main.js 11:16-59
```

test for commit

## Links

[web3js 1.0 docs](https://web3js.readthedocs.io/en/1.0/)



/// Implementation notes
/// http://solidity.readthedocs.io/en/develop/units-and-global-variables.html
/// sha256(...) returns (bytes32):
///
/// When to use a contract and when to use structs
/// https://ethereum.stackexchange.com/questions/8615/child-contract-vs-struct
///
/// Why bytes32 instead of string:
/// https://ethereum.stackexchange.com/questions/11556/use-string-type-or-bytes32
/// Use Web3 to convert to-from bytes and utf8
/// web3.toHex("Fds")
/// web3.toUtf8("fsd")
///
/// Tip: Initialise storage structs with a single assignment: x = MyStruct({a: 1, b: 2});
/// http://solidity.readthedocs.io/en/develop/miscellaneous.html#layout-of-state-variables-in-storage
///


The Migrations contract stores (in last_completed_migration) a number that corresponds to the last applied "migration" script, found in the migrations folder. Deploying this Migrations contract is always the first such step anyway. The numbering convention is x_script_name.js, with x starting at 1. Your real-meat contracts would typically come in scripts starting at 2_....

So, as this Migrations contract stores the number of the last deployment script applied, Truffle will not run those scripts again. On the other hand, in the future, your app may need to have a modified, or new, contract deployed. For that to happen, you create a new script with an increased number that describes the steps that need to take place. Then, again, after they have run once, they will not run again.

https://ethereum.stackexchange.com/questions/8299/what-are-truffle-migrations



// https://truffle.readthedocs.io/en/develop/advanced/configuration/
//
// Highly recommend checking out configuration docs
//
// When compiling and running migrations on a specific network, contract artifacts will be saved and recorded for later use. 
// When your contract abstractions detect that you're Ethereum client is connected to a specific network, they'll use the contract artifacts 
// associated that network to simplify app deployment. 
//
// gas: Gas limit used for deploys. Default is 3141592.
// gasPrice: Gas price used for deploys. Default is 100000000000 (100 Shannon).
// from: From address used during migrations. If not specified, defaults to the first available account provided by your Ethereum client.




// https://medium.com/@BMatt92656920/getting-started-with-vue-webpack-bootstrap-fb69b24e6f3d



To run tests...
truffle compile
truffle test

Now, this intrinsically kicks off a migration which in turn has some default data seeding.

To turn-off data seeding, you should run testrpc as the 'development-no-data-seed' (see truffle.js) for the network ID
& testrpc.txt for a sample on how to set the network ID

Then you can dev-test as follows:
truffle compile
truffle test --network development-no-data-seed


http://truffleframework.com/docs/getting_started/testing
CLEAN-ROOM ENVIRONMENT
Truffle provides a clean room environment when running your test files. When running your tests against the TestRPC, Truffle will use the TestRPC's advanced snapshotting features to ensure your test files don't share state with each other. When running against other Ethereum clients like go-ethereum, Truffle will re-deploy all of your migrations at the beginning of every test file to ensure you have a fresh set of contracts to test against.

http://truffleframework.com/docs/getting_started/javascript-tests

WRITING TESTS IN JAVASCRIPT
Truffle uses the Mocha testing framework and Chai for assertions to provide you with a solid framework from which to write your Javascript tests. Let's dive in and see how Truffle builds on top of Mocha to make testing your contracts a breeze.

Note: If you're unfamiliar with writing unit tests in Mocha, please see Mocha's documentation before continuing.
