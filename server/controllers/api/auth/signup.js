const { hashPassword, signToken, signupValidate } = require('../../../utils')
const { customError } = require('../../error')
const { checkEmailQuery, checkUsernameQuery, createNewUserQuery } = require('../../../database/queries')
const signUp = (req, res, next) => {
    const { username, email, password, photo } = req.body
    signupValidate.validateAsync({ username, email, password, photo }, { abortEarly: false })
        .then(() => checkEmailQuery(email))
        .then((Email) => {
            if (Email.rowCount) { throw customError('The email you entered is already reserved', 400) }
            return checkUsernameQuery(username)
        })
        .then((UserName) => {
            if (UserName.rowCount) { throw customError('The User_Name you entered is already reserved', 400) }
            return hashPassword(password)
        })
        .then((newLookPassword) => createNewUserQuery({ username, email, password: newLookPassword, photo }))
        .then((data) => signToken(data.rows[0]))
        .then((token) => res.status(201).cookie('accessToken', token).json({ message: 'The user has been added successfully', status: 201 }))
        .catch((err) => err.details ? next(customError(err.details[0].message, 400)).json({ message: err.details[0].message }) : next(err))
}

module.exports = signUp
