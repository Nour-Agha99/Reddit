const Joi = require('joi')

const signupValidate = Joi.object({
    password: Joi.string().min(6).max(64).messages({
        'string.min': 'Password should be at least 6 characters long',
        'string.max': 'Password must be 6 to 64 characters',
        'string.empty': 'Password cannot be empty',
        'any.required': 'Password is required'
    }).required(),
    email: Joi.string().email().messages({
        'string.email': 'Please enter a valid Email address',
        'string.empty': 'Email cannot be empty',
        'any.required': 'Email is required'
    }).required(),
    username: Joi.string().allow(' ').messages({
        'string.alphanum': 'Username should only contain letters and numbers',
        'string.empty': 'Username cannot be empty',
        'any.required': 'Username is required'
    }).required(),
    photo: Joi.string().allow('')
})

module.exports = signupValidate
