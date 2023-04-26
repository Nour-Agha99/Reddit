const { getVoteQuery } = require('../../../database/queries')

const getVote = (req, res, next) => {
    const userId = req.userInfo.id
    getVoteQuery(userId).then(allData => {
        res.status(200).json({ status: 200, message: 'You have all data to public page succesfully', allData: allData.rows })
    })
        .catch((err) => next(err))
}

module.exports = getVote
