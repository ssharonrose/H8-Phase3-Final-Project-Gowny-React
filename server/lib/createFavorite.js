const { Favorite } = require('../models/index.js')
const dataFavorite = require('../sampleData/favorite.json')

function CreateFavorite() {
    // try {
    //     // console.log(dataDress)
    //     const result = await Dress.bulkCreate(dataDress)
    //     // console.log(result, '<< ini result')
    // } catch (err) {
    //     console.log(err)
    // }

    // console.log(dataFavorite)
    return Favorite.bulkCreate(dataFavorite);

}

module.exports = { CreateFavorite }