const { Store } = require('../models/index.js')
const dataStore = require('../sampleData/store.json')

function CreateStore() {
    // try {
    //     await Store.bulkCreate(dataStore)
    //     // console.log(result)
    // } catch (err) {
    //     console.log(err)
    // }

    return Store.bulkCreate(dataStore);

}

module.exports = { CreateStore }