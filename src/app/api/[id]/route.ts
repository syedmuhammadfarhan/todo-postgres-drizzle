import { NextRequest, NextResponse } from "next/server";
import {db, todoTable } from "@/lib/drizzle"
import { eq } from "drizzle-orm";


export async function DELETE(request: NextRequest, {params}:{params:{id:number}}) {
       
    try {
        if (params.id) {
        const resDELETE = await db.delete(todoTable).where(eq(todoTable.id, params.id)).returning();
            return NextResponse.json(resDELETE)
        }
    } catch (error) {
        console.log((error as {message: string}).message)
        return NextResponse.json({message: (error as {message: string}).message})
    }
    
}