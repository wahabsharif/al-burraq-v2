"use client";

import { useState } from "react";
import axios from "axios";

const NEXT_PUBLIC_API_URL = process.env.NEXT_PUBLIC_API_URL;

const AddBlogForm = () => {
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [shortDescription, setShortDescription] = useState("");
  const [bodyContent, setBodyContent] = useState("");
  const [headings, setHeadings] = useState<string[]>([]);
  const [images, setImages] = useState<string[]>([]);

  const handleAddBlog = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${NEXT_PUBLIC_API_URL}/api/blogs`, {
        title,
        slug,
        shortDescription,
        bodyContent,
        headings,
        images,
      });
      console.log(response.data);
      // Handle success (e.g., clear form, display success message)
    } catch (error) {
      console.error("Error adding blog", error);
      // Handle error
    }
  };

  const addHeading = () => setHeadings([...headings, ""]);
  const addImage = () => setImages([...images, ""]);

  return (
    <form onSubmit={handleAddBlog}>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Slug"
        value={slug}
        onChange={(e) => setSlug(e.target.value)}
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
        {images.map((image, index) => (
          <input
            key={index}
            type="text"
            placeholder="Image URL"
            value={image}
            onChange={(e) =>
              setImages(
                images.map((img, i) => (i === index ? e.target.value : img))
              )
            }
          />
        ))}
        <button type="button" onClick={addImage}>
          Add Image
        </button>
      </div>
      <button type="submit">Add Blog</button>
    </form>
  );
};

export default AddBlogForm;
