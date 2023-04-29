const connection = require('../../config/connection')

const profileInfoQuery = (username) => {
    const sql = {
        text: 'SELECT users.username, users.email, users.photo, posts.title, posts.body, posts.created_at FROM users join posts ON posts.user_id = users.id where users.username = $1;',
        values: [username]
    }
    return connection.query(sql)
}
module.exports = profileInfoQuery
