"use client";

import { useState } from "react";
import axios from "axios";
import slugify from "slugify"; // Import slugify for generating slugs
import dynamic from "next/dynamic"; // To dynamically import react-quill

const NEXT_PUBLIC_API_URL = process.env.NEXT_PUBLIC_API_URL;
const NEXT_PUBLIC_IMGBB_API_KEY = "a53c2a4a94f3dd313d50711ac901dc17";

// Dynamic import of react-quill to avoid SSR issues
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import "react-quill/dist/quill.snow.css";

const AddBlogForm = () => {
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [shortDescription, setShortDescription] = useState("");
  const [bodyContent, setBodyContent] = useState("");
  const [images, setImages] = useState<File[]>([]); // Store File objects for uploaded images

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const titleValue = e.target.value;
    setTitle(titleValue);
    const generatedSlug = slugify(titleValue, { lower: true }); // Generate slug from title
    setSlug(generatedSlug);
  };

  const handleAddBlog = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Upload images to imgBB first
      const uploadedImageURLs = await Promise.all(images.map(uploadImage));

      // Create blog with uploaded image URLs
      const response = await axios.post(`${NEXT_PUBLIC_API_URL}/api/blogs`, {
        title,
        slug,
        shortDescription,
        bodyContent: [{ type: "paragraph", content: bodyContent }],
        images: uploadedImageURLs,
      });
      console.log(response.data);
      // Handle success (e.g., clear form, display success message)
      resetForm();
    } catch (error) {
      console.error("Error adding blog", error);
      // Handle error
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
      console.log("Selected images: ", selectedImages);
    }
  };

  const resetForm = () => {
    setTitle("");
    setSlug("");
    setShortDescription("");
    setBodyContent("");
    setImages([]);
  };

  return (
    <form onSubmit={handleAddBlog}>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={handleTitleChange} // Use handleTitleChange to update title and slug
        required
      />
      <input
        type="text"
        placeholder="Slug"
        value={slug}
        onChange={(e) => setSlug(e.target.value)} // Allow manual editing of slug if needed
        required
      />
      <textarea
        placeholder="Short Description"
        value={shortDescription}
        onChange={(e) => setShortDescription(e.target.value)}
        required
      />
      <ReactQuill
        value={bodyContent}
        onChange={setBodyContent}
        placeholder="Write your blog content here..."
      />
      <div>
        <h3>Images</h3>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          multiple
        />
      </div>
      <button type="submit">Add Blog</button>
    </form>
  );
};

export default AddBlogForm;
