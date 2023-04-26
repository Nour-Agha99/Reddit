const { editVoteQuery, checkVoteQuery } = require('../../../database/queries')
const { voteValidate } = require('../../../utils')
const { customError } = require('../../error')

const editVote = (req, res, next) => {
    const userId = req.userInfo.id
    const { postId, vote } = req.body

    voteValidate.validateAsync({ userId, postId, vote }, { abortEarly: false })
        .then(() => checkVoteQuery(userId, postId))
        .then((data) => {
            if (!data.rowCount) {
                res.json({ message: 'you dont have a vote yet' })
                throw customError('you dont have a vote yet', 403)
            }
        })
        .then(() => editVoteQuery({ userId, postId, vote }))
        .then((data) => {
            res.status(200).json({ allData: data.rows, message: 'The vote has been updated successfully', status: 200 })
        })
        .catch((err) => err.details ? next(customError(err.details[0].message, 400)) : next(err))
}

module.exports = editVote
