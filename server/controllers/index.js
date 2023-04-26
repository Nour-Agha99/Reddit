const { signUp, signIn, logout, allPosts, addPost, profileInfo, addVote, editVote, getVote } = require('./api')
const { homePage, profilePage } = require('./pages')
const { customError, clientError, serverError } = require('./error')

module.exports = { signUp, signIn, logout, allPosts, addPost, homePage, profileInfo, profilePage, addVote, editVote, getVote, customError, clientError, serverError }
