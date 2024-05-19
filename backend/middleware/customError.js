// Custom error class for defining specific error types
class CustomError extends Error {
    constructor(message, statusCode, type) {
        super(message);
        this.statusCode = statusCode || 500;
        this.type = type || 'General';
        Error.captureStackTrace(this, this.constructor);
    }
}


module.exports = { CustomError };