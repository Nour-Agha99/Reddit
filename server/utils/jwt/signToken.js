const jwt = require('jsonwebtoken')

const signToken = ({ id, username, email, photo }) => new Promise((resolve, reject) => {
    jwt.sign({ id, username, email, photo }, process.env.SECRET_KEY, (err, token) => {
        if (err) return reject(err)
        return resolve(token)
    })
})

module.exports = signToken
