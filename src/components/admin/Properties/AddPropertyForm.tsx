"use client";

import React, { useState } from "react";
import axios from "axios";

interface FormData {
  title: string;
  description: string;
  price: string;
  location: string;
  image: File | null;
  purpose: string;
  propertyType: string;
  area: string;
}

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
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
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
          purpose: formData.purpose,
          propertyType: formData.propertyType,
          area: formData.area,
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
        purpose: "",
        propertyType: "",
        area: "",
      });
    } catch (error) {
      console.error("Error creating property:", error);
      // Handle error state or display error message to user
    }
  };

  return (
    <div>
      <div className="mx-auto max-w-screen-sm text-center">
        <h2 className="text-3xl text-darkGold font-extrabold mb-4 mt-4 lg:mb-16 bg-black shadow-md p-4 rounded-xl bg-opacity-80 backdrop-blur-2xl backdrop-saturate-200 inline-block">
          Add Properties
        </h2>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="grid gap-6 mb-6">
          <div>
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
              required
            />
          </div>
          <div>
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
          <div>
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
          <div>
            <label className="block mb-2 text-xl font-medium text-gray-900 dark:text-white">
              Area (sqft)
            </label>
            <input
              className="bg-slate-700 border border-gray-300 text-gray-900 text-xl rounded-lg focus:ring-slate-800 focus:border-slate-800 block w-full p-4 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-slate-800 dark:focus:border-slate-800"
              type="number"
              name="area"
              value={formData.area}
              onChange={handleChange}
              placeholder=" Enter The Area"
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
              required
            />
          </div>
        </div>
        <button
          className="text-white bg-slate-800 hover:bg-slate-800 focus:ring-4 focus:outline-none focus:ring-slate-800 font-medium rounded-lg text-xl w-full sm:w-auto px-5 py-2.5 text-center dark:bg-slate-800 dark:hover:bg-slate-700 dark:focus:ring-slate-800"
          type="submit"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default AddPropertyForm;
