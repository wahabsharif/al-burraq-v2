"use client";

import BlurFade from "@/components/magicui/blur-fade";
import BlurIn from "@/components/magicui/blur-in";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { DotLoader } from "react-spinners";
import DOMPurify from "dompurify";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import Link from "next/link";
import ShimmerButton from "@/components/magicui/shimmer-button";

interface Paragraph {
  type: "paragraph" | "heading" | "bold" | "italic" | "underline";
  content: string;
}

interface JobPost {
  department: string;
  position: string;
  description: Paragraph[];
  createdAt: string;
}

const UserJobPosts: React.FC = () => {
  const [jobPosts, setJobPosts] = useState<JobPost[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [initialDelay, setInitialDelay] = useState<boolean>(true);
  const [visibleDescriptions, setVisibleDescriptions] = useState<Set<string>>(
    new Set()
  );

  useEffect(() => {
    const delayTimer = setTimeout(() => {
      setInitialDelay(false);
    }, 2000);

    const fetchJobPosts = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/api/job-posts`
        );

        // Sort job posts by createdAt date in descending order
        const sortedPosts = (response.data as JobPost[]).sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );

        setJobPosts(sortedPosts);
      } catch (err) {
        setError("Failed to fetch job posts");
      }
    };

    if (!initialDelay) {
      fetchJobPosts();
      clearTimeout(delayTimer);
    }

    return () => clearTimeout(delayTimer);
  }, [initialDelay]);

  const toggleDescription = (position: string) => {
    setVisibleDescriptions((prev) => {
      const updated = new Set(prev);
      if (updated.has(position)) {
        updated.delete(position);
      } else {
        updated.add(position);
      }
      return updated;
    });
  };

  if (initialDelay) {
    return (
      <div className="flex items-center justify-center h-screen">
        <DotLoader color="rgb(198, 148, 57)" />
      </div>
    );
  }

  if (error) return <div>Error: {error}</div>;
  if (!jobPosts || jobPosts.length === 0) return <div>No job posts found</div>;

  return (
    <section className="container mx-auto p-2 mt-2">
      <div className="flex justify-center items-center mb-5">
        <div className="inline-block bg-black shadow-md p-2 mb-4 rounded-xl bg-opacity-80 backdrop-blur-2xl backdrop-saturate-200">
          <BlurIn
            word="Find Your Dream Job"
            className="font-bold text-lg md:text-2xl lg:text-4xl text-gradient"
          />
        </div>
      </div>
      {jobPosts.map((jobPost) => (
        <div key={jobPost.position} className="mb-6">
          {/* Job Details */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between bg-black shadow-md p-4 rounded-xl bg-opacity-80 backdrop-blur-2xl backdrop-saturate-200">
            <div className="flex flex-col mb-2 md:flex-row md:items-center md:space-x-4">
              <p className="text-xl md:text-2xl lg:text-3xl text-gradient">
                {jobPost.position}
              </p>
              <span className="hidden md:block lg:block">|</span>
              <p className="text-sm md:text-base lg:text-lg text-lightGold">
                {jobPost.department}
              </p>
              <span className="hidden md:block lg:block">|</span>
              <p className="text-sm md:text-base lg:text-lg text-lightGold">
                Posted At:{" "}
                {new Date(jobPost.createdAt).toLocaleDateString("en-US", {
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })}
              </p>
            </div>
            <button
              className="mt-2 md:mt-0 p-2 bg-slate-800 text-lightGold2 rounded-full hover:bg-blue-600 flex items-center justify-center"
              onClick={() => toggleDescription(jobPost.position)}
            >
              {visibleDescriptions.has(jobPost.position) ? (
                <IoIosArrowUp className="text-xl" />
              ) : (
                <IoIosArrowDown className="text-xl" />
              )}
            </button>
          </div>

          {/* Description */}
          {visibleDescriptions.has(jobPost.position) && (
            <BlurFade
              delay={0.25 * 2}
              inView
              className="bg-black shadow-md p-4 rounded-xl bg-opacity-80 backdrop-blur-2xl backdrop-saturate-200 w-full mt-4"
            >
              {jobPost.description && jobPost.description.length > 0 ? (
                jobPost.description.map((item, index) => (
                  <div
                    key={index}
                    className={`w-full user-job-posts ${item.type}`}
                    dangerouslySetInnerHTML={{
                      __html: DOMPurify.sanitize(item.content),
                    }}
                  />
                ))
              ) : (
                <p className="text-sm sm:text-base lg:text-lg">
                  No description available.
                </p>
              )}
              <div className="mt-4 flex justify-center">
                <Link href={"/career/apply"}>
                  <ShimmerButton className="shadow-2xl mt-4 cursor-pointer">
                    <span className="whitespace-pre-wrap font-bold text-center text-xs sm:text-sm leading-none tracking-tight text-white lg:text-lg">
                      Apply Now
                    </span>
                  </ShimmerButton>
                </Link>
              </div>
            </BlurFade>
          )}
        </div>
      ))}
    </section>
  );
};

export default UserJobPosts;
