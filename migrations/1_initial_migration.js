const Notary = artifacts.require("Notary");
const NotaryMulti = artifacts.require("NotaryMulti");

module.exports = function(deployer) {
  return deployer
      .deploy(Notary)
      .then((notary) => {
        return deployer.deploy(NotaryMulti, notary.address)
      })
};
