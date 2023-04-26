const connection = require('../../config/connection')

const checkVoteQuery = (userId) => {
    const sql = {
        text: 'select votes.vote, votes.post_id, votes.user_id from votes where votes.user_id = $1',
        values: [userId]
    }
    return connection.query(sql)
}
module.exports = checkVoteQuery
