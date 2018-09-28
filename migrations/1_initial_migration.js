const Notary = artifacts.require("Notary");
const NotaryMulti = artifacts.require("NotaryMulti");

module.exports = function(deployer, network) {

    if (network === 'rinkeby'){
        return deployer
            .deploy(Notary, "0x9441e9bD56d0B632a03b71DC28808b899FAb2570")
            .then((notary) => {
                return deployer.deploy(NotaryMulti, notary.address)
            })
    }

};
