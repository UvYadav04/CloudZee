const pool = require('../Database/db')
const verifyingOfficer = async (req, res, next) => {
    try {
        const { userId, folderId } = req.body
        const userdata = await pool.query(`Select * from users where id = $1`, [userId])
        if (userdata.rows.length == 0)
            return res.json({ success: false, message: "User authentication failed" })
        const folderdata = await pool.query(`select * from folders where id=$1`, [folderId])

        if (folderdata.rows.length == 0)
            return res.json({ success: false, message: "No such folder exists" })

        if (folderdata.rows[0].owner_id !== userId)
            return res.json({ success: false, message: "Tampering with url info" })

        next()
    }
    catch (error) {
        console.log(error)
        return res.json({ success: false, message: "It's not you it's us" })

    }
}


module.exports = verifyingOfficer