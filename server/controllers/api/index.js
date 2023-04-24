const { signUp, signIn, logout } = require('./auth')
const { allPosts, addPost } = require('./posts')
const { profileInfoController } = require('./users')
const { addVote } = require('./votes')

module.exports = { signUp, signIn, logout, allPosts, addPost, profileInfoController, addVote }
