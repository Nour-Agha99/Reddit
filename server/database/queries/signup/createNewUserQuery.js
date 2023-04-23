const connection = require('../../config/connection')
const createNewUserQuery = (newData) => {
    const { username, email, password, photo } = newData
    const sql = {
        text: 'INSERT INTO users(username, email, password, photo) VALUES ($1,$2,$3,$4) RETURNING id, username, email, photo;',
        values: [username, email, password, photo]
    }
    return connection.query(sql)
}

module.exports = createNewUserQuery
