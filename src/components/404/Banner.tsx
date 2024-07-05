import React from "react";
import Link from "next/link";

const Banner = () => {
  return (
    <main className="h-screen w-full flex flex-col justify-center items-center bg-[#1A2238]">
      <h1 className="text-9xl text-gradient font-extrabold text-white tracking-widest">
        OOPS!
      </h1>
      <div className="bg-slate-700 px-2 text-slate-300 text-lg rounded rotate-12 absolute">
        Page Not Found
      </div>
      <button className="mt-20">
        <div className="relative inline-block text-xl font-bold shiny-btn focus:outline-none focus:ring">
          <span className="relative block px-8 py-3 border border-current">
            <Link href="/">Go Home</Link>
          </span>
        </div>
      </button>
    </main>
  );
};

export default Banner;
