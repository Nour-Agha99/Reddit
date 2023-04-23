const serverError = (req, res) => {
    res.status(404).json({ message: 'SERVER NOT FOUND', status: 404 })
}

module.exports = serverError
