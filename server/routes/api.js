const userRouter = require('express').Router()

const { signUp, signIn, logout, allPosts, addPost, profileInfoController, addVote } = require('../controllers')
const { checkLoggedIn, dataUser } = require('../middleware')

userRouter.post('/signup', signUp)
userRouter.post('/signin', signIn)
userRouter.get('/allPosts', allPosts)
userRouter.use(checkLoggedIn)
userRouter.get('/userData', dataUser)
userRouter.get('/addVote', addVote)
userRouter.get('/logout', logout)
userRouter.post('/addPost', addPost)
userRouter.get('/profile/:username', profileInfoController)

module.exports = userRouter
