// Error handling middleware
const { CustomError } = require("./customError");
const errorHandler = (err, req, res, next) => {

    if (err instanceof CustomError) {
        return res.status(err.statusCode).json({
            type: err.type,
            message: err.message
        });
    }

    return res.status(500).json({
        type: 'InternalServerError',
        message: 'Something went wrong!'
    });
};
module.exports = { errorHandler };