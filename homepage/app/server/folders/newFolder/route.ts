import pool from "@/lib/Database/db";
import { NextURL } from "next/dist/server/web/next-url";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    try {
        const parentId = req.nextUrl.searchParams.get('parentId')
        const userId = req.nextUrl.searchParams.get('userId')
        const folderName = req.nextUrl.searchParams.get('folderName')
        // console.log(parentId, userId, folderName)
        const userdetails = await pool.query("SELECT * FROM USERS WHERE ID = $1", [userId])
        if (userdetails.rows.length == 0)
            return NextResponse.json({ success: false, message: "fetching failed" }); // Return rows as JSON

        const parent = await pool.query("SELECT * FROM FOLDERS where id = $1", [parentId])
        if (parent.rows.length == 0)
            return NextResponse.json({ success: false, message: "fetching failed" }); // Return rows as JSON
        if (parent.rows[0].owner_id !== userId)
            return NextResponse.json({ success: false, message: "fetching failed" }); // Return rows as JSON

        const newfolder = await pool.query("Insert into folders (FOLDER_NAME,PARENT_FOLDER_ID,OWNER_ID) VALUES($1,$2,$3) RETURNING *", [folderName, parentId, userId])
        await pool.query("Update folders set childern = array_append(childern,$1::UUID) where id = $2", [newfolder.rows[0].id, parentId])
        await pool.query("UPDATE USERS SET folders = array_append(folders, $1:: UUID) WHERE id = $2", [newfolder.rows[0].id, userId]);

        return NextResponse.json({ success: true })
    } catch (error: any) {
        console.log(error)
        return NextResponse.json({ success: false, message: error.message })
    }
}