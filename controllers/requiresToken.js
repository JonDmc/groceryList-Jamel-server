const jwt = require('jsonwebtoken')
const db = require('../models')

async function requireToken(req, res, next) {
    try {

        const token = req.headers.authorization

        const decoded = jwt.verify(token, process.env.JWT_SECRET)//payload
        console.log(decoded)
        const foundUser = await db.User.findById(decoded.id)
        res.locals.user = foundUser
        next()
    } catch (error) {
        console.log(error)
        res.status(401).json({ msg: 'you are not allowed to be here, move along now' })
    }
}

module.exports = requireToken