const connection = require('../../config/connection')
const checkEmailQuery = (email) => {
    const sql = {
        text: 'SELECT * from users where email = $1;',
        values: [email]
    }
    return connection.query(sql)
}
module.exports = checkEmailQuery
