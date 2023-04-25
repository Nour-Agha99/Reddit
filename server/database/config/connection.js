const { Pool } = require('pg')
require('dotenv').config()

const { DB_URL, NODE_ENV } = process.env

const option = {
    connectionString: DB_URL,
    ssl: NODE_ENV === 'production' ? true : false

}

const connection = new Pool(option)

module.exports = connection
