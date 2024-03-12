const dotenv = require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const todoRoutes = require('./routes/todoRoute')

const app = express()


mongoose.connect(process.env.MONGO_URI);

app.get('/', (req, res) => {
    res.send('Hello World')
})

app.use('/api/todo', todoRoutes)

const port = process.env.PORT || 3000
app.listen(port, () => {
    console.log(`todoApp listening on port ${port}`)
})