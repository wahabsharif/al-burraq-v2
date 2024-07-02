"use client";

import React, { useState } from "react";
import axios from "axios";

interface FormData {
  title: string;
  description: string;
  price: string;
  location: string;
}

const AddPropertyForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    title: "",
    description: "",
    price: "",
    location: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await axios.post<FormData>(
        "http://localhost:5000/api/properties",
        formData
      );
      console.log("Property created:", response.data);
      // Optionally, reset form fields or display a success message
    } catch (error) {
      console.error("Error creating property:", error);
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
        <button type="submit">Create Property</button>
      </form>
    </div>
  );
};

export default AddPropertyForm;
