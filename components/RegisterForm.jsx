"use client";

import Link from "next/link";
import SignInBtn from "./SignInBtn";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function RegisterForm() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const router = useRouter();
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!name || !email || !password) {
            setError("Please fill all the fields");
            return;
        }
        try {

            const userExists = await fetch("/api/userExists", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email }),
            });

            const { user }  = await userExists.json();
            
            if (user) {
                setError("User already exists");
                return;
            }
            
            const res = await fetch("/api/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ name, email, password }),
            });
            if (res.ok) {
                const form = e.target;
                form.reset();
                router.push("/dashboard");
            }
            else {
                setError("Something went wrong");
                console.log("Something went wrong, user registration failed");
            }
        } catch (error) {
            setError(error.message);
        }
    }

    return (
        <div className="grid place-items-center h-screen">
            <div className="shadow-lg p-5 rounded-lg border-t-4 border-blue-400">
                <h1 className="text-xl font-bold text-center my-4">Register</h1>
                <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                    <input onChange={(e) => setName(e.target.value)} value={name} type="text" placeholder="Full Name" />
                    <input onChange={(e) => setEmail(e.target.value)} value={email} type="email" placeholder="Email" />
                    <input onChange={(e) => setPassword(e.target.value)} value={password} type="password" placeholder="Password" />
                    <button className="bg-blue-500 hover:bg-blue-600 text-white text-lg py-2 px-4 rounded cursor-pointer">Register</button>
                </form>
                <div className="flex flex-col gap-3 mt-2">
                    <SignInBtn />
                    {
                        error && (
                            <div className="bg-red-500 text-white w-fit text-sm py-1 px-3 rounded-md mt-2">
                                {error}
                            </div>
                        )
                    }
                <Link className="text-sm mt-3 text-right" href={"/"}>Already have an account? <span className="underline hover:text-blue-500">Login</span></Link>
                </div>
            </div>
        </div>
    );
}