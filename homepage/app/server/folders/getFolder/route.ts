
import pool from "@/lib/Database/db";
import { NextRequest, NextResponse } from "next/server";
// Export the GET method
export async function GET(req: NextRequest) {
    try {
        const folderId = req.nextUrl.searchParams.get('folderId')
        const userID = req.nextUrl.searchParams.get('userId')
        const userdetails = await pool.query("SELECT * FROM USERS WHERE ID = $1", [userID])
        if (userdetails.rows.length == 0)
            return NextResponse.json({ success: false, message: "user not found" }); // Return rows as JSON

        const result = await pool.query('SELECT * FROM folders WHERE ID = $1', [folderId]);
        if (result.rows.length == 0)
            return NextResponse.json({ success: false, message: "folder not found" }); // Return
        if (result.rows[0].owner_id != userID)
            return new Response("User mis configuration", { status: 404 });
        return NextResponse.json({ success: true, data: result.rows[0] }); // Return rows as JSON
    } catch (err) {
        console.error('Database query failed:', err);
        return NextResponse.json({ success: false, message: "Database fetch failed" }); // Return rows as JSON
    }
}