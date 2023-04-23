const express = require('express')
const compression = require('compression')
const path = require('path')
const parser = require('cookie-parser')
const router = require('./routes')

const app = express()
app.disable('x-powerd-by')

app.set('port', process.env.PORT || 2710)
app.use([
    express.json(),
    express.urlencoded({ extended: false }),
    compression(),
    parser(),
    express.static(path.join(__dirname, '..', 'public')),
    router
])

module.exports = app
