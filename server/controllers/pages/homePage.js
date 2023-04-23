const path = require('path')

const homePage = (req, res) => {
    res.sendFile(path.join(__dirname, '..', '..', '..', 'public', 'html', 'home.html'))
}

module.exports = homePage
