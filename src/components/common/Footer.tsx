import {
  FaFacebook,
  FaInstagramSquare,
  FaLinkedinIn,
  FaTiktok,
  FaYoutube,
} from "react-icons/fa";
import { FaSquareXTwitter, FaLocationDot } from "react-icons/fa6";

import Link from "next/link";

const Footer = () => {
  return (
    <footer className="block w-full px-4 py-2 mx-auto text-white bg-black shadow-md rounded-xl bg-opacity-80 backdrop-blur-2xl backdrop-saturate-200 lg:px-8 lg:py-4">
      <div className="mx-auto px-4 pb-8 pt-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-md">
          <strong className="block text-center text-xl font-bold text-darkGold sm:text-3xl">
            Want us to email you with the latest blockbuster news?
          </strong>
          <form className="mt-6">
            <div className="relative max-w-lg">
              <label className="sr-only" htmlFor="email">
                Email
              </label>

              <input
                className="w-full rounded-full bg-slate-700 p-4 pe-32 text-sm font-medium dark:bg-gray-800 dark:text-white"
                id="email"
                type="email"
                placeholder="info@alburraqgroup.com"
              />

              <button className="absolute end-1 top-1/2 -translate-y-1/2 rounded-full bg-blue-600 px-5 py-3 text-sm font-medium text-white transition hover:bg-blue-700">
                Subscribe
              </button>
            </div>
          </form>
        </div>

        <div className="mt-16 grid grid-cols-1 lg:grid-cols-2 lg:gap-32">
          <div className="ml-0 align-items-start mx-auto max-w-sm lg:max-w-none">
            <p className="mt-4 text-start text-gray-500 lg:text-left lg:text-lg dark:text-gray-400">
              Your Dream Property <br />
              Our Marketing Expertise.
            </p>

            <div className="mt-6 flex justify-center gap-4 lg:justify-start">
              <Link
                className="text-gray-700 transition hover:text-darkGold "
                href="#"
                target="_blank"
                rel="noreferrer"
              >
                <FaFacebook className="w-8 h-8" />
              </Link>
              <Link
                className="text-gray-700 transition hover:text-darkGold "
                href="#"
                target="_blank"
                rel="noreferrer"
              >
                <FaInstagramSquare className="w-8 h-8" />
              </Link>
              <Link
                className="text-gray-700 transition hover:text-darkGold "
                href="#"
                target="_blank"
                rel="noreferrer"
              >
                <FaLinkedinIn className="w-8 h-8" />
              </Link>
              <Link
                className="text-gray-700 transition hover:text-darkGold "
                href="#"
                target="_blank"
                rel="noreferrer"
              >
                <FaSquareXTwitter className="w-8 h-8" />
              </Link>
              <Link
                className="text-gray-700 transition hover:text-darkGold "
                href="#"
                target="_blank"
                rel="noreferrer"
              >
                <FaTiktok className="w-8 h-8" />
              </Link>
              <Link
                className="text-gray-700 transition hover:text-darkGold "
                href="#"
                target="_blank"
                rel="noreferrer"
              >
                <FaYoutube className="w-8 h-8" />
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-1 text-center lg:grid-cols-3 lg:text-left">
            <div>
              <strong className="font-medium text-lightGold dark:text-white">
                Looking For
              </strong>
              <ul className="mt-6 space-y-1">
                <li>
                  <Link
                    className="text-gray-700 transition hover:text-lightGold"
                    href="/rent"
                  >
                    Rent
                  </Link>
                </li>
                <li>
                  <Link
                    className="text-gray-700 transition hover:text-lightGold"
                    href="Buy"
                  >
                    Buy
                  </Link>
                </li>
                <li>
                  <Link
                    className="text-gray-700 transition hover:text-lightGold"
                    href="/sell"
                  >
                    Sell
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <strong className="font-medium text-lightGold dark:text-white">
                Useful Links
              </strong>

              <ul className="mt-6 space-y-1">
                <li>
                  <Link
                    className="text-gray-700 transition hover:text-lightGold"
                    href="/"
                  >
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    className="text-gray-700 transition hover:text-lightGold"
                    href="/about"
                  >
                    About
                  </Link>
                </li>
                <li>
                  <Link
                    className="text-gray-700 transition hover:text-lightGold"
                    href="/career"
                  >
                    Career
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <strong className="font-medium text-lightGold dark:text-white">
                Contact Us
              </strong>

              <ul className="mt-6 space-y-1">
                <li>
                  <Link
                    className="text-gray-700 transition hover:text-lightGold"
                    href="#"
                  >
                    Office No. 803, Metropolis Tower, Business Bay, Dubai.
                  </Link>
                </li>
                <li>
                  <Link
                    className="text-gray-700 transition hover:text-lightGold"
                    href="tell:971554050250"
                  >
                    00971 55 405 0250
                  </Link>
                </li>
                <li>
                  <Link
                    className="text-gray-700 transition hover:text-lightGold"
                    href="mailto:info@alburraqgroup.com"
                  >
                    info@alburraqgroup.com
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-16 border-t border-gray-100 pt-8 dark:border-gray-800">
          <p className="text-center text-lg text-gray-500 dark:text-gray-400">
            © 2022 <span className="text-darkGold ">Al-Burraq</span>. All rights
            reserved.
            <br />
            Designed and Developed with Passion by{" "}
            <Link
              href="#"
              className="text-darkGold underline transition hover:text-lightGold "
            >
              Beacon Techh
            </Link>
            .
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
