const Notary = artifacts.require('Notary');

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
                    assert.equal("VM Exception while processing transaction: revert", e.message)
                    return
                }

                assert.fail("expected an error since we shouldn't be able to notarize twice")

            })

    })

});
