import { db } from "@vercel/postgres";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    const client = await db.connect()

    try {
        await client.sql`CREATE TABLE IF NOT EXISTS Todos(id serial, Task varchar(255))`
        return NextResponse.json({message:"Todos Table created With Two Fields Id and Task"}); 
    } catch (error) {
        return NextResponse.json({message: "something went wrong"})
    }


}