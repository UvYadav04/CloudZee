const pool = require('../Database/db')
const createNewFolder = async (req, res) => {
    try {
        const { folderId, userId, foldername } = req.body

        const foldersnames = await pool.query(`select child.folder_name as name from folders as parent join folders as child on child.id = ANY(parent.childern) where child.folder_name = $1 AND parent.id = $2`, [foldername, folderId])

        if (foldersnames.rows.length > 0)
            return res.json({ success: false, message: "folder already exists" })

        const newfolder = await pool.query("Insert into folders (FOLDER_NAME,PARENT_FOLDER_ID,OWNER_ID,TYPE) VALUES($1,$2,$3,$4) RETURNING *", [foldername, folderId, userId, 'folder'])

        await pool.query("Update folders set childern = array_append(childern,$1::UUID) where id = $2   ", [newfolder.rows[0].id, folderId])

        await pool.query("UPDATE USERS SET folders = array_append(folders, $1:: UUID) WHERE id = $2", [newfolder.rows[0].id, userId]);

        return res.json({ success: true, message: "something went wrong" })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: "something went wrong" })
    }
}

const renameFolder = async (req, res) => {
    try {
    } catch (error) {
        res.json({ success: false, message: "something went wrong" })
    }
}

const openFolder = async (req, res) => {
    try {
        console.log(req.body)
        const { folderId } = req.body
        const data = await pool.query('select * from folders as parent join folders as child ON child.id = ANY(parent.childern) where parent.id = $1', [folderId])
        console.log(data.rows)

        return res.json({ success: true, data: data.rows })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: "something went wrong" })
    }
}

const deleteFolder = async (req, res) => {
    try {

    } catch (error) {
        res.json({ success: false, message: "something went wrong" })
    }
}

module.exports = { createNewFolder, renameFolder, deleteFolder, openFolder }