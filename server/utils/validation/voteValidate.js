const Joi = require('joi')

const voteValidate = Joi.object({
    userId: Joi.number().required(),
    postId: Joi.number().required(),
    vote: Joi.number().valid(-1, 0, 1).required()
})

module.exports = voteValidate
