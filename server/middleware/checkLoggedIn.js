const { verifyToken } = require('../utils')
const { customError } = require('../controllers/error')

const checkLoggedIn = (req, res, next) => {
    const accessToken = req.cookies.accessToken

    if (accessToken) {
        verifyToken(accessToken).then((myData) => {
            req.userInfo = myData
            next()
        }).catch(() => {
            res.clearCookie('accessToken')
            next(customError('unAuthorization', 401))
        })
    } else {
        res.redirect('/')
    }
}

module.exports = checkLoggedIn
