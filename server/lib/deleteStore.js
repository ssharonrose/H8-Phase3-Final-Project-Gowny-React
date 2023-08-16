const { Store } = require('../models/index')

async function DeleteStore() {
    // try {
    //     await Store.destroy({
    //         cascade: true,
    //         truncate: true,
    //         restartIdentity: true,
    //     })
    // } catch (err) {
    //     console.log(err)
    // }

    return Store.destroy({
        cascade: true,
        truncate: true,
        restartIdentity: true,
    })
}

module.exports = DeleteStore