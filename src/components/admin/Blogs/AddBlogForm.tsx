"use client";

import { useState, useRef } from "react";
import axios from "axios";
import slugify from "slugify";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import Image from "next/image";

const NEXT_PUBLIC_API_URL = process.env.NEXT_PUBLIC_API_URL;
const NEXT_PUBLIC_IMGBB_API_KEY = "a53c2a4a94f3dd313d50711ac901dc17";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import "react-quill/dist/quill.snow.css";

const AddBlogForm = () => {
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [shortDescription, setShortDescription] = useState("");
  const [bodyContent, setBodyContent] = useState("");
  const [images, setImages] = useState<File[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const router = useRouter(); // useRouter from next/navigation

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const titleValue = e.target.value;
    setTitle(titleValue);
    const generatedSlug = slugify(titleValue, { lower: true });
    setSlug(generatedSlug);
  };

  const handleAddBlog = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const uploadedImageURLs = await Promise.all(images.map(uploadImage));

      const response = await axios.post(`${NEXT_PUBLIC_API_URL}/api/blogs`, {
        title,
        slug,
        shortDescription,
        bodyContent: [{ type: "paragraph", content: bodyContent }],
        images: uploadedImageURLs,
      });
      console.log(response.data);
      resetForm();
      router.push("/admin/blogs"); // Navigate to /admin/blogs on success
    } catch (error) {
      console.error("Error adding blog", error);
    }
  };

  const uploadImage = async (image: File): Promise<string> => {
    try {
      const formData = new FormData();
      formData.append("image", image);
      console.log("Uploading image: ", image);

      const imgBBResponse = await axios.post(
        `https://api.imgbb.com/1/upload?key=${NEXT_PUBLIC_IMGBB_API_KEY}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("Image uploaded successfully: ", imgBBResponse.data.data.url);
      return imgBBResponse.data.data.url;
    } catch (error) {
      console.error("Error uploading image to imgBB", error);
      throw new Error("Failed to upload image");
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selectedImages = Array.from(e.target.files);
      setImages(selectedImages);
      const imageUrls = selectedImages.map((image) =>
        URL.createObjectURL(image)
      );
      setImagePreviews(imageUrls);
      console.log("Selected images: ", selectedImages);
    }
  };

  const resetForm = () => {
    setTitle("");
    setSlug("");
    setShortDescription("");
    setBodyContent("");
    setImages([]);
    setImagePreviews([]);

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <section>
      <div className="mx-auto max-w-screen-sm text-center">
        <h2 className="text-3xl text-darkGold font-extrabold mb-4 mt-4 lg:mb-16 bg-black shadow-md p-4 rounded-xl bg-opacity-80 backdrop-blur-2xl backdrop-saturate-200 inline-block">
          Add Blogs
        </h2>
      </div>
      <form onSubmit={handleAddBlog}>
        <div className="grid gap-6 mb-6">
          <div>
            <label className="block mb-2 text-xl font-medium text-gray-900 dark:text-white">
              Title
            </label>
            <input
              className="bg-slate-700 border border-gray-300 text-gray-900 text-xl rounded-lg focus:ring-slate-800 focus:border-slate-800 block w-full p-4 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-slate-800 dark:focus:border-slate-800"
              type="text"
              placeholder="Enter The Title"
              value={title}
              onChange={handleTitleChange}
              required
            />
          </div>
          <div>
            <label className="block mb-2 text-xl font-medium text-gray-900 dark:text-white">
              Slug
            </label>
            <input
              className="bg-slate-700 border border-gray-300 text-gray-900 text-xl rounded-lg focus:ring-slate-800 focus:border-slate-800 block w-full p-4 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-slate-800 dark:focus:border-slate-800"
              type="text"
              placeholder="Slug"
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block mb-2 text-xl font-medium text-gray-900 dark:text-white">
              Short Description
            </label>
            <textarea
              className="bg-slate-700 border border-gray-300 text-gray-900 text-xl rounded-lg focus:ring-slate-800 focus:border-slate-800 block w-full p-4 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-slate-800 dark:focus:border-slate-800"
              placeholder="Enter The Short Description"
              value={shortDescription}
              onChange={(e) => setShortDescription(e.target.value)}
              rows={4}
              required
            />
          </div>
          <div className="bg-slate-700 border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-slate-800 focus:border-slate-800 block w-full p-4 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-slate-800 dark:focus:border-slate-800">
            <label className="block mb-2 text-xl font-medium text-gray-900 dark:text-white">
              Body Content
            </label>
            <ReactQuill
              id="bodyContent"
              theme="snow"
              value={bodyContent}
              onChange={setBodyContent}
              placeholder="Write your blog content here..."
            />
          </div>
          <div>
            <label className="block mb-2 text-xl font-medium text-gray-900 dark:text-white">
              Image
            </label>
            <input
              className="bg-slate-700 border border-gray-300 text-gray-900 text-xl rounded-lg focus:ring-slate-800 focus:border-slate-800 block w-full p-4 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-slate-800 dark:focus:border-slate-800"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              multiple
              ref={fileInputRef}
            />
          </div>
          <div className="image-preview grid grid-cols-2 gap-4">
            {imagePreviews.map((url, index) => (
              <Image
                key={index}
                src={url}
                alt={`Preview ${index + 1}`}
                width={1080}
                height={1000}
                className="w-full h-auto object-cover rounded-lg"
              />
            ))}
          </div>
        </div>
        <button
          className="rounded-lg px-6 py-1 button font-bold text-white text-xl"
          type="submit"
        >
          + Upload
        </button>
      </form>
    </section>
  );
};

export default AddBlogForm;
