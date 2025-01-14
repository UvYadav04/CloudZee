import pool from "@/lib/Database/db";
import { NextResponse } from "next/server";

export async function GET(req) {
    try {

    } catch (error: any) {
        console.log(error)
        NextResponse.json({ success: false, message: error.message })
    }
}