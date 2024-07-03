"use client";

import React, { useState } from "react";
import axios from "axios";

interface FormData {
  title: string;
  description: string;
  price: string;
  location: string;
  image: File | null;
}

const AddPropertyForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    title: "",
    description: "",
    price: "",
    location: "",
    image: null,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFormData({ ...formData, image: e.target.files[0] });
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      let imageUrl = "";

      if (formData.image) {
        // Upload the image to ImgBB or Cloudinary and get the URL
        const uploadData = new FormData();
        uploadData.append("image", formData.image);

        const imgBBResponse = await axios.post(
          `https://api.imgbb.com/1/upload?key=a53c2a4a94f3dd313d50711ac901dc17`,
          uploadData
        );

        imageUrl = imgBBResponse.data.data.url;

        // Uncomment below lines to use Cloudinary instead of ImgBB
        /*
        const cloudinaryResponse = await axios.post(
          `https://api.cloudinary.com/v1_1/YOUR_CLOUDINARY_NAME/image/upload`,
          uploadData
        );

        imageUrl = cloudinaryResponse.data.secure_url;
        */
      }

      const response = await axios.post(
        "http://localhost:5000/api/properties",
        {
          title: formData.title,
          description: formData.description,
          price: formData.price,
          location: formData.location,
          image: imageUrl, // Pass imageUrl here
        }
      );

      console.log("Property created:", response.data);
      // Optionally, reset form fields or display a success message
      setFormData({
        title: "",
        description: "",
        price: "",
        location: "",
        image: null,
      });
    } catch (error) {
      console.error("Error creating property:", error);
      // Handle error state or display error message to user
    }
  };

  return (
    <div>
      <h2>Create Property</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Title"
          required
        />
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Description"
          required
        />
        <input
          type="number"
          name="price"
          value={formData.price}
          onChange={handleChange}
          placeholder="Price"
          required
        />
        <input
          type="text"
          name="location"
          value={formData.location}
          onChange={handleChange}
          placeholder="Location"
          required
        />
        <input type="file" onChange={handleFileChange} />
        <button type="submit">Create Property</button>
      </form>
    </div>
  );
};

export default AddPropertyForm;
