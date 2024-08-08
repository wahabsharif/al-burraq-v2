"use client";

import BlurFade from "@/components/magicui/blur-fade";
import BlurIn from "@/components/magicui/blur-in";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { DotLoader } from "react-spinners";
import DOMPurify from "dompurify";

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

  useEffect(() => {
    const delayTimer = setTimeout(() => {
      setInitialDelay(false);
    }, 2000);

    const fetchJobPosts = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/api/job-posts`
        );

        setJobPosts(response.data as JobPost[]);
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
      {jobPosts.map((jobPost) => (
        <div key={jobPost.position} className="mb-6">
          {/* Heading */}
          <div className="flex justify-center items-center mb-5">
            <div className="inline-block bg-black shadow-md p-2 mb-4 rounded-xl bg-opacity-80 backdrop-blur-2xl backdrop-saturate-200">
              <BlurIn
                word={jobPost.position || "Unknown Position"}
                className="font-bold text-lg md:text-2xl lg:text-4xl text-gradient"
              />
            </div>
          </div>

          {/* Department */}
          <div className="flex justify-center mb-2">
            <p className="text-sm md:text-base lg:text-lg text-slate-100">
              Department: {jobPost.department || "Unknown Department"}
            </p>
          </div>

          {/* Create Date */}
          <div className="flex justify-end my-2">
            <p className="text-xs md:text-sm lg:text-sm text-slate-100">
              Created At:{" "}
              {new Date(jobPost.createdAt).toLocaleDateString("en-US", {
                month: "long",
                day: "numeric",
                year: "numeric",
              })}
            </p>
          </div>

          {/* Description */}
          <BlurFade
            delay={0.25 * 2}
            inView
            className="bg-black shadow-md p-4 rounded-xl bg-opacity-80 backdrop-blur-2xl backdrop-saturate-200 w-full"
          >
            {jobPost.description && jobPost.description.length > 0 ? (
              jobPost.description.map((item, index) => (
                <div
                  key={index}
                  className={`w-full ${item.type}`}
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
          </BlurFade>
        </div>
      ))}
    </section>
  );
};

export default UserJobPosts;
