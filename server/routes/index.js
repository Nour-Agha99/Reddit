const router = require('express').Router()
const userRouter = require('./api')
const pagesRouter = require('./pages')

router.use('/api/v1', userRouter)
router.use('/sign', pagesRouter)

module.exports = router
