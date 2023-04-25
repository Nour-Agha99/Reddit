const connection = require('../../config/connection')

const checkVoteQuery = (userId, postId) => {
    const sql = {
        text: 'select * from votes where user_id = $1 and post_id = $2;',
        values: [userId, postId]
    }
    return connection.query(sql)
}
module.exports = checkVoteQuery
