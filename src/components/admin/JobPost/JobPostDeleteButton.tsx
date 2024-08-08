import React from "react";
import axios from "axios";

interface JobPostDeleteButtonProps {
  jobPostId: string;
  onDelete: (id: string) => void; // Callback function to handle delete
}

const NEXT_PUBLIC_API_URL = process.env.NEXT_PUBLIC_API_URL;

const JobPostDeleteButton: React.FC<JobPostDeleteButtonProps> = ({
  jobPostId,
  onDelete,
}) => {
  const handleDelete = async () => {
    try {
      await axios.delete(`${NEXT_PUBLIC_API_URL}/api/job-posts/${jobPostId}`);
      onDelete(jobPostId); // Call the callback function
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <button
      className="px-3 py-1 bg-red-500 text-slate-200 rounded-xl" // Updated color
      onClick={handleDelete}
    >
      Delete
    </button>
  );
};

export default JobPostDeleteButton;
