import pool from "@/lib/Database/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    try {
        console.log("In the request");

        const email = req.nextUrl.searchParams.get("email");
        const mac = req.nextUrl.searchParams.get("macAddress");

        // if (!email || !mac) {
        //     return NextResponse.json({ success: false, message: "Email or macAddress is missing" });
        // }

        const response = await fetch(`http://localhost:8080/user/getUserWithId/email=${email}/macAddress=${mac}`);
        const data = await response.json();

        console.log(data);

        if (data?.success) {
            return NextResponse.json({ success: true, data: data });
        } else {
            return NextResponse.json({ success: false, message: "Failed to fetch user data" });
        }
    } catch (error) {
        console.log("Here in the error")
        console.error(error);
        return NextResponse.json({ success: false, message: "Failed to fetch data from server yellow" });
    }
}
