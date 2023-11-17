export const errorHandler = (statusCode, message) => {
    const error = new Error()
    error.statusCode = statusCode;
    error.message = message
    return error
}

export const uniqueErrorHandler = (errorCode, message) => {
    const error = new Error()
    if(errorCode === 11000) {
        error.success = false
        error.errorCode = errorCode
        error.message = 'Email or Username is already taken'
        return error
    }

}