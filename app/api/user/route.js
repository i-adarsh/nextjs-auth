import { connectMongoDB } from "@/lib/mongodb"
import User from "@/model/user";
import { NextResponse } from "next/server";


export async function POST(request) {
    const {name, email} = await request.json()
    console.log(name, email)
    await connectMongoDB();
    await User.create({name, email})
    return NextResponse.json({ message: "User created" }, { status: 201 });
}

export async function GET() {
    await connectMongoDB();
    const users = await User.find({});
    return NextResponse.json(users);
}