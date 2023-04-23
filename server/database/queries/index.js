const { checkEmailQuery, checkUsernameQuery, createNewUserQuery } = require('./signup')
const { getAllPostsQuery, addPostQuery } = require('./posts')
const { profileInfoQuery } = require('./user')

module.exports = { checkEmailQuery, checkUsernameQuery, createNewUserQuery, getAllPostsQuery, addPostQuery, profileInfoQuery }
