const { Category } = require('../models/index')

async function DeleteCategory() {
    // try {
    //     await Category.destroy({
    //         cascade: true,
    //         truncate: true,
    //         restartIdentity: true,
    //     })
    // } catch (err) {
    //     console.log(err)
    // }

    return Category.destroy({
        cascade: true,
        truncate: true,
        restartIdentity: true,
    })
}

module.exports = DeleteCategory