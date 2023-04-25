const connection = require('../../config/connection')

const addVoteQuery = ({ userId, postId, vote }) => {
    const sql = {
        text: 'INSERT INTO votes(user_id, post_id, vote) VALUES ($1, $2, $3) RETURNING user_id, post_id, vote;',
        values: [userId, postId, vote]
    }
    return connection.query(sql)
}
module.exports = addVoteQuery
