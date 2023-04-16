const express = require('express')
const compression = require('compression')
const path = require('path')
const router = require('./router')

const app = express()
app.disable('x-powerd-by')

app.set('port', process.env.PORT || 2710)
app.use([
    express.json(),
    express.urlencoded({ extended: false }),
    compression(),
    express.static(path.join(__dirname, '..', 'public')),
    router
])
app.use('/hello', (req, res) => {
    res.send('Hello World!')
})
module.exports = app
