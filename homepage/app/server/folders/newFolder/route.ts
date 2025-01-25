import pool from "@/lib/Database/db";
import { NextURL } from "next/dist/server/web/next-url";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    try {
        const parentId = req.nextUrl.searchParams.get('parentId')
        const userId = req.nextUrl.searchParams.get('userId')
        const folderName = req.nextUrl.searchParams.get('folderName')

        const parent = await pool.query("SELECT * FROM FOLDERS where id = $1", [parentId])

        const newfolder = await pool.query("Insert into folders (FOLDER_NAME,PARENT_FOLDER_ID,OWNER_ID,TYPE) VALUES($1,$2,$3,$4) RETURNING *", [folderName, parentId, userId, 'folder'])
        const newdata = await pool.query("Update folders set childern = array_append(childern,$1::UUID) where id = $2 RETURNING *", [newfolder.rows[0].id, parentId])
        await pool.query("UPDATE USERS SET folders = array_append(folders, $1:: UUID) WHERE id = $2", [newfolder.rows[0].id, userId]);

        let data = newdata.rows
        data.push(parent.rows[0])

        return NextResponse.json({ success: true, newfolder, data })
    } catch (error: any) {
        console.log(error)
        return NextResponse.json({ success: false, message: error.message })
    }
}