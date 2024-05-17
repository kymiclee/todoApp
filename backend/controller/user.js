
const users = require('../models/users')
const bcrypt = require('bcrypt');
const { CustomError } = require("../middleware/customError");

module.exports.register = async (req, res, next) => {
    console.log('register')
    // Logic to create a new user account
    const { username, password } = req.body
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log(hashedPassword)
    try {
        const newUser = await users.create({ username, password: hashedPassword })
        console.log(newUser)
        req.session.userId = newUser._id
        req.session.username = username
        req.session.save()
        console.log('req session: ', req.session)
        return res.status(200).json({ message: 'Registration successful', user: newUser })
    } catch (error) {
        next(new CustomError(error.message, 500, 'register'))
    }
}

module.exports.login = async (req, res, next) => {
    // Logic to authenticate a user

    console.log('session regenerate')
    req.session.regenerate(function (err) {
        if (err) return next(new CustomError(err.message, 500, 'login'))

        const sessionUser = {
            id: req.user._id,
            username: req.user.username
        };

        req.session.user = sessionUser;
        console.log('logging in req session: ', req.session)
        //with passport middleware, the req.user is the user's object 
        return res.status(200).json({ message: 'Login successful', user: req.user });
        // })
    })
}



module.exports.logout = async (req, res, next) => {
    // Logic to logout user
    if (req.session) {
        console.log('session destroy')
        req.session.destroy(err => {
            if (err) {
                // return res.status(400).send('Unable to log out')
                next(new CustomError(err.message, 500, 'logout'))
            } else {
                return res.json({ message: 'Successfully logged out ' })
            }
        });
    } else {
        return res.end()
    }
}