"use client";

import Link from "next/link";
import SignInBtn from "./SignInBtn";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn, signOut, useSession } from "next-auth/react";

export default function LoginForm() {

    const [email, setemail] = useState("");
    const [password, setpassword] = useState("");
    const [error, setError] = useState("");

    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!email || !password) {
            setError("Please fill all the fields");
            return;
        }
        try {
            const res = await signIn("credentials", {
                email,
                password,
                redirect: false,
            });
            if (res.error) {
                setError("Invalid credentials", res.error);
                return;
            }
            if (res.ok) {
                const form = e.target;
                form.reset();
                router.push("/dashboard");
            }
            else {
                setError("Something went wrong");
                console.log("Something went wrong, user login failed");
            }
            } catch (error) {
            setError(error.message);
        }
    }
    

    return (
        <div className="grid place-items-center -mt-52 h-screen">
            <div className="shadow-lg p-5 rounded-lg border-t-4 border-blue-400">
                <h1 className="text-xl font-bold text-center my-4">Login</h1>
                <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                    <input onChange={(e) => setemail(e.target.value)} value={email} type="email" placeholder="Email" />
                    <input onChange={(e) => setpassword(e.target.value)} value={password} type="password" placeholder="Password" />
                    <button className="bg-blue-500 hover:bg-blue-600 text-white text-lg py-2 px-4 rounded cursor-pointer">Login</button>
                </form>
                <div className="flex flex-col gap-3 mt-2">
                <SignInBtn />
                    {
                        error && (
                            <div className="bg-red-500 text-white w-fit text-sm py-1 px-3 rounded-md mt-2">{error}</div>
                        )
                    }
                    <Link className="text-sm mt-3 text-right" href={"/register"}>Don&apos;t have an account? <span className="underline hover:text-blue-600">Register</span></Link>
                </div>
            </div>
        </div>
    );
}