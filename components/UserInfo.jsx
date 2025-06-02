"use client";

import { useSession } from "next-auth/react";
import SignInBtn from "./SignInBtn";
import Image from "next/image";

export default function UserInfo() {
  const { status, data: session } = useSession();
  
  if (session) {
    return (
       <div className="shadow-xl p-8 rounded-md flex flex-col gap-3 items-center bg-slate-100">
        <Image src={session.user.image} alt={session.user.name} height="50" width="50" className="rounded-full" />
        <p className="text-xl mt-2">{session.user.name}</p>
        {/* <p>{session.user.email}</p> */}
      </div>
    );
  } else {
    return <SignInBtn />;
  }
}
