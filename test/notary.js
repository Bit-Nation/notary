const Notary = artifacts.require('Notary');
const NotaryMulti = artifacts.require('NotaryMulti');

contract('Notary - notarize', () => {

    it('notarize successfully', () => {

        return Notary
            .new()
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
            .new()
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

    })

});

contract("NotaryMulti - notarize", () => {

    it('notarize', () => {

        return Notary
            .new()
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
