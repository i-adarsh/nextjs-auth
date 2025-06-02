import Link from "next/link";

export default function Navbar() {
  return (
    <div className="flex justify-between items-center p-4 shadow-md rounded-2xl mb-4 md:mb-8">
      <Link className="text-2xl font-semibold text-indigo-950" href={"/"}>
        DevOps HQ
      </Link>
      <button className="bg-slate-900 text-white px-6 py-2 rounded-md text-xl">
        Sign In
      </button>
    </div>
  );
}
