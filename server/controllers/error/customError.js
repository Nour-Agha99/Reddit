const customError = (message, statusCode) => {
    const customError = new Error(message)
    customError.status = statusCode
    customError.type = 'CustomError'
    return customError
}

module.exports = customError
