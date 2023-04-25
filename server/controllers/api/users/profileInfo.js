const { profileInfoQuery } = require('../../../database/queries')

const profileInfo = (req, res, next) => {
    const username = req.params.username
    profileInfoQuery(username).then((data) => {
        console.log(data)
        res.status(200).json({ status: 200, data: data.rows })
    }).catch((err) => next(err))
}

module.exports = profileInfo
