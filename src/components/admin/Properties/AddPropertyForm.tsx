"use client";
import React, { useState } from "react";
import axios from "axios";
import slugify from "slugify";
import Image from "next/image";

interface FormData {
  title: string;
  description: string;
  price: string;
  location: string;
  image: File | null;
  purpose: string;
  propertyType: string;
  area: string;
  slug: string;
}

const NEXT_PUBLIC_API_URL = process.env.NEXT_PUBLIC_API_URL;

const AddPropertyForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    title: "",
    description: "",
    price: "",
    location: "",
    image: null,
    purpose: "",
    propertyType: "",
    area: "",
    slug: "",
  });

  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);
  const [imageURL, setImageURL] = useState<string>("");

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
      ...(name === "title" && { slug: slugify(value, { lower: true }) }), // Auto-generate slug
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const file = e.target.files[0];
      setFormData({ ...formData, image: file });

      // Create a new FileReader instance
      const reader = new FileReader();

      // When the file is loaded, set the image URL state
      reader.onload = () => {
        if (typeof reader.result === "string") {
          setImageURL(reader.result);
        }
      };

      // Read the file as a data URL
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      let imageUrl = "";

      if (formData.image) {
        // Upload the image to ImgBB to get the URL
        const uploadData = new FormData();
        uploadData.append("image", formData.image);

        const imgBBResponse = await axios.post(
          `https://api.imgbb.com/1/upload?key=a53c2a4a94f3dd313d50711ac901dc17`,
          uploadData
        );

        imageUrl = imgBBResponse.data.data.url;
      }

      const response = await axios.post(
        `${NEXT_PUBLIC_API_URL}/api/properties`,
        {
          title: formData.title,
          description: formData.description,
          price: formData.price,
          location: formData.location,
          image: imageUrl,
          purpose: formData.purpose,
          propertyType: formData.propertyType,
          area: formData.area,
          slug: formData.slug,
        }
      );

      console.log("Property created:", response.data);

      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
        setFormData({
          title: "",
          description: "",
          price: "",
          location: "",
          image: null,
          purpose: "",
          propertyType: "",
          area: "",
          slug: "",
        });
        setImageURL("");
      }, 3000);
    } catch (error) {
      console.error("Error creating property:", error);
      setError("Failed to create property. Please try again.");
    }
  };

  return (
    <section className="px-10 mb-5 h-full w-full">
      {error && (
        <div className="bg-red-200 text-red-800 p-3 mb-4 rounded">{error}</div>
      )}
      {success && (
        <div className="bg-green-200 text-green-800 p-3 mb-4 rounded">
          Property created successfully!
        </div>
      )}
      <div className="mx-auto max-w-screen-sm text-center">
        <h2 className="text-3xl text-darkGold font-extrabold mb-4 mt-4 lg:mb-16 bg-black shadow-md p-4 rounded-xl bg-opacity-80 backdrop-blur-2xl backdrop-saturate-200 inline-block">
          Add Properties
        </h2>
      </div>{" "}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="text-start">
            <label className="block mb-2 text-xl font-medium text-gray-900 dark:text-white">
              Title
            </label>
            <input
              className="bg-slate-700 border border-gray-300 text-gray-900 text-xl rounded-lg focus:ring-slate-800 focus:border-slate-800 block w-full p-4 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-slate-800 dark:focus:border-slate-800"
              name="title"
              type="text"
              value={formData.title}
              onChange={handleChange}
              placeholder="Enter The Title"
              required
            />
          </div>
          <div className="text-start">
            <label className="block mb-2 text-xl font-medium text-gray-900 dark:text-white">
              Slug
            </label>
            <input
              className="bg-slate-700 border border-gray-300 text-gray-900 text-xl rounded-lg focus:ring-slate-800 focus:border-slate-800 block w-full p-4 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-slate-800 dark:focus:border-slate-800"
              name="slug"
              type="text"
              value={formData.slug}
              onChange={handleChange}
              placeholder="Enter The Slug"
              required
              readOnly
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="text-start">
            <label className="block mb-2 text-xl font-medium text-gray-900 dark:text-white">
              Area
            </label>
            <input
              className="bg-slate-700 border border-gray-300 text-gray-900 text-xl rounded-lg focus:ring-slate-800 focus:border-slate-800 block w-full p-4 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-slate-800 dark:focus:border-slate-800"
              type="text"
              name="area"
              value={formData.area}
              onChange={handleChange}
              placeholder=" Enter The Area"
              required
            />
          </div>
          <div className="text-start">
            <label className="block mb-2 text-xl font-medium text-gray-900 dark:text-white">
              Price
            </label>
            <input
              className="bg-slate-700 border border-gray-300 text-gray-900 text-xl rounded-lg focus:ring-slate-800 focus:border-slate-800 block w-full p-4 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-slate-800 dark:focus:border-slate-800"
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              placeholder=" Enter The Price"
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
              className="bg-slate-700 border border-gray-300 text-gray-900 text-xl rounded-lg focus:ring-slate-800 focus:border-slate-800 block w-full p-4 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-slate-800 dark:focus:border-slate-800"
              name="purpose"
              value={formData.purpose}
              onChange={handleChange}
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
              className="bg-slate-700 border border-gray-300 text-gray-900 text-xl rounded-lg focus:ring-slate-800 focus:border-slate-800 block w-full p-4 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-slate-800 dark:focus:border-slate-800"
              name="propertyType"
              value={formData.propertyType}
              onChange={handleChange}
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

        <div>
          <label className="block mb-2 text-xl font-medium text-gray-900 dark:text-white">
            Location
          </label>
          <input
            className="bg-slate-700 border border-gray-300 text-gray-900 text-xl rounded-lg focus:ring-slate-800 focus:border-slate-800 block w-full p-4 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-slate-800 dark:focus:border-slate-800"
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            placeholder=" Enter The Location"
            required
          />
        </div>

        <div>
          <label className="block mb-2 text-xl font-medium text-gray-900 dark:text-white">
            Description
          </label>
          <textarea
            className="bg-slate-700 border border-gray-300 text-gray-900 text-xl rounded-lg focus:ring-slate-800 focus:border-slate-800 block w-full p-4 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-slate-800 dark:focus:border-slate-800"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Enter The Description"
            rows={6}
            required
          />
        </div>

        <div>
          <label className="block mb-2 text-xl font-medium text-gray-900 dark:text-white">
            Image
          </label>
          <input
            className="bg-slate-700 border border-gray-300 text-gray-900 text-xl rounded-lg focus:ring-slate-800 focus:border-slate-800 block w-full p-4 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-slate-800 dark:focus:border-slate-800"
            type="file"
            name="image"
            onChange={handleFileChange}
            accept="image/*"
            required
          />
          {imageURL && (
            <div className="w-full h-auto mt-2">
              <Image src={imageURL} alt="Preview" width={100} height={100} />
            </div>
          )}
        </div>
        <button
          type="submit"
          className="bg-slate-900 text-white p-4 rounded-lg hover:bg-slate-700 focus:ring-4 focus:ring-slate-700"
        >
          Submit
        </button>
      </form>
    </section>
  );
};

export default AddPropertyForm;
