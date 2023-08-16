const { User } = require('../models/index.js')
const dataUser = require('../sampleData/user.json')
const { hashPassword } = require('../helpers/bcrypt.js')
dataUser.forEach((el) => {
    el.password = hashPassword(el.password)
})

function CreateUser() {
    // try {
    //     // console.log(dataUser)
    //     const result = await User.bulkCreate(dataUser)
    //     // console.log(result)
    //     return result
    // } catch (err) {
    //     console.log(err)
    // }

    return User.bulkCreate(dataUser);

}

module.exports = { CreateUser }