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
              className="bg-gray-50 border border-gray-300 text-gray-900 text-xl rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-4 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
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
              className="bg-gray-50 border border-gray-300 text-gray-900 text-xl rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-4 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
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
              className="bg-gray-50 border border-gray-300 text-gray-900 text-xl rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-4 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
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
              className="bg-gray-50 border border-gray-300 text-gray-900 text-xl rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-4 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              placeholder="Enter The Location"
              required
            />
          </div>
          <div>
            <label className="block mb-2 text-xl font-medium text-gray-900 dark:text-white">
              Images
            </label>
            <input
              className="file-input file-input-bordered file-input-info w-full max-w-xs"
              type="file"
              onChange={handleFileChange}
            />
          </div>
          <div>
            <button
              type="submit"
              className="button px-5 py-3 text-2xl text-center"
            >
              Create
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddPropertyForm;
