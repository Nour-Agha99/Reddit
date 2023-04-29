const { comparePassword, signToken, signinValidate } = require('../../../utils')
const { customError } = require('../../error')
const { checkUsernameQuery } = require('../../../database/queries')
const signin = (req, res, next) => {
    let data
    const { username, password } = req.body
    signinValidate.validateAsync({ username, password }, { abortEarly: false })
        .then(() => checkUsernameQuery(username))
        .then((username) => {
            data = username.rows[0]
            if (!username.rowCount) {
                throw customError('Username not exist, get new account', 400)
            }
            return comparePassword(password, data.password)
        })
        .then((correctPassword) => {
            if (!correctPassword) throw customError('The Password not correct, restart your mind', 400)
            return signToken(data)
        })
        .then((token) => {
            res.status(200).cookie('accessToken', token).json({ message: 'The user has been logged successfully', status: 200 })
        })
        .catch((err) => next(err))
}

module.exports = signin
