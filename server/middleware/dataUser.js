
const dataUser = (req, res) => {
    const user = req.userInfo
    res.json({ user })
}

module.exports = dataUser
