// @ts-nocheck
const express = require('express')
const router = express.Router()
const passport = require('passport');
const { isUsernameUsed } = require('../middleware/userMiddleware.js')

const { register, login, logout } = require('../controller/user')
// Register a new user
router.post('/users/register', isUsernameUsed, register);

// Login a user with local stragegy 
router.post('/users/login', passport.authenticate('local'), login);


// // Change user password
// router.put('/password', async (req, res) => {
//     // Logic to change user password
// });

// Logout user 
router.post('/users/logout', logout);

module.exports = router;

