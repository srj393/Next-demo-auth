import { connect } from "@/dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModels";


connect()

export default async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json()
        const {token} = reqBody
        console.log(token)
        // 24.21
    } catch (error:any) {
        return NextResponse.json({error:error.messageess},{status:500})
    }
}