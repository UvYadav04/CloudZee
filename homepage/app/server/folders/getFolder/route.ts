import pool from "@/lib/Database/db"; // Assuming `pool` is configured using the postgrs package
import { NextRequest, NextResponse } from "next/server";

// Export the GET method
export async function GET(req: NextRequest) {
    try {
        // Extract query parameters
        const folderId = req.nextUrl.searchParams.get("folderId");
        const userId = req.nextUrl.searchParams.get("userId");

        const response = await fetch('http://localhost:5000/folders/openFolder', {
            method: "POST",
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({ userId: userId, folderId: folderId })

        })

        const data = await response.json()
        if (!data.success)
            return NextResponse.json({ success: false, message: "server error" })
        return NextResponse.json({ success: true, data: data })
    } catch (err) {
        console.error("Database query failed:", err);
        return NextResponse.json({ success: false, message: "Database fetch failed" }, { status: 500 });
    }
}
