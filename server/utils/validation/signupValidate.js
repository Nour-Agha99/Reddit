const Joi = require('joi')

const signupValidate = Joi.object({
    username: Joi.string().alphanum().rule({ message: 'your email should be characters or numbers' }).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).max(64).rule({ message: 'your password should be less than 64 letters and more than 6 letters' }).required(),
    photo: Joi.string().required()
})

module.exports = signupValidate
