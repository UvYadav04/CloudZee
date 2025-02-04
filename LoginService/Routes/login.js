const express = require('express')
const loginrouter = express.Router()
const pool = require('../Database/db')

loginrouter.get('/', async (req, res) => {
    try {
        // console.log("in the requst")
        const email = req.email
        const userdetails = await pool.query("SELECT * FROM users WHERE email = $1", [email]);

        if (userdetails.rows.length == 0) {
            const res = await pool.query(
                'INSERT INTO USERS (EMAIL) VALUES($1) RETURNING *',
                [email]
            );
            const home = await pool.query(`INSERT INTO FOLDERS (FOLDER_NAME,PARENT_FOLDER_ID,OWNER_ID) VALUES($1,$2,$3) RETURNING *`, ["HOME", null, res.rows[0].id])
            await pool.query("UPDATE USERS SET HOME_ID = $1 WHERE ID = $2 RETURNING *", [home.rows[0].id, res.rows[0].id]);
            await pool.query("UPDATE USERS SET folders = array_append(folders, $1:: UUID) WHERE id = $2", [home.rows[0].id, res.rows[0].id]);
            const userid = res.rows[0].id;
            const homeid = home.rows[0].id;
            return res.json({ success: true, userid, homeid, home: home.rows[0] })
        }
        const userid = userdetails.rows[0].id;
        const homeid = userdetails.rows[0].home_id;
        const homedetails = await pool.query("Select * from folders where id = $1", [homeid])
        // console.log("ids : ", userid, homeid)
        return res.json({ success: true, userid, homeid, home: homedetails.rows[0] })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: "failed ot fetch user data from server" })
    }
})

module.exports = loginrouter