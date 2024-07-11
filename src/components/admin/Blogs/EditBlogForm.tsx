import React, { useState, useEffect } from "react";
import axios from "axios";
import Image from "next/image";

interface EditBlogFormProps {
  blogId: string;
  onUpdate: () => void;
}

interface Blog {
  title: string;
  slug: string;
  shortDescription: string;
  bodyContent: string;
  headings: string[];
  images: string[]; // Adjusted to string array for image URLs
}

const NEXT_PUBLIC_API_URL = process.env.NEXT_PUBLIC_API_URL;

const EditBlogForm: React.FC<EditBlogFormProps> = ({ blogId, onUpdate }) => {
  const [blog, setBlog] = useState<Partial<Blog>>({
    title: "",
    slug: "",
    shortDescription: "",
    bodyContent: "",
    headings: [],
    images: [],
  });
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await axios.get<Blog>(
          `${NEXT_PUBLIC_API_URL}/api/blogs/${blogId}`
        );
        setBlog(response.data);
      } catch (error) {
        console.error("Error fetching blog", error);
      }
    };
    fetchBlog();
  }, [blogId]);

  const handleEditBlog = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await axios.put(
        `${NEXT_PUBLIC_API_URL}/api/blogs/${blogId}`,
        blog
      );

      console.log("Update Blog Response:", response.data);
      setSuccessMessage("Blog updated successfully.");
      onUpdate(); // Refresh the blog list
    } catch (error) {
      console.error("Error editing blog", error);
      setErrorMessage("Failed to update blog.");
      setTimeout(() => setErrorMessage(null), 2000);
    }
  };

  const addHeading = () =>
    setBlog({ ...blog, headings: [...(blog.headings || []), ""] });
  const handleHeadingChange = (index: number, value: string) => {
    setBlog({
      ...blog,
      headings: (blog.headings || []).map((h, i) => (i === index ? value : h)),
    });
  };
  const handleRemoveHeading = (index: number) => {
    setBlog({
      ...blog,
      headings: (blog.headings || []).filter((_, i) => i !== index),
    });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileList = e.target.files;
    if (!fileList) return;
    const fileArray = Array.from(fileList);
    const fileURLs = fileArray.map((file) => URL.createObjectURL(file));
    setBlog({ ...blog, images: fileURLs });
  };

  const handleRemoveImage = (index: number) => {
    const updatedImages = [...blog.images!];
    updatedImages.splice(index, 1);
    setBlog({ ...blog, images: updatedImages });
  };

  return (
    <section className="px-10 mb-5 h-full w-full bg-gray-100 rounded-lg shadow-md">
      <div className="mx-auto max-w-screen-sm text-center">
        <h3 className="text-3xl text-darkGold font-extrabold mb-4 mt-4 lg:mb-16 bg-black shadow-md p-4 rounded-xl bg-opacity-80 backdrop-blur-2xl backdrop-saturate-200 inline-block">
          Edit Blog
        </h3>
      </div>
      <form onSubmit={handleEditBlog} className="space-y-4">
        <div className="grid grid-cols-1 gap-4">
          <input
            type="text"
            placeholder="Title"
            value={blog.title}
            onChange={(e) => setBlog({ ...blog, title: e.target.value })}
            className="bg-slate-700 border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-slate-800 focus:border-slate-800 block w-full p-4 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-slate-800 dark:focus:border-slate-800"
            required
          />
          <input
            type="text"
            placeholder="Slug"
            value={blog.slug}
            onChange={(e) => setBlog({ ...blog, slug: e.target.value })}
            className="bg-slate-700 border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-slate-800 focus:border-slate-800 block w-full p-4 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-slate-800 dark:focus:border-slate-800"
            required
          />
          <textarea
            placeholder="Short Description"
            value={blog.shortDescription}
            onChange={(e) =>
              setBlog({ ...blog, shortDescription: e.target.value })
            }
            className="bg-slate-700 border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-slate-800 focus:border-slate-800 block w-full p-4 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-slate-800 dark:focus:border-slate-800"
            required
          />
          <textarea
            placeholder="Body Content"
            value={blog.bodyContent}
            onChange={(e) => setBlog({ ...blog, bodyContent: e.target.value })}
            className="bg-slate-700 border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-slate-800 focus:border-slate-800 block w-full p-4 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-slate-800 dark:focus:border-slate-800"
            required
          />
        </div>
        <div className="grid grid-cols-1 gap-4">
          <div>
            <h3>Headings</h3>
            {(blog.headings || []).map((heading, index) => (
              <div key={index} className="flex space-x-2 items-center">
                <input
                  type="text"
                  placeholder="Heading"
                  value={heading}
                  onChange={(e) => handleHeadingChange(index, e.target.value)}
                  className="bg-slate-700 border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-slate-800 focus:border-slate-800 block w-full p-4 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-slate-800 dark:focus:border-slate-800"
                />
                <button
                  type="button"
                  className="bg-red-500 text-slate-100 px-2 py-1 rounded-lg"
                  onClick={() => handleRemoveHeading(index)}
                >
                  Remove
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={addHeading}
              className="bg-green-800 text-slate-100 py-2 px-4 rounded-lg mt-2"
            >
              Add Heading
            </button>
          </div>
          <div>
            <h3>Images</h3>
            {(blog.images ?? []).map((preview, index) => (
              <div key={index} className="flex space-x-2 items-center">
                <div className="relative w-32 h-32">
                  <Image
                    src={preview}
                    alt={`Image ${index + 1}`}
                    layout="fill"
                    objectFit="cover"
                    className="rounded-lg"
                  />
                </div>
                <label className="bg-green-800 py-2 px-4 text-slate-100 rounded-lg hover:text-indigo-900 mr-2 cursor-pointer">
                  Change Image
                  <input
                    type="file"
                    className="hidden"
                    onChange={handleImageChange}
                    accept="image/*"
                  />
                </label>
                <button
                  type="button"
                  className="bg-red-500 text-slate-100 px-2 py-1 rounded-lg"
                  onClick={() => handleRemoveImage(index)}
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        </div>
        <button
          type="submit"
          className="bg-green-800 text-slate-100 py-2 px-4 rounded-lg mt-4"
        >
          Update Blog
        </button>
      </form>
      {successMessage && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-2 rounded-lg mt-4">
          {successMessage}
        </div>
      )}
      {errorMessage && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded-lg mt-4">
          {errorMessage}
        </div>
      )}
    </section>
  );
};

export default EditBlogForm;
