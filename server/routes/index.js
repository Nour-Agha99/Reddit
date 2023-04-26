const router = require('express').Router()
const userRouter = require('./api')
const pagesRouter = require('./pages')
const { clientError, serverError } = require('../controllers')

router.use('/api/v1', userRouter)
router.use('/sign', pagesRouter)
router.use(clientError)
router.use(serverError)

module.exports = router
