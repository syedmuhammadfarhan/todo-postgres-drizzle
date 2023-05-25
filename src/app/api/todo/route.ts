import { db } from "@vercel/postgres";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    const client = await db.connect()
    

    try {
        await client.sql`CREATE TABLE IF NOT EXISTS Todos(id serial, Task varchar(255))`
        return NextResponse.json({message:"Todos Table created With Two Fields Id and Task"}); 
    } catch (error) {
        return NextResponse.json({message: (error as {message: string}).message})
    }
    
}


export async function POST(request: NextRequest) {
    const client = await db.connect()
    const req = await request.json()
    
    try {
        if (req.task) {
            await client.sql`INSERT INTO Todos(Task) VALUE(${req.task})`
            
        } else {
            throw new Error("Task field is required")
        }
        
    } catch (error) {
        return NextResponse.json({message: (error as {message: string}).message})
        
    }

}

