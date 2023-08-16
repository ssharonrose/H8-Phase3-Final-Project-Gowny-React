const { User } = require('../models/index')
const { verifyToken } = require('../helpers/jwt')

const authorization = async (request, response, next) => {
    try {
        // console.log(request.headers.access_token, '<< masuk sini')
        if (!request.headers.access_token) {
            throw { name: 'Unauthorized' }
        }

        const payload = verifyToken(request.headers.access_token)
        // console.log(payload)

        if (payload.role !== 'Admin') {
            throw { name: 'Unauthorized' }
        } else {
            next()
        }
        // console.log (user.role)
    } catch (err) {
        // console.log(err)
        // console.log(err, 'disini errornya')
        next(err)
    }
}

module.exports = { authorization }