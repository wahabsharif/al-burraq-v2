import Link from "next/link";
import React from "react";

const Banner = ({ title = "", page = "", parent = "", parentHref = "/" }) => {
  return (
    <section className="page-banner">
      <div
        className="hero min-h-screen bg-cover bg-center"
        style={{
          backgroundImage: "url(/images/internal-banner.jpg)",
        }}
      >
        <div className="hero-overlay bg-opacity-60"></div>

        {/* Blur Card */}
        <div className="px-6 sm:px-10 lg:px-16 text-center bg-black shadow-md p-4 rounded-xl bg-opacity-80 backdrop-blur-2xl backdrop-saturate-90 mx-auto max-w-4xl">
          <h1 className="text-gradient text-4xl sm:text-5xl md:text-6xl">
            {title}
          </h1>
          <div className="flex justify-center mt-4">
            <ul className="text-sm sm:text-base md:text-xl flex space-x-2 sm:space-x-4">
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
