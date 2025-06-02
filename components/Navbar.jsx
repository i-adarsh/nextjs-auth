"use client";

import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";

export default function Navbar() {
  const { status } = useSession();

  return (
    <div className="flex justify-between items-center p-4 shadow-md rounded-2xl mb-4 md:mb-8">
      <Link className="text-2xl font-semibold text-indigo-950" href={"/"}>
        DevOps HQ
      </Link>
      {status === "authenticated" ? (
        <button
          onClick={() => signOut()}
          className="bg-slate-900 text-white px-6 py-2 rounded-md text-xl">
        Sign Out
      </button>
      ) : (
          <button
            onClick={() => signIn("google")}
            className="bg-slate-900 text-white px-6 py-2 rounded-md text-xl">
        Sign In
      </button>
      )}
    </div>
  );
}
