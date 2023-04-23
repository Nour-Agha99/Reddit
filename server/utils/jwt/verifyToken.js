const Jwt = require('jsonwebtoken')

const verifyToken = (token) => new Promise((resolve, reject) => {
    Jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
        if (err) return reject(err)
        return resolve(decoded)
    })
})

module.exports = verifyToken
