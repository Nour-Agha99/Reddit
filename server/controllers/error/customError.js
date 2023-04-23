const customError = (message, statusCode) => {
    const customError = new Error(message)
    customError.status = statusCode
    return customError
}

module.exports = customError
