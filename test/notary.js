const Notary = artifacts.require('Notary');
const NotaryMulti = artifacts.require('NotaryMulti');

contract("Notary - constructor ", (accounts) => {

    it('correct state', () => {

        return Notary
            .new(accounts[5])
            .then(async (notary) => {

                assert.equal(accounts[5], await notary.owner())

            })

    })

});

contract('Notary - setNotarisationFee', (accounts) => {

    it('only callable by owner', () => {

        const notaryOwner = accounts[5];

        return Notary
            .new(notaryOwner)
            .then(async (notary) => {

                await notary.setNotarisationFee(30, {
                    from: notaryOwner,
                });
                assert.equal(30, (await notary.notarisationFee()).toNumber());

                try {
                    await notary.setNotarisationFee(30);
                } catch (e) {
                    assert.equal("VM Exception while processing transaction: revert", e.message);
                    return
                }

                assert.fail("expected an error since the call wasn't send my the owner")

            })

    })

});

contract('Notary - notarize', (accounts) => {

    it('notarize successfully', () => {

        return Notary
            .new(accounts[8])
            .then(async (notary) => {

                // data to notarize
                const toNotarize = "please notarise me :) - Ħ";

                await notary.notarize(toNotarize);
                const record = await notary.record(toNotarize);
                assert.equal(toNotarize, Buffer.from(record[0].substr(2), 'hex').toString());

            })

    });

    it('notarize twice must throw error', () => {

        return Notary
            .new(accounts[8])
            .then(async (notary) => {

                // data to notarize
                const toNotarize = "please notarise me :)";

                await notary.notarize(toNotarize);

                try {
                    await notary.notarize(toNotarize);
                } catch (e) {
                    assert.equal("VM Exception while processing transaction: revert", e.message);
                    return
                }

                assert.fail("expected an error since we shouldn't be able to notarize twice")

            })

    });

    it('should fail on missing notary fee', () => {

        const notaryOwner = accounts[8];

        return Notary
            .new(notaryOwner)
            .then(async (notary) => {

                // set fee to 20 wei
                await notary.setNotarisationFee(20, {
                    from: notaryOwner
                });

                const oldOwnerBalance = web3.eth.getBalance(notaryOwner);

                // should work when sending the tx fee
                await notary.notarize("value", {
                    value: 20
                });

                // notary owner must have 20 wei more since the notarisation fee is sent to him
                assert.equal(
                    oldOwnerBalance.add(20).toString(),
                    web3.eth.getBalance(notaryOwner).toString()
                );

                // shouldn't work when sending too less for the fee
                try {
                    await notary.notarize("another value", {
                        value: 19
                    });
                } catch (e) {
                    assert.equal("VM Exception while processing transaction: revert", e.message);
                    return;
                }

                assert.fail("I should fail since value is too low")

            })

    })

});

contract("NotaryMulti - notarize", (accounts) => {

    it('notarize', () => {

        return Notary
            .new(accounts[8])
            .then(async (notary) => {

                const multiNotary = await NotaryMulti.new(notary.address);

                await multiNotary.notarizeTwo(
                    Buffer.from("value_one").toString("hex"),
                    Buffer.from("value_two").toString("hex")
                );

                await multiNotary.notarizeTwo(
                    Buffer.from("value_three").toString("hex"),
                    Buffer.from("value_four").toString("hex")
                );

            })

    })

});
