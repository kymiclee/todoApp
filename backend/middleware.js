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
        next(error)
    }
}

module.exports.isLoggedIn = async (req, res, next) => {
    if (req.session.user) {
        next()
    } else {
        return res.status(200).json({ message: 'User is not logged in' })
    }
}
