const { Dress } = require('../models/index.js')
const dataDress = require('../sampleData/dress.json')

function CreateDress() {
    // try {
    //     // console.log(dataDress)
    //     const result = await Dress.bulkCreate(dataDress)
    //     // console.log(result, '<< ini result')
    // } catch (err) {
    //     console.log(err)
    // }

    // const data = await Dress.bulkCreate(dataDress)
    // console.log('aaasass')
    // const data = [
    //     {
    //         "name": "Cinderella Divine Sleeveless Mermaid Wedding Gown",
    //         "description": "This elegant dress, made with premium materials, shines out with a stunning confection of lace, embellishments, and tulle fabric. Both romantic and conventional brides looking for a touch of sophistication and flawless taste will love this off the shoulder wedding dress",
    //         "grade": "B",
    //         "price": 13500000,
    //         "mainImage": "https://www.thedressoutlet.com/cdn/shop/products/A1036W.jpg?v=1689806529&width=1646",
    //         "CategoryId": 4,
    //         "StoreId": 1
    //     },
    // ]
    return Dress.bulkCreate(dataDress)

}

module.exports = { CreateDress }