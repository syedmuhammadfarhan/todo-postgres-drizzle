import { NextRequest, NextResponse } from "next/server";
import {db, todoTable } from "@/lib/drizzle"
import { sql } from "@vercel/postgres"
import { eq } from "drizzle-orm";



export async function GET(request: NextRequest,) {
   
    try {
        await sql`CREATE TABLE IF NOT EXISTS Todos(id serial primary key, Task varchar(255))`

        const resGET = await db.select().from(todoTable)
        return NextResponse.json(resGET);        
    } catch (error) {
        console.log((error as {message: string}).message)
        return NextResponse.json({message: (error as {message: string}).message})
    }
    
}


export async function POST(request: NextRequest) {
    const req = await request.json()
  
    try {
        if (req.task) {
            const resPOST = await db.insert(todoTable).values(
            {
                task: req.task,
            }).returning()
            return NextResponse.json({ message: "Data added successfully" })
        } else {
            throw new Error("Task field is required")
        }
        
    } catch (error) {
        return NextResponse.json({message: (error as {message: string}).message})
        
    }

}