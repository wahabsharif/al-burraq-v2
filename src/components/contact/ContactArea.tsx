import React from "react";
import Link from "next/link";
import { IoLocationOutline } from "react-icons/io5";
import { FiPhoneCall, FiClock } from "react-icons/fi";

function ContactArea() {
  return (
    <section>
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <div className="mb-4">
          <div className="mb-6 max-w-3xl text-center sm:text-center md:mx-auto md:mb-12">
            <h2 className="font-heading mb-4 font-bold tracking-tight text-gradient text-3xl sm:text-5xl">
              Get in Touch
            </h2>
            <p className="mx-auto mt-4 max-w-3xl text-xl text-slate-200">
              In hac habitasse platea dictumst
            </p>
          </div>
        </div>
        <div className="flex items-stretch justify-center">
          <div className="grid md:grid-cols-2">
            <div className="h-full pr-6">
              <p className="mt-3 mb-12 text-lg text-slate-200">
                className aptent taciti sociosqu ad litora torquent per conubia
                nostra, per inceptos himenaeos. Duis nec ipsum orci. Ut
                scelerisque sagittis ante, ac tincidunt sem venenatis ut.
              </p>
              <ul className="mb-6 md:mb-0">
                <li className="flex">
                  <div className="flex h-10 w-10 items-center justify-center rounded bg-darkGold text-darkBg text-xl font-bold">
                    <IoLocationOutline />
                  </div>
                  <div className="ml-4 mb-4">
                    <h3 className="mb-2 text-xl font-medium leading-6 text-gray-900 dark:text-white">
                      Our Address
                    </h3>
                    <p className="text-slate-200">
                      Office No. 803, Metropolis Tower,
                    </p>
                    <p className="text-slate-200">Business Bay, Dubai. </p>
                  </div>
                </li>
                <li className="flex">
                  <div className="flex h-10 w-10 items-center justify-center rounded bg-darkGold text-darkBg text-xl font-bold">
                    <FiPhoneCall />
                  </div>
                  <div className="ml-4 mb-4">
                    <h3 className="mb-2 text-xl font-medium leading-6 text-gray-900 dark:text-white">
                      Contact
                    </h3>
                    <p className="text-slate-200">
                      <Link href="tell:971554050250"> 00971 55 405 0250</Link>
                    </p>
                    <p className="text-slate-200">
                      <Link href="mailto:info@alburraqgroup.com">
                        info@alburraqgroup.com
                      </Link>
                    </p>
                  </div>
                </li>
                <li className="flex">
                  <div className="flex h-10 w-10 items-center justify-center rounded bg-darkGold text-darkBg text-xl font-bold">
                    <FiClock />
                  </div>
                  <div className="ml-4 mb-4">
                    <h3 className="mb-2 text-xl font-medium leading-6 text-gray-900 dark:text-white">
                      Working hours
                    </h3>
                    <p className="text-slate-200">
                      Monday - Friday: 08:00 - 17:00
                    </p>
                    <p className="text-slate-200">
                      Saturday &amp; Sunday: 08:00 - 12:00
                    </p>
                  </div>
                </li>
              </ul>
            </div>
            <div className="card h-fit max-w-6xl p-5 md:p-12" id="form">
              <h2 className="mb-4 text-2xl font-bold dark:text-white">
                Ready to Get Started?
              </h2>
              <form id="contactForm">
                <div className="mb-6">
                  <div className="mx-0 mb-1 sm:mb-4">
                    <div className="mx-0 mb-1 sm:mb-4">
                      <label
                        htmlFor="name"
                        className="pb-1 text-xs uppercase tracking-wider"
                      ></label>
                      <input
                        type="text"
                        id="name"
                        autoComplete="given-name"
                        placeholder="Your name"
                        className="mb-2 w-full rounded-md border border-gray-400 py-2 pl-2 pr-4 shadow-md dark:text-gray-300 sm:mb-0"
                        name="name"
                      />
                    </div>
                    <div className="mx-0 mb-1 sm:mb-4">
                      <label
                        htmlFor="email"
                        className="pb-1 text-xs uppercase tracking-wider"
                      ></label>
                      <input
                        type="email"
                        id="email"
                        autoComplete="email"
                        placeholder="Your email address"
                        className="mb-2 w-full rounded-md border border-gray-400 py-2 pl-2 pr-4 shadow-md dark:text-gray-300 sm:mb-0"
                        name="email"
                      />
                    </div>
                  </div>
                  <div className="mx-0 mb-1 sm:mb-4">
                    <label
                      htmlFor="textarea"
                      className="pb-1 text-xs uppercase tracking-wider"
                    ></label>
                    <textarea
                      id="textarea"
                      name="textarea"
                      cols={30}
                      rows={5}
                      placeholder="Write your message..."
                      className="mb-2 w-full rounded-md border border-gray-400 py-2 pl-2 pr-4 shadow-md dark:text-gray-300 sm:mb-0"
                    ></textarea>
                  </div>
                </div>
                <div className="text-center shiny-btn font-bold">
                  <button
                    type="submit"
                    className="w-full bg-blue-800 text-white px-6 py-3 font-xl rounded-md sm:mb-0"
                  >
                    Send Message
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ContactArea;
