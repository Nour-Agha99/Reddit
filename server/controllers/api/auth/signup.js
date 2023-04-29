const { hashPassword, signToken, signupValidate } = require('../../../utils')
const { customError } = require('../../error')
const { checkEmailQuery, checkUsernameQuery, createNewUserQuery } = require('../../../database/queries')
const signUp = (req, res, next) => {
    const { username, email, password, photo } = req.body
    signupValidate.validateAsync({ username, email, password, photo }, { abortEarly: false })
        .then(() => checkEmailQuery(email))
        .then((Email) => {
            if (Email.rowCount) { throw customError('Email is already reserved', 400) }
            return checkUsernameQuery(username)
        })
        .then((UserName) => {
            if (UserName.rowCount) { throw customError('Username already reserved', 400) }
            return hashPassword(password)
        })
        .then((newLookPassword) => createNewUserQuery({ username, email, password: newLookPassword, photo }))
        .then((data) => signToken(data.rows[0]))
        .then((token) => res.status(201).cookie('accessToken', token).json({ message: 'The user has been added successfully', status: 201 }))
        .catch((err) => next(err))
}

module.exports = signUp
