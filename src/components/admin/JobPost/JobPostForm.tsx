"use client";

import React, { useState } from "react";
import axios from "axios";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useRouter } from "next/navigation";

const NEXT_PUBLIC_API_URL = process.env.NEXT_PUBLIC_API_URL;

const JobPostForm: React.FC = () => {
  const [department, setDepartment] = useState("");
  const [position, setPosition] = useState("");
  const [description, setDescription] = useState("");
  const router = useRouter(); // Initialize useRouter

  // Function to convert HTML to an array of paragraph objects
  const convertHtmlToParagraphs = (html: string) => {
    // This is a basic conversion; you might need a more robust implementation
    return [
      {
        type: "paragraph",
        content: html,
      },
    ];
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Convert HTML to paragraph objects
    const formattedDescription = convertHtmlToParagraphs(description);

    try {
      await axios.post(`${NEXT_PUBLIC_API_URL}/api/job-posts`, {
        department,
        position,
        description: formattedDescription,
      });
      // Clear form after successful submission
      setDepartment("");
      setPosition("");
      setDescription("");
      // Redirect to the job post list page
      router.push("/admin/jobs-list");
    } catch (error) {
      console.error("Server error while creating job post:", error);
    }
  };

  return (
    <section className="p-6">
      <div className="mx-auto max-w-screen-sm text-center mb-6">
        <h2 className="text-3xl text-darkGold font-extrabold mb-4 lg:mb-6 bg-black shadow-md px-4 py-2 rounded-xl bg-opacity-80 backdrop-blur-2xl backdrop-saturate-200 inline-block">
          Post A Job
        </h2>
      </div>
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow-md space-y-4"
      >
        <div className="flex flex-col md:flex-row md:space-x-4 space-y-4 md:space-y-0">
          <div className="flex flex-col w-full">
            <label
              htmlFor="department"
              className="text-xl font-bold text-gray-700 mb-2"
            >
              Department:
            </label>
            <select
              id="department"
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
              className="border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-darkGold"
              required
            >
              <option value="">Select Department</option>
              <option value="Sales and Marketing">Sales and Marketing</option>
              <option value="Administration">Administration</option>
              <option value="Account and Finance">Account and Finance</option>
              <option value="Property Management">Property Management</option>
              <option value="Maintenance">Maintenance</option>
            </select>
          </div>

          <div className="flex flex-col w-full">
            <label
              htmlFor="position"
              className="text-xl font-bold text-gray-700 mb-2"
            >
              Position:
            </label>
            <input
              id="position"
              type="text"
              value={position}
              onChange={(e) => setPosition(e.target.value)}
              className="border capitalize border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-darkGold"
              required
            />
          </div>
        </div>

        <div className="flex flex-col space-y-2">
          <label
            htmlFor="description"
            className="text-xl font-bold text-gray-700"
          >
            Description:
          </label>
          <ReactQuill value={description} onChange={setDescription} />
        </div>

        <button
          type="submit"
          className="bg-green-700 text-slate-200 py-2 px-4 rounded-md shadow-md hover:bg-darkGold-dark"
        >
          Create
        </button>
      </form>
    </section>
  );
};

export default JobPostForm;
