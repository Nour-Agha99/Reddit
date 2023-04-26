const { getAllPostsQuery } = require('../../../database/queries')

const allPosts = (req, res, next) => {
    getAllPostsQuery().then(allData => {
        res.status(200).json({ status: 200, message: 'You have all data to public page succesfully', allData: allData.rows })
    }).catch((err) => next(err))
}

module.exports = allPosts
