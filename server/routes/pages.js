const pagesRouter = require('express').Router()
const { homePage, profilePage } = require('../controllers')
const { checkLoggedIn } = require('../middleware')

pagesRouter.use(checkLoggedIn)
pagesRouter.use('/profile', profilePage)
pagesRouter.use('/homePage', homePage)

module.exports = pagesRouter
