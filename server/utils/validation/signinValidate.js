const Joi = require('joi')

const signinValidate = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).max(64).rule({ message: 'your password should be less than 64 letters and more than 6 letters' }).required()
})

module.exports = signinValidate
