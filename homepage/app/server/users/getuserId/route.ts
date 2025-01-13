import pool from "@/lib/Database/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    try {
        // console.log("got a request")
        const email = req.nextUrl.searchParams.get('email')
        const name = req.nextUrl.searchParams.get('name')
        // console.log("in the server emai : ", email)
        const userdetails = await pool.query("SELECT * FROM users WHERE email = $1", [email]);

        if (userdetails.rows.length == 0) {
            const res = await pool.query(
                'INSERT INTO USERS (EMAIL, NAME) VALUES($1, $2) RETURNING *',
                [email, name]
            );
            // console.log(res.rows[0])
            const home = await pool.query(`INSERT INTO FOLDERS (FOLDER_NAME,PARENT_FOLDER_ID,OWNER_ID) VALUES($1,$2,$3) RETURNING *`, ["HOME", null, res.rows[0].id])
            // console.log(home.rows[0])
            // console.log("want o tinser  : ", home.rows[0].id)
            // console.log(res.rows[0])
            // console.log(home.rows[0])
            await pool.query("UPDATE USERS SET HOME_ID = $1 WHERE ID = $2 RETURNING *", [home.rows[0].id, res.rows[0].id]);
            await pool.query("UPDATE USERS SET folders = array_append(folders, $1:: UUID) WHERE id = $2", [home.rows[0].id, res.rows[0].id]);
            const userid = res.rows[0].id;
            const homeid = home.rows[0].id;
            return NextResponse.json({ success: true, userid, homeid })
        }
        // console.log(userdetails.rows[0].id);
        const userid = userdetails.rows[0].id;
        const homeid = userdetails.rows[0].home_id;
        return NextResponse.json({ success: true, userid, homeid })

    } catch (error) {
        console.log(error)
    }
}