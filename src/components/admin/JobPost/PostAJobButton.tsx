"use client";

import React from "react";
import { useRouter } from "next/navigation"; // Adjust if you're using a different routing library

const PostAJobButton: React.FC = () => {
  const router = useRouter();

  const handleClick = () => {
    router.push("/admin/jobs-list/add");
  };

  return (
    <button
      className="px-4 py-2 bg-green-700 text-slate-200 font-bold rounded-lg shadow-md hover:bg-darkGold/80 transition duration-300"
      onClick={handleClick}
    >
      Post a Job
    </button>
  );
};

export default PostAJobButton;
