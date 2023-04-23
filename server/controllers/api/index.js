const { signUp, signIn, logout } = require('./auth')
const { allPosts, addPost } = require('./posts')
const { profileInfoController } = require('./users')

module.exports = { signUp, signIn, logout, allPosts, addPost, profileInfoController }
