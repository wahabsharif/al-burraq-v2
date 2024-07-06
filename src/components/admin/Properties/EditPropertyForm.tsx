"use client";

import React, { useState } from "react";
import axios from "axios";

interface EditPropertyFormProps {
  property: Property;
  onUpdateSuccess: () => void; // Callback function to handle update success
}

interface Property {
  _id: string;
  title: string;
  description: string;
  price: number;
}

const EditPropertyForm: React.FC<EditPropertyFormProps> = ({
  property,
  onUpdateSuccess,
}) => {
  const [formData, setFormData] = useState({
    title: property.title,
    description: property.description,
    price: property.price.toString(),
  });

  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [editMode, setEditMode] = useState<boolean>(true); // State to toggle edit mode

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await axios.put<Property>(
        `http://localhost:5000/api/properties/${property._id}`,
        formData
      );
      console.log("Property updated:", response.data);
      setSuccessMessage("Property updated successfully.");
      setEditMode(false); // Hide edit form on success
      onUpdateSuccess(); // Invoke callback to handle success action in parent component
    } catch (error) {
      console.error("Error updating property:", error);
      setErrorMessage("Failed to update property.");
      setTimeout(() => setErrorMessage(null), 2000); // Clear error message after 2 seconds
    }
  };

  return (
    <div>
      {editMode ? (
        <div>
          <h3>Edit Property</h3>
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
            <button type="submit">Update Property</button>
          </form>
        </div>
      ) : (
        successMessage && (
          <div className="success-message">{successMessage}</div>
        )
      )}
      {errorMessage && <div className="error-message">{errorMessage}</div>}
    </div>
  );
};

export default EditPropertyForm;
