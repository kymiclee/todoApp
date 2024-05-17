// @ts-nocheck
const { CustomError } = require('./customError');

const user = require('../models/users')

const isUsernameUsed = async (req, res, next) => {
    const { username } = req.body;
    try {
        const name = await user.findOne({ username });
        if (name) {
            throw new CustomError('Username already used', 400, 'register');
        } else {
            next();
        }
    } catch (error) {
        next(error);
    }
};


const isLoggedIn = async (req, res, next) => {
    if (req.session.user) {
        next()
    } else {
        next(new CustomError('User is not logged in', 401, 'auth'))
    }
}

module.exports = { isLoggedIn, isUsernameUsed }