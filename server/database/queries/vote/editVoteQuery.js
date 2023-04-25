const connection = require('../../config/connection')

const editVoteQuery = ({ userId, postId, vote }) => {
    const sql = {
        text: 'UPDATE votes SET vote=$3 WHERE user_id=$1 AND post_id=$2 RETURNING user_id, post_id, vote;',
        values: [userId, postId, vote]
    }
    return connection.query(sql)
}
module.exports = editVoteQuery
