// @ts-nocheck
const user = require('./models/users')
module.exports.isUsernameUsed = async (req, res, next) => {
    const { username } = req.body
    try {
        const name = await user.findOne({ username })
        if (name) {// if it exist
            return res.status(400).json({ error: 'Username already used' })
        } else {
            next();
        }
    } catch (error) {
        return res.status(400).json({ error: error.message })
    }
}

module.exports.isLoggedIn = async (req, res, next) => {
    if (req.isAuthenticated()) {// using passport function here to verify presense of req.user
        next()
    } else {
        return res.status(400).json({ message: 'User is not logged in' })
    }
}
