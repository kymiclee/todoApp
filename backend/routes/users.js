// @ts-nocheck
const express = require('express')
const router = express.Router()
const users = require('../models/users')
const bcrypt = require('bcrypt');


// Register a new user
router.post('/register', async (req, res) => {
    // Logic to create a new user account
    const { username, password } = req.body
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await users.create({ username, hashedPassword })

    // sets up session with userId and username
    req.session.userId = newUser._id
    req.session.username = username
    req.session.save()
    return res.json({ message: 'Registration successful', user: newUser })

});

// Login a user
router.post('/login', passport.authenticate('local'), async (req, res) => {
    // Logic to authenticate a user

    req.session.regenerate(function (err) {
        if (err) return next(err)
        req.session.user = req.user
        req.session.save(function (err) {
            if (err) return next(err)
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
    req.session.user = null
    req.session.save(function (err) {
        if (err) next(err)

        req.session.regenerate(function (err) {
            if (err) next(err)
            return res.json({ message: 'Successfully logged out ', user: null })
        })
    })
});