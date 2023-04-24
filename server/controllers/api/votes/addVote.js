const { addVoteQuery } = require('../../../database/queries')

const addVote = (req, res, next) => {
    const userId = req.userInfo.id
    const { postId, vote } = req.body
    addVoteQuery({ userId, postId, vote })
        .then(() => {
            res.status(201).json({ message: 'The vote has been added successfully', status: 201 })
        })
        .catch((err) => next(err))
}

module.exports = addVote
