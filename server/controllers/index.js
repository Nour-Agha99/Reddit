const { signUp, signIn, logout, allPosts, addPost, profileInfo, addVote, editVote } = require('./api')
const { homePage, profilePage } = require('./pages')

module.exports = { signUp, signIn, logout, allPosts, addPost, homePage, profileInfo, profilePage, addVote, editVote }
