// import bg from "@/images/castle-heights/castle-heights-banner.webp";
import Link from "next/link";
import React from "react";

const Banner = ({ title = "", page = "", parent = "", parentHref = "/" }) => {
  return (
    <section className="page-banner">
      <div
        className="hero min-h-screen"
        style={{
          backgroundImage: "url(/images/internal-banner.jpg)",
        }}
      >
        <div className="hero-overlay bg-opacity-60"></div>
        <div className="px-10 text-center bg-black shadow-md p-4 rounded-xl bg-opacity-80 backdrop-blur-2xl backdrop-saturate-90">
          <h1 className="text-gradient text-6xl">{title}</h1>
          <div className="flex justify-center">
            <ul className="text-xl relative text-center flex space-x-4">
              <li>
                <Link href="/">Home</Link>
              </li>
              {parent && (
                <li>
                  <Link href={parentHref} legacyBehavior>
                    {parent}
                  </Link>
                </li>
              )}
              <li className="text-darkGold">{page || title}</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Banner;
