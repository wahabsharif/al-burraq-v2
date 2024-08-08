"use client";

import axios from "axios";
import React, { useEffect, useState } from "react";
import JobPostDeleteButton from "./JobPostDeleteButton"; // Adjust import path as necessary

interface JobPost {
  _id: string; // Assuming there's an ID field
  department: string;
  position: string;
  createdAt: string;
}

const JobPostList: React.FC = () => {
  const [jobPosts, setJobPosts] = useState<JobPost[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
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

    fetchJobPosts();
  }, []);

  const handleDelete = (id: string) => {
    setJobPosts(
      (prevPosts) => prevPosts?.filter((post) => post._id !== id) || null
    );
  };

  if (error) return <div>Error: {error}</div>;
  if (!jobPosts || jobPosts.length === 0) return <div>No job posts found</div>;

  return (
    <section className="container mx-auto p-2 mt-2">
      <div className="mx-auto max-w-screen-sm text-center">
        <h2 className="text-3xl text-darkGold font-extrabold mb-4 mt-4 lg:mb-16 bg-black shadow-md p-4 rounded-xl bg-opacity-80 backdrop-blur-2xl backdrop-saturate-200 inline-block">
          Posted Jobs List
        </h2>
      </div>
      <table className="min-w-full bg-black text-slate-100">
        <thead>
          <tr className="bg-opacity-80 backdrop-blur-2xl backdrop-saturate-200 rounded-xl">
            <th className="py-2 px-4 text-left text-2xl">Position</th>
            <th className="py-2 px-4 text-left text-2xl">Department</th>
            <th className="py-2 px-4 text-left text-2xl">Created At</th>
            <th className="py-2 px-4 text-left text-2xl">Actions</th>
          </tr>
        </thead>
        <tbody>
          {jobPosts.map((jobPost) => (
            <tr key={jobPost._id} className="border-b border-gray-700">
              <td className="py-2 px-4 text-xl">
                {jobPost.position || "Unknown Position"}
              </td>
              <td className="py-2 px-4 text-xl">
                {jobPost.department || "Unknown Department"}
              </td>
              <td className="py-2 px-4 text-xl">
                {new Date(jobPost.createdAt).toLocaleDateString("en-US", {
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })}
              </td>
              <td className="py-2 px-4">
                <JobPostDeleteButton
                  jobPostId={jobPost._id}
                  onDelete={handleDelete} // Pass the callback function
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
};

export default JobPostList;
