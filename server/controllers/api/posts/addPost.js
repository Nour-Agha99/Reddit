const { postValidate } = require('../../../utils')
const { customError } = require('../../error')
const { addPostQuery } = require('../../../database/queries')

const addPost = (req, res, next) => {
    const { title, body } = req.body

    postValidate.validateAsync({ title, body }, { abortEarly: false })
        .then(() => {
            const userId = req.userInfo.id
            addPostQuery({ title, body, userId })
        })
        .then(() => {
            res.status(201).json({ message: 'The post has been added successfully', status: 201 })
        })
        .catch((err) => err.details ? next(customError(err.details[0].message, 400)) : next(err))
}

module.exports = addPost
