"use client";

import React, { useState } from "react";
import axios from "axios";

const NEXT_PUBLIC_API_URL = process.env.NEXT_PUBLIC_API_URL;

const departments = [
  "Sales and Marketing",
  "Administration",
  "Account and Finance",
  "Property Management",
  "Maintenance",
];

const yesNoOptions = [
  { value: "true", label: "Yes" },
  { value: "false", label: "No" },
];

const skillOptions = [1, 2, 3, 4, 5];

const CareerForm: React.FC = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    email: "",
    department: "",
    position: "",
    yearsOfExperience: "",
    address: "",
    currentJobStatus: "",
    communicationSkills: "",
    salesSkills: "",
    negotiationSkills: "",
    realEstateLicense: "false",
    willingToWorkWeekends: "false",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? value === "true" : value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${NEXT_PUBLIC_API_URL}/api/careers`, {
        ...formData,
        realEstateLicense: formData.realEstateLicense === "true",
        willingToWorkWeekends: formData.willingToWorkWeekends === "true",
      });
      console.log("Application submitted successfully:", response.data);
      setFormData({
        firstName: "",
        lastName: "",
        phoneNumber: "",
        email: "",
        department: "",
        position: "",
        yearsOfExperience: "",
        address: "",
        currentJobStatus: "",
        communicationSkills: "",
        salesSkills: "",
        negotiationSkills: "",
        realEstateLicense: "false",
        willingToWorkWeekends: "false",
      });
    } catch (error) {
      console.error("Error submitting application:", error);
    }
  };

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-6">
        <div className="mx-auto max-w-screen-sm text-center">
          <h2 className="text-xl text-darkGold font-extrabold bg-black shadow-md p-2 rounded-xl bg-opacity-80 backdrop-blur-2xl backdrop-saturate-200 inline-block">
            Career Application Form
          </h2>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-lg font-bold text-gray-700">
              First Name
            </label>
            <input
              type="text"
              name="firstName"
              className="mt-1 block capitalize w-full p-2 border border-gray-300 rounded-md"
              value={formData.firstName}
              onChange={handleChange}
              spellCheck="true"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-lg font-bold text-gray-700">
              Last Name
            </label>
            <input
              type="text"
              name="lastName"
              className="mt-1 block w-full capitalize  p-2 border border-gray-300 rounded-md"
              value={formData.lastName}
              onChange={handleChange}
              spellCheck="true"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-lg font-bold text-gray-700">
              Phone Number
            </label>
            <input
              type="text"
              name="phoneNumber"
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
              value={formData.phoneNumber}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-lg font-bold text-gray-700">
              Email
            </label>
            <input
              type="email"
              name="email"
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
              value={formData.email}
              onChange={handleChange}
              spellCheck="true"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-lg font-bold text-gray-700">
              Department
            </label>
            <select
              name="department"
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
              value={formData.department}
              onChange={handleChange}
              required
            >
              <option value="">Select Department</option>
              {departments.map((dept) => (
                <option key={dept} value={dept}>
                  {dept}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-lg font-bold text-gray-700">
              Position
            </label>
            <input
              type="text"
              name="position"
              className="mt-1 block w-full capitalize  p-2 border border-gray-300 rounded-md"
              value={formData.position}
              onChange={handleChange}
              spellCheck="true"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-lg font-bold text-gray-700">
              Years of Experience
            </label>
            <input
              type="number"
              name="yearsOfExperience"
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
              value={formData.yearsOfExperience}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-lg font-bold text-gray-700">
              Address
            </label>
            <input
              type="text"
              name="address"
              className="mt-1 block w-full capitalize  p-2 border border-gray-300 rounded-md"
              value={formData.address}
              onChange={handleChange}
              spellCheck="true"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-lg font-bold text-gray-700">
              Current Job Status
            </label>
            <input
              type="text"
              name="currentJobStatus"
              className="mt-1 block w-full capitalize  p-2 border border-gray-300 rounded-md"
              value={formData.currentJobStatus}
              onChange={handleChange}
              spellCheck="true"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-lg font-bold text-gray-700">
              Rate Your Communication Skills (1-5)
            </label>
            <select
              name="communicationSkills"
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
              value={formData.communicationSkills}
              onChange={handleChange}
              required
            >
              {skillOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-lg font-bold text-gray-700">
              Rate Your Sales Skills (1-5)
            </label>
            <select
              name="salesSkills"
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
              value={formData.salesSkills}
              onChange={handleChange}
              required
            >
              {skillOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-lg font-bold text-gray-700">
              Rate Your Negotiation Skills (1-5)
            </label>
            <select
              name="negotiationSkills"
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
              value={formData.negotiationSkills}
              onChange={handleChange}
              required
            >
              {skillOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-4">
            <label className="block text-lg font-bold text-gray-700">
              Real Estate License
            </label>
            <select
              name="realEstateLicense"
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
              value={formData.realEstateLicense}
              onChange={handleChange}
              required
            >
              <option value="false">No</option>
              <option value="true">Yes</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-lg font-bold text-gray-700">
              Willing to Work Weekends
            </label>
            <select
              name="willingToWorkWeekends"
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
              value={formData.willingToWorkWeekends}
              onChange={handleChange}
              required
            >
              <option value="false">No</option>
              <option value="true">Yes</option>
            </select>
          </div>
          <button
            type="submit"
            className="button flex items-center bg-slate-700 hover:bg-blue-700 text-slate-100 text-lg py-1 px-4"
          >
            Submit Application
          </button>
        </form>
      </div>
    </div>
  );
};

export default CareerForm;
