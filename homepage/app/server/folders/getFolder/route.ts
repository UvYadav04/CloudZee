import pool from "@/lib/Database/db"; // Assuming `pool` is configured using the postgrs package
import { NextRequest, NextResponse } from "next/server";

// Export the GET method
export async function GET(req: NextRequest) {
    try {
        // Extract query parameters
        const folderId = req.nextUrl.searchParams.get("folderId");
        const userId = req.nextUrl.searchParams.get("userId");

        // Validate inputs
        if (!folderId || !userId) {
            return NextResponse.json({ success: false, message: "Missing folderId or userId" }, { status: 400 });
        }

        // Query the database
        const result = await pool`
            SELECT * FROM folders WHERE id = ${folderId}
        `;

        // Handle folder not found
        if (result.length === 0) {
            return NextResponse.json({ success: false, message: "Folder not found" }, { status: 404 });
        }

        // Check ownership
        const folder = result[0];
        if (folder.owner_id !== userId) {
            return NextResponse.json({ success: false, message: "User misconfiguration: Not the folder owner" }, { status: 403 });
        }

        // Return success response
        return NextResponse.json({ success: true, data: folder });
    } catch (err) {
        console.error("Database query failed:", err);
        return NextResponse.json({ success: false, message: "Database fetch failed" }, { status: 500 });
    }
}
