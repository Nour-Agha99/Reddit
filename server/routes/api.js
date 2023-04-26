const userRouter = require('express').Router()

const { signUp, signIn, logout, allPosts, addPost, profileInfo, addVote, editVote, getVote } = require('../controllers')
const { checkLoggedIn, dataUser } = require('../middleware')

userRouter.post('/signup', signUp)
userRouter.post('/signin', signIn)
userRouter.get('/allPosts', allPosts)
userRouter.use(checkLoggedIn)
userRouter.get('/userData', dataUser)
userRouter.get('/getVote', getVote)
userRouter.post('/addPost', addPost)
userRouter.post('/addVote', addVote)
userRouter.patch('/editVote', editVote)
userRouter.get('/profile/:username', profileInfo)
userRouter.get('/logout', logout)

module.exports = userRouter
