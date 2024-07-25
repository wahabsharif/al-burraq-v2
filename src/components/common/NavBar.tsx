"use client";

import React, { useState } from "react";
import Image from "next/image";
import Logo from "@/assets/images/logo/al-burraq-logo-landscape-dark.svg";
import Link from "next/link";
import { HiBars3CenterLeft } from "react-icons/hi2";
import { RxCross2 } from "react-icons/rx";
import { motion } from "framer-motion";

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => setIsOpen(!isOpen);
  return (
    <header>
      <nav className="navbar fixed top-0 left-0 right-0 w-full max-w-screen-xl mx-auto text-white bg-black mt-4 shadow-md rounded-xl bg-opacity-80 backdrop-blur-2xl backdrop-saturate-200 lg:px-8 lg:py-4 z-50">
        <div className="navbar-start">
          <div className="dropdown">
            <button
              onClick={toggleDropdown}
              className="text-2xl p-3 shadow bg-base-100 rounded-full"
            >
              <motion.div
                initial={{ rotate: 0 }}
                animate={{ rotate: isOpen ? 180 : 0 }}
                transition={{ duration: 0.3 }}
              >
                {isOpen ? <RxCross2 /> : <HiBars3CenterLeft />}
              </motion.div>
            </button>
            {isOpen && (
              <ul
                tabIndex={0}
                className="menu menu-lg dropdown-content bg-base-100 rounded-box z-[10000] mt-3 w-52 p-2 shadow fixed"
              >
                <li className="tracking-in-expand">
                  <Link href="/">Home</Link>
                </li>
                <li className="tracking-in-expand">
                  <Link href="/about">About Us</Link>
                </li>
                <li className="tracking-in-expand">
                  <Link href="/rent">Rent</Link>
                </li>
                <li className="tracking-in-expand">
                  <Link href="/buy">Buy</Link>
                </li>
                <li className="tracking-in-expand">
                  <Link href="/blogs">Blogs</Link>
                </li>
                <li className="tracking-in-expand">
                  <Link href="/contact">Contact</Link>
                </li>
                <li className="tracking-in-expand">
                  <button
                    className="lg:hidden select-none rounded-lg grad-bg px-4 py-2.5 text-center align-middle font-sans text-sm font-bold uppercase text-slate-900 shadow-md shadow-gray-900/10 transition-all hover:shadow-lg hover:shadow-gray-900/20 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                    type="button"
                  >
                    <Link href="#">Instant Call</Link>
                  </button>
                </li>
              </ul>
            )}
          </div>
        </div>

        <div className="navbar-center lg:mx-auto lg:w-auto w-full flex justify-center lg:justify-start">
          <Link href={"/"}>
            <Image
              className="logo-shadow tracking-in-expand"
              src={Logo}
              alt="al-burraq-logo"
              width={120}
              style={{
                maxWidth: "100%",
                height: "auto",
              }}
            />
          </Link>
        </div>
        <div className="navbar-end">
          <div className="flex items-center gap-x-1">
            <button
              className="hidden shiny-btn select-none rounded-lg grad-bg px-4 py-2.5 text-center align-middle font-sans text-md font-extrabold uppercase text-slate-900 shadow-md shadow-gray-900/10 transition-all hover:shadow-lg hover:shadow-gray-900/20 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none lg:inline-block tracking-in-expand"
              type="button"
            >
              <Link href={"#"}>Instant Call</Link>
            </button>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default NavBar;
