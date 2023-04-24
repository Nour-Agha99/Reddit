const { signUp, signIn, logout, allPosts, addPost, profileInfoController, addVote } = require('./api')
const { homePage, profilePage } = require('./pages')

module.exports = { signUp, signIn, logout, allPosts, addPost, homePage, profileInfoController, profilePage, addVote }
