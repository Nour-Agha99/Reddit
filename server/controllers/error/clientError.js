const clientError = (req, res) => {
    res.status(404).json({ message: 'PAGE NOT FOUND', status: 404 })
}

module.exports = clientError
