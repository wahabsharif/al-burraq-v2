"use client";

import { useState } from "react";
import axios from "axios";
import slugify from "slugify"; // Import slugify for generating slugs

const NEXT_PUBLIC_API_URL = process.env.NEXT_PUBLIC_API_URL;
const IMGBB_API_KEY = "a53c2a4a94f3dd313d50711ac901dc17";

const AddBlogForm = () => {
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [shortDescription, setShortDescription] = useState("");
  const [bodyContent, setBodyContent] = useState("");
  const [headings, setHeadings] = useState<string[]>([]);
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
        bodyContent,
        headings,
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

      const imgBBResponse = await axios.post(
        `https://api.imgbb.com/1/upload?key=${IMGBB_API_KEY}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
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
    }
  };

  const addHeading = () => setHeadings([...headings, ""]);

  const resetForm = () => {
    setTitle("");
    setSlug("");
    setShortDescription("");
    setBodyContent("");
    setHeadings([]);
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
      <textarea
        placeholder="Body Content"
        value={bodyContent}
        onChange={(e) => setBodyContent(e.target.value)}
        required
      />
      <div>
        <h3>Headings</h3>
        {headings.map((heading, index) => (
          <input
            key={index}
            type="text"
            placeholder="Heading"
            value={heading}
            onChange={(e) =>
              setHeadings(
                headings.map((h, i) => (i === index ? e.target.value : h))
              )
            }
          />
        ))}
        <button type="button" onClick={addHeading}>
          Add Heading
        </button>
      </div>
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
