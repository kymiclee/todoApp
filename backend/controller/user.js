
const users = require('../models/users')
const bcrypt = require('bcrypt');

module.exports.register = async (req, res) => {
    // Logic to create a new user account
    const { username, password } = req.body
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log(hashedPassword)
    try {
        const newUser = await users.create({ username, password: hashedPassword })
        console.log(newUser)
        // sets up session with userId and username
        req.session.userId = newUser._id
        req.session.username = username
        req.session.save()
        return res.status(200).json({ message: 'Registration successful', user: newUser })
    } catch (error) {
        return res.status(400).json({ error: error.message })
    }
}

module.exports.login = async (req, res, next) => {
    // Logic to authenticate a user
    console.log('session regenerate')
    req.session.regenerate(function (err) {
        if (err) return next(err)
        req.session.user = req.user
        req.session.save(function (err) {
            if (err) return next(err)
            //with passport middleware, the req.user is the user's object 
            return res.json({ message: 'Login successful', user: req.user });
        })
    })
}


module.exports.logout = async (req, res, next) => {
    // Logic to logout user
    req.session.save(function (err) { // apply the changes before user logs out 
        if (err) next(err)
    })
    req.session.user = null// removing user related information from session 
    req.session.save(function (err) { // apply the changes 
        if (err) next(err)

        req.session.regenerate(function (err) { // creates new session 
            if (err) next(err)
            return res.json({ message: 'Successfully logged out ', user: null })
        })
    })
}