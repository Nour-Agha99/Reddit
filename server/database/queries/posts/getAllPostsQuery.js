const connection = require('../../config/connection')

const getAllPostsQuery = () => {
    const sql = {
        text: 'SELECT users.photo, users.username, posts.title, posts.id, posts.body, posts.created_at, SUM(votes.vote) AS total_votes FROM users JOIN posts ON users.id = posts.user_id JOIN votes ON votes.post_id = posts.id GROUP BY users.photo, users.username, posts.title, posts.id, posts.body, posts.created_at'
    }
    return connection.query(sql)
}
module.exports = getAllPostsQuery
