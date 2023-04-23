const Joi = require('joi')

const signupValidate = Joi.object({
    username: Joi.string().allow(' ').messages({
        'string.alphanum': 'Username should only contain letters and numbers',
        'string.empty': 'Username cannot be empty',
        'any.required': 'Username is required'
    }).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).max(64).rule({ message: 'your password should be less than 64 letters and more than 6 letters' }).required(),
    photo: Joi.string()
})

module.exports = signupValidate
