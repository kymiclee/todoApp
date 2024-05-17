// Error handling middleware
const { CustomError } = require("./customError");
const errorHandler = (err, req, res, next) => {
    // Log the error for debugging purposes
    console.error(err);

    // Set the HTTP status code based on the type of error
    let statusCode = 500;
    if (err instanceof CustomError) {
        statusCode = err.statusCode;
    }

    // Send the error response to the client
    res.status(statusCode).json({ error: err.message });
};
module.exports = { errorHandler };