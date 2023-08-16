const { Favorite } = require('../models/index')

async function DeleteFavorite() {
    // try {
    //     await Dress.destroy({
    //         cascade: true,
    //         truncate: true,
    //         restartIdentity: true,
    //     })
    // } catch (err) {
    //     console.log(err)
    // }

    return Favorite.destroy({
        cascade: true,
        truncate: true,
        restartIdentity: true,
    })
}

module.exports = DeleteFavorite