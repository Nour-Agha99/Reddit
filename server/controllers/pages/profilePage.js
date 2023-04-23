const path = require('path')

const profilePage = (req, res) => {
    res.sendFile(path.join(__dirname, '..', '..', '..', 'public', 'html', 'profile.html'))
}

module.exports = profilePage
