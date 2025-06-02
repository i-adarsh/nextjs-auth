import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import User from "@/model/user";
import bcrypt from "bcryptjs";
import CredentialsProvider from "next-auth/providers/credentials";
import { connectMongoDB } from "@/lib/mongodb"

const authOptions = {
    providers: [
        CredentialsProvider({
            name: "credentials",
            credentials: {},
            async authorize(credentials, req) {
                const { email, password } = credentials;
                try {
                    await connectMongoDB();
                    const user = await User.findOne({ email });
                    if (!user) {
                        return null;
                    }
                    const isPasswordCorrect = await bcrypt.compare(
                        password,
                        user.password
                    );
                    if (!isPasswordCorrect) {
                        return null;
                    }
                    return user;
                } catch (error) {
                    console.log("error", error);
                    return null;
                }
            },
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        }),
    ],
    session: {
        strategy: "jwt",
    },
    secret: process.env.NEXTAUTH_SECRET,
    pages: {
        signIn: "/",
    },
    // callbacks: {
    //     async signIn({ user, account }) {
    //         console.log("user", user);
    //         console.log("account", account);
            
    //         return user;
    //     },
    // },
};

const handler = NextAuth(authOptions);

export {handler as GET, handler as POST};