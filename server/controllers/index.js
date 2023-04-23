const { signUp, signIn, logout, allPosts, addPost, profileInfoController } = require('./api')
const { homePage, profilePage } = require('./pages')

module.exports = { signUp, signIn, logout, allPosts, addPost, homePage, profileInfoController, profilePage }
