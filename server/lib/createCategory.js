const { Category } = require('../models/index.js')
const dataCategory = require('../sampleData/category.json')

function CreateCategory() {
    // try {
    //     // console.log(dataCategory)
    //     await Category.bulkCreate(dataCategory)
    //     // console.log(result)
    // } catch (err) {
    //     console.log(err)
    // }

    return Category.bulkCreate(dataCategory);

}

module.exports = { CreateCategory }