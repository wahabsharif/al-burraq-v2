import React, { useState } from "react";
import axios from "axios";
import Image from "next/image";
import slugify from "slugify";

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
  slug: string; // New field
}

const NEXT_PUBLIC_API_URL = process.env.NEXT_PUBLIC_API_URL;

const EditPropertyForm: React.FC<EditPropertyFormProps> = ({
  property,
  onUpdateSuccess,
}) => {
  const [formData, setFormData] = useState<Partial<Property>>({
    title: property.title,
    description: property.description,
    price: property.price,
    location: property.location,
    image: property.image,
    purpose: property.purpose,
    propertyType: property.propertyType,
    area: property.area,
    slug: property.slug || slugify(property.title, { lower: true }),
  });

  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
      slug:
        name === "title" ? slugify(value, { lower: true }) : prevFormData.slug,
    }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const imageUrls = files.map((file) => URL.createObjectURL(file));
    setFormData({ ...formData, image: imageUrls });
  };

  const handleRemoveImage = (index: number) => {
    const updatedImages = [...formData.image!];
    updatedImages.splice(index, 1);
    setFormData({ ...formData, image: updatedImages });
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
      onUpdateSuccess(); // Invoke callback to handle success action in parent component
    } catch (error) {
      console.error("Error updating property:", error);
      setErrorMessage("Failed to update property.");
      setTimeout(() => setErrorMessage(null), 2000); // Clear error message after 2 seconds
    }
  };

  return (
    <section className="px-10 mb-5 h-full w-full bg-gray-100 rounded-lg shadow-md">
      <div className="mx-auto max-w-screen-sm text-center">
        <h3 className="text-3xl text-darkGold font-extrabold mb-4 mt-4 lg:mb-16 bg-black shadow-md p-4 rounded-xl bg-opacity-80 backdrop-blur-2xl backdrop-saturate-200 inline-block">
          Edit Property
        </h3>
      </div>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="text-start">
            <label className="block mb-2 text-xl font-medium text-gray-900 dark:text-white">
              Title
            </label>
            <input
              type="text"
              name="title"
              value={formData.title || ""}
              onChange={handleChange}
              className="bg-slate-700 border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-slate-800 focus:border-slate-800 block w-full p-4 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-slate-800 dark:focus:border-slate-800"
              placeholder="Title"
              required
            />
          </div>
          <div className="text-start">
            <label className="block mb-2 text-xl font-medium text-gray-900 dark:text-white">
              Slug
            </label>
            <input
              type="text"
              name="slug"
              value={formData.slug || ""}
              onChange={handleChange}
              className="bg-slate-700 border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-slate-800 focus:border-slate-800 block w-full p-4 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-slate-800 dark:focus:border-slate-800"
              placeholder="Slug"
              required
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="text-start">
            <label className="block mb-2 text-xl font-medium text-gray-900 dark:text-white">
              Purpose
            </label>
            <select
              name="purpose"
              value={formData.purpose || ""}
              onChange={handleChange}
              className="bg-slate-700 border border-gray-300 text-gray-900 text-xl rounded-lg focus:ring-slate-800 focus:border-slate-800 block w-full p-4 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-slate-800 dark:focus:border-slate-800"
              required
            >
              <option value="">Select Purpose</option>
              <option value="rent">Rent</option>
              <option value="buy">Buy</option>
              <option value="sale">Sale</option>
            </select>
          </div>
          <div className="text-start">
            <label className="block mb-2 text-xl font-medium text-gray-900 dark:text-white">
              Property Type
            </label>
            <select
              name="propertyType"
              value={formData.propertyType || ""}
              onChange={handleChange}
              className="bg-slate-700 border border-gray-300 text-gray-900 text-xl rounded-lg focus:ring-slate-800 focus:border-slate-800 block w-full p-4 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-slate-800 dark:focus:border-slate-800"
              required
            >
              <option value="">Select Property Type</option>
              <option value="Offices">Offices</option>
              <option value="apartments">Apartments</option>
              <option value="lands">Lands</option>
              <option value="penthouses">Penthouses</option>
              <option value="shops">Shops</option>
              <option value="houses">Houses</option>
              <option value="townhouses">Townhouses</option>
              <option value="villas">Villas</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="text-start">
            <label className="block mb-2 text-xl font-medium text-gray-900 dark:text-white">
              Area
            </label>
            <input
              type="number"
              name="area"
              value={formData.area || ""}
              onChange={handleChange}
              className="bg-slate-700 border border-gray-300 text-gray-900 text-xl rounded-lg focus:ring-slate-800 focus:border-slate-800 block w-full p-4 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-slate-800 dark:focus:border-slate-800"
              placeholder="Area"
              required
            />
          </div>
          <div className="text-start">
            <label className="block mb-2 text-xl font-medium text-gray-900 dark:text-white">
              Price
            </label>
            <input
              type="number"
              name="price"
              value={formData.price || ""}
              onChange={handleChange}
              className="bg-slate-700 border border-gray-300 text-gray-900 text-xl rounded-lg focus:ring-slate-800 focus:border-slate-800 block w-full p-4 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-slate-800 dark:focus:border-slate-800"
              placeholder="Price"
              required
            />
          </div>
        </div>

        <div className="text-start">
          <label className="block mb-2 text-xl font-medium text-gray-900 dark:text-white">
            Location
          </label>
          <input
            type="text"
            name="location"
            value={formData.location || ""}
            onChange={handleChange}
            className="bg-slate-700 border border-gray-300 text-gray-900 text-xl rounded-lg focus:ring-slate-800 focus:border-slate-800 block w-full p-4 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-slate-800 dark:focus:border-slate-800"
            placeholder="Location"
            required
          />
        </div>
        <div className="text-start">
          <label className="block mb-2 text-xl font-medium text-gray-900 dark:text-white">
            Description
          </label>
          <textarea
            name="description"
            value={formData.description || ""}
            onChange={handleChange}
            className="bg-slate-700 border border-gray-300 text-gray-900 text-xl rounded-lg focus:ring-slate-800 focus:border-slate-800 block w-full p-4 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-slate-800 dark:focus:border-slate-800"
            placeholder="Description"
            rows={4}
            required
          />
        </div>

        <div className="grid grid-cols-1 gap-4">
          <div className="text-start">
            <label className="block mb-2 text-xl font-medium text-gray-900 dark:text-white">
              Property Images
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              multiple
              className="bg-slate-700 border border-gray-300 text-gray-900 text-xl rounded-lg focus:ring-slate-800 focus:border-slate-800 block w-full p-4 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-slate-800 dark:focus:border-slate-800"
            />
          </div>
          <div className="grid grid-cols-2 gap-2">
            {formData.image &&
              formData.image.map((imageUrl, index) => (
                <div key={index} className="relative">
                  <Image
                    src={imageUrl}
                    alt={`Image ${index}`}
                    className="rounded-lg shadow-md"
                    width={200}
                    height={200}
                  />
                  <button
                    type="button"
                    className="absolute top-2 right-2 bg-red-500 text-slate-100 px-2 py-1 rounded-lg"
                    onClick={() => handleRemoveImage(index)}
                  >
                    Remove
                  </button>
                </div>
              ))}
          </div>
        </div>

        <div className="py-5">
          <button
            type="submit"
            className="bg-green-800 text-slate-100 py-2 px-4 rounded-lg"
          >
            Update Property
          </button>
        </div>
      </form>

      {successMessage && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-2 rounded-lg relative mt-4">
          {successMessage}
          <span
            className="absolute top-0 bottom-0 right-0 px-4 py-3 cursor-pointer"
            onClick={() => setSuccessMessage(null)}
          >
            &times;
          </span>
        </div>
      )}
      {errorMessage && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mt-4">
          {errorMessage}
          <span
            className="absolute top-0 bottom-0 right-0 px-4 py-3 cursor-pointer"
            onClick={() => setErrorMessage(null)}
          >
            &times;
          </span>
        </div>
      )}
    </section>
  );
};

export default EditPropertyForm;
