// Import necessary modules
import React from "react";
import Image from "next/image";
import Link from "next/link";
import teamsData, { TeamMember } from "@/data/teamsData";

const Team = () => {
  return (
    <section className="bg-white dark:bg-gray-900">
      <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6 ">
        <div className="mx-auto max-w-screen-sm text-center mb-8 lg:mb-16 bg-black shadow-md p-4 rounded-xl bg-opacity-80 backdrop-blur-2xl backdrop-saturate-200">
          <h2 className="mb-4 text-4xl text-gradient font-extrabold">
            Our Team
          </h2>
          <p className="font-light text-gray-500 lg:mb-16 sm:text-xl dark:text-gray-400">
            Explore the whole collection of open-source web components and
            elements built with the utility classNames from Tailwind
          </p>
        </div>

        {/* Image Cards */}
        <div className="grid gap-8 mb-6 lg:mb-16 md:grid-cols-2">
          {teamsData.map((member: TeamMember, index: number) => (
            <div
              key={index}
              className="items-center bg-black shadow-md p-4 rounded-xl bg-opacity-80 backdrop-blur-2xl backdrop-saturate-200 sm:flex"
            >
              <a href="#">
                <Image
                  className="team-image rounded-lg sm:rounded-none sm:rounded-l-lg"
                  src={member.imagePath}
                  alt={member.name}
                  width={1000}
                  style={{
                    maxWidth: "100%",
                    height: "auto",
                  }}
                />
              </a>
              <div className="p-5">
                <h3 className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">
                  <a href="#">{member.name}</a>
                </h3>
                <span className="text-gray-500 dark:text-gray-400">
                  {member.role}
                </span>
                <p className="mt-3 mb-4 font-light text-gray-500 dark:text-gray-400">
                  {member.description}
                </p>
                <Link href="#">
                  <button className="shiny-btn px-4 py-2 font-bold">
                    Contact Me
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Team;
