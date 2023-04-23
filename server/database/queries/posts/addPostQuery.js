const connection = require('../../config/connection')

const addPostQuery = ({ title, body, userId }) => {
    const sql = {
        text: 'INSERT INTO posts(title, body, user_id) VALUES ($1, $2, $3);',
        values: [title, body, userId]
    }
    return connection.query(sql)
}
module.exports = addPostQuery
