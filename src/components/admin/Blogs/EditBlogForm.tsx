import React, { useState, useEffect } from "react";
import axios from "axios";
import Image from "next/image";
import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";

const NEXT_PUBLIC_API_URL = process.env.NEXT_PUBLIC_API_URL;

// Dynamic import of react-quill to avoid SSR issues
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

interface EditBlogFormProps {
  blogId: string;
  onUpdate: () => void;
}

interface Blog {
  title: string;
  slug: string;
  shortDescription: string;
  bodyContent: { type: string; content: string }[];
  headings: string[];
  images: string[]; // Change images type to string[] for storing URLs
}

const EditBlogForm: React.FC<EditBlogFormProps> = ({ blogId, onUpdate }) => {
  const [blog, setBlog] = useState<Partial<Blog>>({
    title: "",
    slug: "",
    shortDescription: "",
    bodyContent: [{ type: "paragraph", content: "" }],
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

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileList = e.target.files;
    if (!fileList) return;

    const fileArray = Array.from(fileList);

    try {
      const uploadedImageURLs = await Promise.all(
        fileArray.map(async (file) => {
          const formData = new FormData();
          formData.append("image", file);

          const NEXT_PUBLIC_IMGBB_API_KEY =
            process.env.NEXT_PUBLIC_IMGBB_API_KEY;

          if (!NEXT_PUBLIC_IMGBB_API_KEY) {
            throw new Error("NEXT_PUBLIC_IMGBB_API_KEY must be defined");
          }

          formData.append("key", NEXT_PUBLIC_IMGBB_API_KEY);

          const response = await axios.post(
            `https://api.imgbb.com/1/upload?key=${NEXT_PUBLIC_IMGBB_API_KEY}`,
            formData
          );

          if (response.data && response.data.data && response.data.data.url) {
            return response.data.data.url; // Assuming imgBB returns URL in this format
          } else {
            throw new Error("Image upload failed: Invalid response from imgBB");
          }
        })
      );

      // Filter out null values from uploadedImageURLs
      const validImageURLs = uploadedImageURLs.filter((url) => url !== null);

      // Update blog state with new image URLs
      setBlog((prevBlog) => ({
        ...prevBlog,
        images: [...prevBlog.images!, ...validImageURLs], // Use spread operator to concatenate arrays
      }));
    } catch (error) {
      console.error("Error uploading image to imgBB", error);
      setErrorMessage("Failed to upload image. Please try again later.");
      setTimeout(() => setErrorMessage(null), 3000);
    }
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
          <div className="bg-slate-700 border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-slate-800 focus:border-slate-800 block w-full p-4 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-slate-800 dark:focus:border-slate-800">
            <ReactQuill
              theme="snow"
              value={blog.bodyContent?.map((pc) => pc.content).join("\n")}
              onChange={(content) => {
                const newBodyContent = content
                  .split("\n")
                  .map((content) => ({ type: "paragraph", content }));
                setBlog({ ...blog, bodyContent: newBodyContent });
              }}
            />
          </div>
        </div>
        <div>
          <h3>Images</h3>
          <div className="grid grid-cols-3 gap-4 mt-4">
            {blog.images?.map((image, index) => (
              <div key={index} className="relative flex items-center">
                <div className="relative w-32 h-32">
                  <Image
                    src={image}
                    alt={`Image ${index + 1}`}
                    layout="fill"
                    objectFit="cover"
                    className="rounded-lg"
                  />
                </div>
                <button
                  type="button"
                  className="bg-red-500 text-slate-100 px-2 py-1 rounded-lg absolute top-2 right-2"
                  onClick={() => handleRemoveImage(index)}
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="mt-4"
          />
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
