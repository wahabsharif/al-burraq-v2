"use client";

import React, { useState } from "react";
import axios from "axios";
import Image from "next/image";

interface EditPropertyFormProps {
  property: Property;
  onUpdateSuccess: () => void; // Callback function to handle update success
}

interface Property {
  _id: string;
  title: string;
  description: string;
  price: number;
  location: string;
  image: string[]; // Adjusted to string array for image URLs
  purpose: string; // New field
  propertyType: string; // New field
  area: number; // New field
}

const NEXT_PUBLIC_API_URL = process.env.NEXT_PUBLIC_API_URL;

const EditPropertyForm: React.FC<EditPropertyFormProps> = ({
  property,
  onUpdateSuccess,
}) => {
  const [formData, setFormData] = useState<Partial<Property>>({
    title: property.title,
    description: property.description,
    price: property.price, // Directly assign without converting to string
    location: property.location,
    image: property.image, // Convert array to comma-separated string for display
    purpose: property.purpose,
    propertyType: property.propertyType,
    area: property.area,
  });

  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [editMode, setEditMode] = useState<boolean>(true); // State to toggle edit mode
  const [viewImageIndex, setViewImageIndex] = useState<number | null>(null); // State to track which image to view

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await axios.put<Property>(
        `${NEXT_PUBLIC_API_URL}/api/properties/${property._id}`,
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

  const handleImageClick = (index: number) => {
    setViewImageIndex(index);
  };

  const handleCloseImage = () => {
    setViewImageIndex(null);
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      {editMode ? (
        <div className="bg-white shadow-md rounded-lg p-6">
          <h3 className="text-2xl font-semibold mb-4">Edit Property</h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-700">Title</label>
                <input
                  type="text"
                  name="title"
                  value={formData.title || ""}
                  onChange={handleChange}
                  className="form-input w-full mt-1"
                  placeholder="Title"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700">Price</label>
                <input
                  type="number"
                  name="price"
                  value={formData.price || ""}
                  onChange={handleChange}
                  className="form-input w-full mt-1"
                  placeholder="Price"
                  required
                />
              </div>
            </div>
            <div>
              <label className="block text-gray-700">Description</label>
              <textarea
                name="description"
                value={formData.description || ""}
                onChange={handleChange}
                className="form-textarea w-full mt-1"
                placeholder="Description"
                rows={4}
                required
              />
            </div>
            <div>
              <label className="block text-gray-700">Location</label>
              <input
                type="text"
                name="location"
                value={formData.location || ""}
                onChange={handleChange}
                className="form-input w-full mt-1"
                placeholder="Location"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700">Images</label>
              <div className="flex flex-wrap gap-2 mt-1">
                {formData.image && formData.image.length > 0 ? (
                  formData.image.map((imageUrl, index) => (
                    <div
                      key={index}
                      className="cursor-pointer relative"
                      onClick={() => handleImageClick(index)}
                    >
                      <Image
                        src={imageUrl}
                        alt={formData.title || ""}
                        width={100}
                        height={100}
                        className="rounded-lg"
                      />
                    </div>
                  ))
                ) : (
                  <div className="text-gray-500">No images uploaded</div>
                )}
              </div>
            </div>
            <div>
              <label className="block text-gray-700">Purpose</label>
              <input
                type="text"
                name="purpose"
                value={formData.purpose || ""}
                onChange={handleChange}
                className="form-input w-full mt-1"
                placeholder="Purpose"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700">Property Type</label>
              <input
                type="text"
                name="propertyType"
                value={formData.propertyType || ""}
                onChange={handleChange}
                className="form-input w-full mt-1"
                placeholder="Property Type"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700">Area</label>
              <input
                type="number"
                name="area"
                value={formData.area || ""}
                onChange={handleChange}
                className="form-input w-full mt-1"
                placeholder="Area"
                required
              />
            </div>
            <button
              type="submit"
              className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-300"
            >
              Update Property
            </button>
          </form>
        </div>
      ) : (
        successMessage && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative">
            {successMessage}
            <span
              className="absolute top-0 bottom-0 right-0 px-4 py-3"
              onClick={() => setSuccessMessage(null)}
            >
              &times;
            </span>
          </div>
        )
      )}
      {errorMessage && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mt-4">
          {errorMessage}
          <span
            className="absolute top-0 bottom-0 right-0 px-4 py-3"
            onClick={() => setErrorMessage(null)}
          >
            &times;
          </span>
        </div>
      )}

      {/* Lightbox for displaying image */}
      {viewImageIndex !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="max-w-screen-lg relative">
            <button
              className="absolute top-4 right-4 text-white text-2xl focus:outline-none"
              onClick={handleCloseImage}
            >
              &times;
            </button>
            <Image
              src={formData.image?.[viewImageIndex] || ""}
              alt={formData.title || ""}
              layout="responsive"
              width={800}
              height={600}
              className="rounded-lg"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default EditPropertyForm;
