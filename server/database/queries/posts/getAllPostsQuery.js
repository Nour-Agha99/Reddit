const connection = require('../../config/connection')

const getAllPostsQuery = () => {
    const sql = {
        text: 'SELECT users.photo, users.username, posts.title, posts.id, posts.body, posts.created_at FROM users JOIN posts ON users.id = posts.user_id;'
    }
    return connection.query(sql)
}
module.exports = getAllPostsQuery
