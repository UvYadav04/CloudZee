const { pool } = require('../Database/db')

const authenticator = (req, res, next) => {
    // console.log(req)
    const query = req.params
    if (!query.email)
        res.status(200).send({ success: false, message: "No user info found with url, please try again" })
    req.email = query.email
    next()
}

module.exports = authenticator