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
            if (!username.rowCount) throw customError('The User_Name not exist, signup to get new account', 400)
            return comparePassword(password, data.password)
        })
        .then((correctPassword) => {
            if (!correctPassword) throw customError('The password not correct, restart your mind', 400)
            return signToken(data)
        })
        .then((token) => {
            res.status(200).cookie('accessToken', token).json({ message: 'The user has been logged successfully', status: 200 })
        })
        .catch((err) => err.details ? next(customError(err.details[0].message, 400)) : next(err))
}

module.exports = signin
