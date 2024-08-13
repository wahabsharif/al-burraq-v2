"use client";
import React, { useState } from "react";
import axios from "axios";
import slugify from "slugify";
import Image from "next/image";
import { useRouter } from "next/navigation"; // Import useRouter

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
  const router = useRouter(); // Initialize useRouter
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
      setFormData((prevData) => ({ ...prevData, image: file }));

      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === "string") {
          setImageURL(reader.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const requiredFields = [
      formData.title,
      formData.description,
      formData.price,
      formData.location,
      formData.purpose,
      formData.propertyType,
      formData.area,
    ];

    if (requiredFields.some((field) => !field)) {
      setError("All fields except image are required.");
      return;
    }

    setError(null);

    try {
      let imageUrl = "";

      if (formData.image) {
        const uploadData = new FormData();
        uploadData.append("image", formData.image);

        const imgBBResponse = await axios.post(
          `https://api.imgbb.com/1/upload?key=a53c2a4a94f3dd313d50711ac901dc17`,
          uploadData
        );

        imageUrl = imgBBResponse.data.data.url;
      }

      await axios.post(`${NEXT_PUBLIC_API_URL}/api/properties`, {
        ...formData,
        image: imageUrl,
      });

      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
        router.push("/admin/properties"); // Redirect to /admin/properties on success
      }, 3000);
    } catch (error) {
      console.error("Error creating property:", error);
      setError("Failed to create property. Please try again.");
    }
  };

  return (
    <section className="px-10 mb-5 h-full w-full">
      <div className="mx-auto max-w-screen-sm text-center">
        <h2 className="text-3xl text-darkGold font-extrabold mb-4 mt-4 lg:mb-16 bg-black shadow-md p-4 rounded-xl bg-opacity-80 backdrop-blur-2xl backdrop-saturate-200 inline-block">
          Add Properties
        </h2>
      </div>
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
              placeholder="Enter The Area"
              required
            />
          </div>
          <div className="text-start">
            <label className="block mb-2 text-xl font-medium text-gray-900 dark:text-white">
              Price
            </label>
            <input
              className="bg-slate-700 border border-gray-300 text-gray-900 text-xl rounded-lg focus:ring-slate-800 focus:border-slate-800 block w-full p-4 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-slate-800 dark:focus:border-slate-800"
              type="text"
              name="price"
              value={formData.price}
              onChange={handleChange}
              placeholder="Enter The Price"
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
            </select>
          </div>
        </div>

        <div className="text-start">
          <label className="block mb-2 text-xl font-medium text-gray-900 dark:text-white">
            Location
          </label>
          <input
            className="bg-slate-700 border border-gray-300 text-gray-900 text-xl rounded-lg focus:ring-slate-800 focus:border-slate-800 block w-full p-4 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-slate-800 dark:focus:border-slate-800"
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            placeholder="Enter The Location"
            required
          />
        </div>

        <div className="text-start">
          <label className="block mb-2 text-xl font-medium text-gray-900 dark:text-white">
            Description
          </label>
          <textarea
            className="bg-slate-700 border border-gray-300 text-gray-900 text-xl rounded-lg focus:ring-slate-800 focus:border-slate-800 block w-full p-4 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-slate-800 dark:focus:border-slate-800"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Enter The Description"
            rows={10}
            required
          />
        </div>
        <div className="text-start">
          <label className="block mb-2 text-xl font-medium text-gray-900 dark:text-white">
            Image
          </label>
          <input
            className="block text-xl text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-slate-700 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
            type="file"
            name="image"
            accept="image/*"
            onChange={handleFileChange}
          />
          {imageURL && (
            <Image
              src={imageURL}
              alt="Property Preview"
              width={300}
              height={300}
              className="mt-2 rounded-lg"
            />
          )}
        </div>
        {error && (
          <p className="text-red-600 font-bold p-2 border border-red-600 rounded-lg">
            {error}
          </p>
        )}
        {success && (
          <p className="text-green-600 font-bold p-2 border border-green-600 rounded-lg">
            Property created successfully!
          </p>
        )}

        <div className="flex justify-start my-5">
          <button
            type="submit"
            className="bg-slate-900 text-xl text-white py-3 px-8 rounded-lg hover:bg-gray-700"
          >
            Submit
          </button>
        </div>
      </form>
    </section>
  );
};

export default AddPropertyForm;
