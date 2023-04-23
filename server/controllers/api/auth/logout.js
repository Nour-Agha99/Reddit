
const logout = (req, res, next) => {
    try {
        res.clearCookie('accessToken').redirect('/')
    } catch (err) {
        next(err)
    }
}

module.exports = logout
