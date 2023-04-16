const connection = require('../../config/connection')
const checkUsernameQuery = (username) => {
    const sql = {
        text: 'SELECT * from users where username = $1;',
        values: [username]
    }
    return connection.query(sql)
}
module.exports = checkUsernameQuery
