const PrivateKeyProvider = require("truffle-privatekey-provider");

module.exports = {
  // See <http://truffleframework.com/docs/advanced/configuration>
  // to customize your Truffle configuration!
    networks: {
        rinkeby: {
            provider: function() {
                return new PrivateKeyProvider("<---private-key--->", 'https://rinkeby.infura.io/')
            },
            network_id: '4',
            gas: 4500000,
            gasPrice: 10000000000,
        }
    }
};
