import { NextResponse } from "next/server";
import { connectMongoDB } from "../../../lib/mongodb";
import User from "@/model/user";

export async function POST(request) {
    try {
        await connectMongoDB();
        const {email} = await request.json();
        const user = await User.findOne({ email }).select("_id");
        console.log("user", user);
        return NextResponse.json({ user: user });
    }
    catch (error) {
        console.log("error", error);
        return NextResponse.json({ error: error });
    }
}
