const Joi = require('joi')

const signinValidate = Joi.object({
    username: Joi.string().min(4).max(24).required(),
    password: Joi.string().min(4).max(64).required()
})

module.exports = signinValidate
