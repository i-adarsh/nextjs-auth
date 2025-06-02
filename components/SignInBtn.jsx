"use client";

import Image from "next/image";

import { signIn } from "next-auth/react";

export default function SignInBtn() {
  return (
    <button onClick={() => signIn("google", { callbackUrl: "/dashboard" })} className="flex align-middle justify-center items-center gap-4 shadow-lg mt-3 rounded-lg pl-3">
      <Image alt={"logo"} src={"/google-logo.png"} height="30" width="30" />
      <span className="px-4 py-3 rounded-lg overflow-hidden">
        Sign in with Google
      </span>
    </button>
  );
}