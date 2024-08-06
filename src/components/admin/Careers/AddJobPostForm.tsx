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

const AddJobPostForm: React.FC = () => {
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
      await axios.delete(`/api/job-posts/${id}`);
      setJobPosts(jobPosts.filter((jobPost) => jobPost._id !== id));
    } catch (error) {
      console.error("Error deleting job post:", error);
    }
  };

  return (
    <div>
      <h2>Add Job Post</h2>
      <select
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
      <input
        type="text"
        placeholder="Position"
        value={newJobPost.position}
        onChange={(e) =>
          setNewJobPost({ ...newJobPost, position: e.target.value })
        }
      />
      <button onClick={handleAddJobPost}>Add Job Post</button>

      <h2>Job Posts</h2>
      {jobPosts.map((jobPost) => (
        <div key={jobPost._id}>
          <p>
            {jobPost.department} - {jobPost.position}
          </p>
          <button onClick={() => handleDeleteJobPost(jobPost._id!)}>
            Delete
          </button>
          <button onClick={() => setEditJobPost(jobPost)}>Edit</button>
        </div>
      ))}

      {editJobPost && (
        <div>
          <h2>Edit Job Post</h2>
          <select
            value={editJobPost.department}
            onChange={(e) =>
              setEditJobPost({ ...editJobPost, department: e.target.value })
            }
          >
            <option value="">Select Department</option>
            {departments.map((dept) => (
              <option key={dept} value={dept}>
                {dept}
              </option>
            ))}
          </select>
          <input
            type="text"
            placeholder="Position"
            value={editJobPost.position}
            onChange={(e) =>
              setEditJobPost({ ...editJobPost, position: e.target.value })
            }
          />
          <button onClick={() => handleUpdateJobPost(editJobPost._id!)}>
            Update Job Post
          </button>
        </div>
      )}
    </div>
  );
};

export default AddJobPostForm;
