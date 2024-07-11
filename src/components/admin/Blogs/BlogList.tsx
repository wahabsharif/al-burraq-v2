"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import EditBlogForm from "@/components/admin/Blogs/EditBlogForm";
import DeleteBlogButton from "@/components/admin/Blogs/DeleteBlogButton";

// Define the Blog interface
interface Blog {
  _id: string;
  title: string;
  shortDescription: string;
  // Add other properties as needed
}

const NEXT_PUBLIC_API_URL = process.env.NEXT_PUBLIC_API_URL;

const BlogList = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]); // Use the Blog interface to type the blogs state
  const [editingBlogId, setEditingBlogId] = useState<string | null>(null);

  const fetchBlogs = async () => {
    try {
      const response = await axios.get(`${NEXT_PUBLIC_API_URL}/api/blogs`);
      setBlogs(response.data);
    } catch (error) {
      console.error("Error fetching blogs", error);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const handleUpdate = () => {
    setEditingBlogId(null);
    fetchBlogs();
  };

  return (
    <div>
      <h2>Blog List</h2>
      {blogs.map((blog) => (
        <div key={blog._id}>
          <h3>{blog.title}</h3>
          <p>{blog.shortDescription}</p>
          <button onClick={() => setEditingBlogId(blog._id)}>Edit</button>
          <DeleteBlogButton blogId={blog._id} onDelete={fetchBlogs} />
          {editingBlogId === blog._id && (
            <EditBlogForm blogId={blog._id} onUpdate={handleUpdate} />
          )}
        </div>
      ))}
    </div>
  );
};

export default BlogList;
