"use client";

import { useSession } from "next-auth/react";
import { signOut } from "next-auth/react";
import Image from "next/image";
import LoginForm from "./LoginForm";

export default function UserInfo() {
  const { status, data: session } = useSession();
  
  if (status === "authenticated") {
    return (
      <div className="shadow-xl p-8 rounded-md flex flex-col gap-3 items-center bg-slate-100">
        {session.user.image && (
          <Image src={session.user.image} alt={session.user.name} height="50" width="50" className="rounded-full" />
        )}
        <p className="text-xl mt-2">{session.user.name}</p>
        <p>{session.user.email}</p>
        <button onClick={() => signOut()} className="bg-red-600 text-white px-6 py-2 rounded-md text-xl">Logout</button>
      </div>
    );
  } else {
    return <LoginForm />
  }
  
}
