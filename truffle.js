const PrivateKeyProvider = require("truffle-privatekey-provider");

module.exports = {
  // See <http://truffleframework.com/docs/advanced/configuration>
  // to customize your Truffle configuration!
    networks: {
        rinkeby: {
            provider: function() {
                return new PrivateKeyProvider("60a6745b973a471c36974e8bf2938a98c234d2fff67afc76b49ae011b509882c", 'https://rinkeby.infura.io/')
            },
            network_id: '4',
            gas: 4500000,
            gasPrice: 10000000000,
        }
    }
};
