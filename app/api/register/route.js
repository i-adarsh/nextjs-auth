import { NextResponse } from "next/server";
import { connectMongoDB } from "../../../lib/mongodb";
import User from "@/model/user";
import bcrypt from "bcryptjs";

export async function POST(request) {
    try {
        const { name, email, password } = await request.json();
        const hashedPassword = await bcrypt.hash(password, 10);
        
        await connectMongoDB();
        
        await User.create({
            name,
            email,
            password: hashedPassword,
        });

        return NextResponse.json({ message: "User Registered Successfully" }, { status: 201 });
    }
    catch (error) {
        console.log(error);
        return NextResponse.json({ message: "Something Went Wrong" }, { status: 500 });
    }
}
