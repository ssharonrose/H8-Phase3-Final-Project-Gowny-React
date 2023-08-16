const { User } = require('../models/index')

async function DeleteUser() {
    // try {
    //     await User.destroy({
    //         cascade: true,
    //         truncate: true,
    //         restartIdentity: true,
    //     })
    // } catch (err) {
    //     console.log(err)
    // }

    return User.destroy({
        cascade: true,
        truncate: true,
        restartIdentity: true,
    })
}

module.exports = DeleteUser