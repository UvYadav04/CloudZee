import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
// // import pool from "./lib/Database/db";
// export const config = {
//     matcher: ["/server/:path*", "/home"],
//     runtime: 'nodejs'
// };

// import { neon } from '@neondatabase/serverless';
// const pool = neon(process.env.DATABASE_URL);

export async function middleware(request: NextRequest) {
    const origin = request.nextUrl.origin
    console.log(request.nextUrl)

    const allowedOrigins = [
        'https://cloudzee.vercel.app', // Replace with your front-end domain
        'http://localhost:3000',       // Localhost for development
    ]

    // Handle preflight request (OPTIONS method)
    // if (request.method === 'OPTIONS') {
    //     const response = NextResponse.next()
    //     response.headers.set('Access-Control-Allow-Origin', origin)
    //     response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE')
    //     response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization')
    //     response.headers.set('Access-Control-Max-Age', '86400') // Cache preflight request
    //     return response
    // }

    // If origin is allowed, set CORS headers for all other methods (GET, POST, etc.)
    if (allowedOrigins.includes(origin)) {
        const response = NextResponse.next()
        response.headers.set('Access-Control-Allow-Origin', origin)
        response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE')
        response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization')
        console.log("hereajf;lahsdfj")
        return response
    }

    // If origin is not allowed, just return the next response
    return NextResponse.next()
}

export const config = {
    matcher: '/server/:path*', // Apply middleware to API routes only
}

//     console.log("Middleware triggered for:", request.nextUrl.pathname);

//     if (request.nextUrl.pathname === "/server/files/uploadFile") {
//         const userId = request.nextUrl.searchParams.get("userId");
//         const parentId = request.nextUrl.searchParams.get("parentId");

//         if (!userId || !parentId) {
//             return new Response(
//                 JSON.stringify({ success: false, message: "Missing userId or parentId" }),
//                 { status: 400, headers: { "Content-Type": "application/json" } }
//             );
//         }

//         try {
//             // Check if the user exists
//             const userDetails = await pool`
//         SELECT * FROM users WHERE id = ${userId}`;
//             if (userDetails.length === 0) {
//                 return new Response(
//                     JSON.stringify({ success: false, message: "User not found" }),
//                     { status: 404, headers: { "Content-Type": "application/json" } }
//                 );
//             }

//             // Check if the folder exists
//             const folderDetails = await pool`
//         SELECT * FROM folders WHERE id = ${parentId}`;
//             if (folderDetails.length === 0) {
//                 return new Response(
//                     JSON.stringify({ success: false, message: "Folder not found" }),
//                     { status: 404, headers: { "Content-Type": "application/json" } }
//                 );
//             }

//             // Check if the folder belongs to the user
//             if (folderDetails[0].owner_id !== userId) {
//                 return new Response(
//                     JSON.stringify({ success: false, message: "User misconfiguration: Not the owner" }),
//                     { status: 403, headers: { "Content-Type": "application/json" } }
//                 );
//             }
//         } catch (error) {
//             console.error("Database error:", error);
//             return new Response(
//                 JSON.stringify({ success: false, message: "Internal server error" }),
//                 { status: 500, headers: { "Content-Type": "application/json" } }
//             );
//         }
//     }

//     // Example for another route
//     else if (request.nextUrl.pathname === "/server/folders/getFolder") {
//         const userId = request.nextUrl.searchParams.get("userId");

//         if (!userId) {
//             return new Response(
//                 JSON.stringify({ success: false, message: "Missing userId" }),
//                 { status: 400, headers: { "Content-Type": "application/json" } }
//             );
//         }

//         try {
//             const userDetails = await pool`
//         SELECT * FROM users WHERE id = ${userId}`;
//             if (userDetails.length === 0) {
//                 return new Response(
//                     JSON.stringify({ success: false, message: "User not found" }),
//                     { status: 404, headers: { "Content-Type": "application/json" } }
//                 );
//             }
//         } catch (error) {
//             console.error("Database error:", error);
//             return new Response(
//                 JSON.stringify({ success: false, message: "Internal server error" }),
//                 { status: 500, headers: { "Content-Type": "application/json" } }
//             );
//         }
//     }

//     // Pass the request to the next middleware or handler
//     const response = NextResponse.next();
//     response.headers.set("X-Custom-Header", "Middleware active");
//     return response;
// }

// // Configuration to apply middleware to specific paths
