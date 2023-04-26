const { checkEmailQuery, checkUsernameQuery, createNewUserQuery } = require('./signup')
const { getAllPostsQuery, addPostQuery } = require('./posts')
const { profileInfoQuery } = require('./user')
const { addVoteQuery, checkVoteQuery, editVoteQuery, getVoteQuery } = require('./vote')

module.exports = { checkEmailQuery, checkUsernameQuery, createNewUserQuery, getAllPostsQuery, addPostQuery, profileInfoQuery, addVoteQuery, checkVoteQuery, editVoteQuery, getVoteQuery }
