// @ts-nocheck
const express = require('express')
const router = express.Router()
const users = require('../models/users')
const bcrypt = require('bcrypt');
const passport = require('passport');

// Register a new user
router.post('/register', async (req, res) => {
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
    c

});

// Login a user with local stragegy 
router.post('/login', passport.authenticate('local'), async (req, res) => {
    // Logic to authenticate a user

    req.session.regenerate(function (err) {
        if (err) return next(err)
        req.session.user = req.user
        req.session.save(function (err) {
            if (err) return next(err)
            //with passport middleware, the req.user is the user's object 
            return res.json({ message: 'Login successful', user: req.user });
        })
    })
    // 

});


// Change user password
router.put('/password', async (req, res) => {
    // Logic to change user password
});

// Logout user 
router.post('/logout', async (req, res) => {
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
});

module.exports = router;