// Allows us to use ES6 in our migrations and tests.
require('babel-register')

module.exports = {
  networks: {
    development: {
      host: 'localhost',
      port: 8545,
      network_id: '*', // Match any network id,
      gas: 6500000
    },
    'development-no-data-seed': {
      host: 'localhost',
      port: 8545,
      network_id: '27666', 
      gas: 6500000
    }   
  },
  mocha: {
    useColors: true,
    reporter: "spec",
    reporterOptions: {
      mochaFile: 'junitresults.xml'
    }
  }
}
