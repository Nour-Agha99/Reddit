const { addVoteQuery, checkVoteQuery } = require('../../../database/queries')
const { voteValidate } = require('../../../utils')
const { customError } = require('../../error')

const addVote = (req, res, next) => {
    const userId = req.userInfo.id
    const { postId, vote } = req.body

    voteValidate.validateAsync({ userId, postId, vote }, { abortEarly: false })
        .then(() => checkVoteQuery(userId, postId))
        .then((data) => {
            if (data.rowCount) {
                res.json({ message: 'you are voted before' })
                throw customError('you are voted before', 400)
            }
        })
        .then(() => addVoteQuery({ userId, postId, vote }))
        .then((data) => {
            res.status(201).json({ allData: data.rows, message: 'The vote has been added successfully', status: 201 })
        })
        .catch((err) => err.details ? next(customError(err.details[0].message, 400)) : next(err))
}

module.exports = addVote
