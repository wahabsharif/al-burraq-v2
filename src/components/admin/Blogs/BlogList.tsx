"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import EditBlogForm from "./EditBlogForm";
import DeleteBlogButton from "./DeleteBlogButton";
import Image from "next/image";
import AddBlogButton from "./AddBlogButton";
import Modal from "react-modal";

// Define the Blog interface
interface Blog {
  _id: string;
  title: string;
  shortDescription: string;
  images: string[]; // Assuming each blog has an array of image URLs
  // Add other properties as needed
}

const NEXT_PUBLIC_API_URL = process.env.NEXT_PUBLIC_API_URL;

const BlogList = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]); // Use the Blog interface to type the blogs state
  const [editingBlogId, setEditingBlogId] = useState<string | null>(null);
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);

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

  const handleEditClick = (blog: Blog) => {
    setEditingBlogId(blog._id);
    setModalIsOpen(true);
  };

  const handleUpdateSuccess = () => {
    setEditingBlogId(null); // Clear edited property
    setModalIsOpen(false); // Close the modal after successful update
    fetchBlogs(); // Refresh property list
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  return (
    <section>
      <div className="mx-auto max-w-screen-sm text-center">
        <h2 className="text-3xl text-darkGold font-extrabold mb-4 mt-4 lg:mb-16 bg-black shadow-md p-4 rounded-xl bg-opacity-80 backdrop-blur-2xl backdrop-saturate-200 inline-block">
          All Blogs
        </h2>
      </div>
      <AddBlogButton />
      <div className="container mx-auto px-4 py-6">
        <div className="-mx-4">
          <div className="overflow-x-auto">
            <table className="min-w-full bg-darkBg border-gray-200 shadow-md rounded-xl">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Image
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Title
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Short Description
                  </th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {blogs.map((blog) => (
                  <tr key={blog._id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        {blog.images.map((imageUrl, index) => (
                          <Image
                            key={index}
                            src={imageUrl}
                            alt={`Image ${index + 1}`}
                            width={60}
                            height={60}
                            className="rounded-lg"
                            style={{
                              maxWidth: "60px",
                              maxHeight: "60px",
                            }}
                          />
                        ))}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <h3 className="text-sm font-medium text-gray-900">
                        {blog.title}
                      </h3>
                    </td>
                    <td className="px-6 py-4 max-w-xs">
                      <p className="text-sm text-gray-900 truncate">
                        {blog.shortDescription}
                      </p>
                    </td>
                    <td>
                      <button
                        className="bg-green-800 py-2 px-4 text-slate-100 rounded-lg hover:text-indigo-900 mr-2"
                        onClick={() => handleEditClick(blog)}
                      >
                        Edit
                      </button>
                      <DeleteBlogButton
                        blogId={blog._id}
                        onDelete={fetchBlogs}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        className="image-modal"
        overlayClassName="image-modal-overlay"
      >
        {editingBlogId && (
          <EditBlogForm
            blogId={editingBlogId}
            onUpdate={handleUpdateSuccess} // Pass handleUpdateSuccess function
          />
        )}
      </Modal>
    </section>
  );
};

export default BlogList;
