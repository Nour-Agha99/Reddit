const Joi = require('joi')

const postValidate = Joi.object({
    title: Joi.string().min(5).max(255).rule({ message: 'your title should be text minumum 5 char' }),
    body: Joi.string().required()
})

module.exports = postValidate
