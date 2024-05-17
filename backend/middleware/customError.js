// Custom error class for defining specific error types
class CustomError extends Error {
    constructor(message, statusCode, type) {
        super(message);
        this.statusCode = statusCode;
        this.type = type;
    }
}


module.exports = { CustomError };