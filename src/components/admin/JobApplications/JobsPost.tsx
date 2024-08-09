"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";

const NEXT_PUBLIC_API_URL = process.env.NEXT_PUBLIC_API_URL;

interface JobPost {
  _id?: string;
  department: string;
  position: string;
}

const departments = [
  "Sales and Marketing",
  "Administration",
  "Account and Finance",
  "Property Management",
  "Maintenance",
];

const JobsPost: React.FC = () => {
  const [jobPosts, setJobPosts] = useState<JobPost[]>([]);
  const [newJobPost, setNewJobPost] = useState<JobPost>({
    department: "",
    position: "",
  });
  const [editJobPost, setEditJobPost] = useState<JobPost | null>(null);

  useEffect(() => {
    // Fetch all job posts on component mount
    axios
      .get(`${NEXT_PUBLIC_API_URL}/api/job-posts`)
      .then((response) => setJobPosts(response.data))
      .catch((error) => console.error("Error fetching job posts:", error));
  }, []);

  const handleAddJobPost = async () => {
    try {
      const response = await axios.post(
        `${NEXT_PUBLIC_API_URL}/api/job-posts`,
        newJobPost
      );
      setJobPosts([...jobPosts, response.data.jobPost]);
      setNewJobPost({ department: "", position: "" });
    } catch (error) {
      console.error("Error adding job post:", error);
    }
  };

  const handleUpdateJobPost = async (id: string) => {
    try {
      const response = await axios.put(
        `${NEXT_PUBLIC_API_URL}/api/job-posts/${id}`,
        editJobPost
      );
      setJobPosts(
        jobPosts.map((jobPost) =>
          jobPost._id === id ? response.data.jobPost : jobPost
        )
      );
      setEditJobPost(null);
    } catch (error) {
      console.error("Error updating job post:", error);
    }
  };

  const handleDeleteJobPost = async (id: string) => {
    try {
      await axios.delete(`${NEXT_PUBLIC_API_URL}/api/job-posts/${id}`);
      setJobPosts(jobPosts.filter((jobPost) => jobPost._id !== id));
    } catch (error) {
      console.error("Error deleting job post:", error);
    }
  };

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-6">
        <div className="mx-auto max-w-screen-sm text-center">
          <h2 className="text-xl text-darkGold font-extrabold bg-black shadow-md p-2 rounded-xl bg-opacity-80 backdrop-blur-2xl backdrop-saturate-200 inline-block">
            Post A job
          </h2>
        </div>{" "}
        <div className="mb-4">
          <label className="block text-lg font-bold text-gray-700">
            Department
          </label>
          <select
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            value={newJobPost.department}
            onChange={(e) =>
              setNewJobPost({ ...newJobPost, department: e.target.value })
            }
          >
            <option value="">Select Department</option>
            {departments.map((dept) => (
              <option key={dept} value={dept}>
                {dept}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-lg font-bold text-gray-700">
            Position
          </label>
          <input
            type="text"
            className="mt-1 block w-full p-2 border capitalize border-gray-300 rounded-md"
            placeholder="Position"
            value={newJobPost.position}
            onChange={(e) =>
              setNewJobPost({ ...newJobPost, position: e.target.value })
            }
          />
        </div>
        <button
          className="button flex items-center bg-slate-700 hover:bg-blue-700 text-slate-100 text-lg py-1 px-4"
          onClick={handleAddJobPost}
        >
          Post The Job
        </button>
        <div className="mx-auto max-w-screen-sm text-center">
          <h2 className="text-xl text-darkGold font-extrabold bg-black shadow-md p-2 rounded-xl bg-opacity-80 backdrop-blur-2xl backdrop-saturate-200 inline-block">
            Posted Jobs List
          </h2>
        </div>{" "}
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="px-4 py-2">Department</th>
              <th className="px-4 py-2">Position</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {jobPosts.map((jobPost) => (
              <tr key={jobPost._id} className="bg-gray-100">
                <td className="border px-4 py-2 capitalize text-center">
                  {jobPost.department}
                </td>
                <td className="border px-4 py-2 capitalize text-center">
                  {jobPost.position}
                </td>
                <td className="border px-1 py-2 text-center">
                  <button
                    className="bg-red-500 text-slate-300 px-3 py-1 rounded-md mr-2"
                    onClick={() => handleDeleteJobPost(jobPost._id!)}
                  >
                    Delete
                  </button>
                  <button
                    className="bg-green-800 text-slate-300 px-3 py-1 rounded-md mr-2"
                    onClick={() => setEditJobPost(jobPost)}
                  >
                    Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {editJobPost && (
          <div className="mt-6">
            <div className="mx-auto max-w-screen-sm my-1 text-center">
              <h2 className="text-xl text-darkGold font-extrabold bg-black shadow-md p-2 rounded-xl bg-opacity-80 backdrop-blur-2xl backdrop-saturate-200 inline-block">
                Edit Job Post
              </h2>
            </div>{" "}
            <table className="min-w-full bg-white">
              <tbody>
                <tr className="bg-gray-100">
                  <td className="border px-4 py-2">
                    <label className="block text-gray-700">Department</label>
                  </td>
                  <td className="border px-4 py-2">
                    <select
                      className="mt-1 block w-full p-2 border capitalize border-gray-300 rounded-md"
                      value={editJobPost.department}
                      onChange={(e) =>
                        setEditJobPost({
                          ...editJobPost,
                          department: e.target.value,
                        })
                      }
                    >
                      <option value="">Select Department</option>
                      {departments.map((dept) => (
                        <option key={dept} value={dept}>
                          {dept}
                        </option>
                      ))}
                    </select>
                  </td>
                </tr>
                <tr className="bg-gray-100">
                  <td className="border px-4 py-2">
                    <label className="block text-gray-700">Position</label>
                  </td>
                  <td className="border px-4 py-2">
                    <input
                      type="text"
                      className="mt-1 block w-full p-2 border capitalize border-gray-300 rounded-md"
                      placeholder="Position"
                      value={editJobPost.position}
                      onChange={(e) =>
                        setEditJobPost({
                          ...editJobPost,
                          position: e.target.value,
                        })
                      }
                    />
                  </td>
                </tr>
                <tr className="bg-gray-100">
                  <td className="border px-4 py-2 text-center">
                    <button
                      className="bg-green-800 text-slate-300 px-3 py-1 rounded-md mr-2"
                      onClick={() => handleUpdateJobPost(editJobPost._id!)}
                    >
                      Update
                    </button>
                    <button
                      className="bg-red-500 text-slate-300 px-3 py-1 rounded-md mr-2"
                      onClick={() => setEditJobPost(null)}
                    >
                      Cancel
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default JobsPost;
