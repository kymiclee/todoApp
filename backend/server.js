//imports
const dotenv = require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo');
// const passport = require('passport');
// const crypto = require('crypto');

// importing models
const todoItem = require('./models/todoItem')
const todoList = require('./models/todoList')
const user = require('./models/users')

// importing routes
const todoRoutes = require('./routes/todoItem')

//Express Setup
const app = express()
app.use(express.json());

// Session Setup 
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 60000 }
}))

// Mongoose Connection 
const dbUrl = process.env.MONGO_URI
mongoose.connect(dbUrl)
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));



// //passport configuration
// app.use(passport.initialize());
// app.use(passport.session())
// passport.serializeUser(function (user, cb) {
//     process.nextTick(function () {
//         return cb(null, {
//             i: user.id, d
//             username: user.username,
//         });
//     });
// });

// passport.deserializeUser(function (user, cb) {
//     process.nextTick(function () {
//         return cb(null, user);
//     });
// });
//routes
app.use('/api/todo', todoRoutes)


const port = process.env.PORT || 3000
app.listen(port, () => {
    console.log(`todoApp listening on port ${port}`)
})