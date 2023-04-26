const { signUp, signIn, logout } = require('./auth')
const { allPosts, addPost } = require('./posts')
const { profileInfo } = require('./users')
const { addVote, editVote, getVote } = require('./votes')

module.exports = { signUp, signIn, logout, allPosts, addPost, profileInfo, addVote, editVote, getVote }
