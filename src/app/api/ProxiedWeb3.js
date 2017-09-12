module.exports = function (web3) {

  // Web3.js 1.0 has built-in promise support, using this workaround:
  // https://ethereum.stackexchange.com/a/24238
  // until opporotunity to upgrade

  const promisify = (inner) =>
    new Promise((resolve, reject) =>
      inner((err, res) => {
        if (err) { reject(err) }

        resolve(res);
      })
    );

  // simple proxy to promisify the web3 api. It doesn't deal with edge cases like web3.eth.filter and contracts.
  const proxiedWeb3Handler = {
    // override getter                               
    get: (target, name) => {
      const inner = target[name];
      if (inner instanceof Function) {
        // Return a function with the callback already set.  
        return (...args) => promisify(cb => inner(...args, cb));
      } else if (typeof inner === 'object') {
        // wrap inner web3 stuff                             
        return new Proxy(inner, proxiedWeb3Handler);
      } else {
        return inner;
      }
    },
  };

  return new Proxy(web3, proxiedWeb3Handler);
}
