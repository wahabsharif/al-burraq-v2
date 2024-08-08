"use client";

import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation"; // Import useRouter

const NEXT_PUBLIC_API_URL = process.env.NEXT_PUBLIC_API_URL;

const departments = [
  "Sales and Marketing",
  "Administration",
  "Account and Finance",
  "Property Management",
  "Maintenance",
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

  const [formError, setFormError] = useState<string | null>(null); // State to hold validation errors
  const [fieldErrors, setFieldErrors] = useState<{ [key: string]: boolean }>({
    firstName: false,
    lastName: false,
    phoneNumber: false,
    email: false,
    department: false,
    position: false,
    yearsOfExperience: false,
    address: false,
    currentJobStatus: false,
    communicationSkills: false,
    salesSkills: false,
    negotiationSkills: false,
  });

  const router = useRouter();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? value === "true" : value,
    });
    setFormError(null); // Clear error on change
    setFieldErrors({ ...fieldErrors, [name]: false }); // Clear individual field error on change
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Check for empty required fields
    const newFieldErrors = {
      firstName: !formData.firstName,
      lastName: !formData.lastName,
      phoneNumber: !formData.phoneNumber,
      email: !formData.email,
      department: !formData.department,
      position: !formData.position,
      yearsOfExperience: !formData.yearsOfExperience,
      address: !formData.address,
      currentJobStatus: !formData.currentJobStatus,
      communicationSkills: !formData.communicationSkills,
      salesSkills: !formData.salesSkills,
      negotiationSkills: !formData.negotiationSkills,
    };

    if (Object.values(newFieldErrors).some((error) => error)) {
      setFieldErrors(newFieldErrors);
      setFormError("Please fill out all required fields.");
      return;
    }

    try {
      await axios.post(`${NEXT_PUBLIC_API_URL}/api/careers`, {
        ...formData,
        realEstateLicense: formData.realEstateLicense === "true",
        willingToWorkWeekends: formData.willingToWorkWeekends === "true",
      });

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

      router.push("/career");
    } catch (error) {
      console.error("Error submitting application:", error);
    }
  };

  return (
    <section className="p-2 bg-gray-100 min-h-screen">
      <div className="flex justify-center items-center my-5">
        <div className="inline-block bg-black shadow-md p-4 rounded-xl bg-opacity-80 backdrop-blur-2xl backdrop-saturate-200">
          <h2 className="text-md font-bold text-gradient md:text-xl lg:text-3xl">
            Job Application Form.
          </h2>
        </div>
      </div>
      <div className="max-w-4xl mx-auto bg-black shadow-md p-4 rounded-xl bg-opacity-80 backdrop-blur-2xl backdrop-saturate-200">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-lg font-semibold text-gray-700 mb-1">
                First Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="firstName"
                className={`block w-full p-3 capitalize border ${
                  fieldErrors.firstName ? "border-red-500" : "border-gray-300"
                } rounded-md focus:ring-2 focus:ring-slate-500`}
                value={formData.firstName}
                onChange={handleChange}
                spellCheck="true"
                required
              />
            </div>
            <div>
              <label className="block text-lg font-semibold text-gray-700 mb-1">
                Last Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="lastName"
                className={`block w-full p-3 capitalize border ${
                  fieldErrors.lastName ? "border-red-500" : "border-gray-300"
                } rounded-md focus:ring-2 focus:ring-slate-500`}
                value={formData.lastName}
                onChange={handleChange}
                spellCheck="true"
                required
              />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-lg font-semibold text-gray-700 mb-1">
                Phone Number <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="phoneNumber"
                className={`block w-full p-3 border ${
                  fieldErrors.phoneNumber ? "border-red-500" : "border-gray-300"
                } rounded-md focus:ring-2 focus:ring-slate-500`}
                value={formData.phoneNumber}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label className="block text-lg font-semibold text-gray-700 mb-1">
                Email <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                name="email"
                className={`block w-full p-3 border ${
                  fieldErrors.email ? "border-red-500" : "border-gray-300"
                } rounded-md focus:ring-2 focus:ring-slate-500`}
                value={formData.email}
                onChange={handleChange}
                spellCheck="true"
                required
              />
            </div>
          </div>
          <div>
            <label className="block text-lg font-semibold text-gray-700 mb-1">
              Address <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="address"
              className={`block w-full p-3 capitalize border ${
                fieldErrors.address ? "border-red-500" : "border-gray-300"
              } rounded-md focus:ring-2 focus:ring-slate-500`}
              value={formData.address}
              onChange={handleChange}
              spellCheck="true"
              required
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-lg font-semibold text-gray-700 mb-1">
                Department <span className="text-red-500">*</span>
              </label>
              <select
                name="department"
                className={`block w-full p-3 border ${
                  fieldErrors.department ? "border-red-500" : "border-gray-300"
                } rounded-md focus:ring-2 focus:ring-slate-500`}
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
            <div>
              <label className="block text-lg capitalize font-semibold text-gray-700 mb-1">
                Position <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="position"
                className={`block w-full p-3 capitalize border ${
                  fieldErrors.position ? "border-red-500" : "border-gray-300"
                } rounded-md focus:ring-2 focus:ring-slate-500`}
                value={formData.position}
                onChange={handleChange}
                spellCheck="true"
                required
              />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-lg font-semibold text-gray-700 mb-1">
                Years of Experience <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                name="yearsOfExperience"
                className={`block w-full p-3 border ${
                  fieldErrors.yearsOfExperience
                    ? "border-red-500"
                    : "border-gray-300"
                } rounded-md focus:ring-2 focus:ring-slate-500`}
                value={formData.yearsOfExperience}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label className="block text-lg font-semibold text-gray-700 mb-1">
                Current Job Status <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="currentJobStatus"
                className={`block w-full p-3 capitalize border ${
                  fieldErrors.currentJobStatus
                    ? "border-red-500"
                    : "border-gray-300"
                } rounded-md focus:ring-2 focus:ring-slate-500`}
                value={formData.currentJobStatus}
                onChange={handleChange}
                spellCheck="true"
                required
              />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-lg font-semibold text-gray-700 mb-1">
                Communication Skills (1-5){" "}
                <span className="text-red-500">*</span>
              </label>
              <select
                name="communicationSkills"
                className={`block w-full p-3 border ${
                  fieldErrors.communicationSkills
                    ? "border-red-500"
                    : "border-gray-300"
                } rounded-md focus:ring-2 focus:ring-slate-500`}
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
            <div>
              <label className="block text-lg font-semibold text-gray-700 mb-1">
                Sales Skills (1-5) <span className="text-red-500">*</span>
              </label>
              <select
                name="salesSkills"
                className={`block w-full p-3 border ${
                  fieldErrors.salesSkills ? "border-red-500" : "border-gray-300"
                } rounded-md focus:ring-2 focus:ring-slate-500`}
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
            <div>
              <label className="block text-lg font-semibold text-gray-700 mb-1">
                Negotiation Skills (1-5) <span className="text-red-500">*</span>
              </label>
              <select
                name="negotiationSkills"
                className={`block w-full p-3 border ${
                  fieldErrors.negotiationSkills
                    ? "border-red-500"
                    : "border-gray-300"
                } rounded-md focus:ring-2 focus:ring-slate-500`}
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
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-lg font-semibold text-gray-700 mb-1">
                Real Estate License
              </label>
              <select
                name="realEstateLicense"
                className="block w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-slate-500"
                value={formData.realEstateLicense}
                onChange={handleChange}
                required
              >
                <option value="false">No</option>
                <option value="true">Yes</option>
              </select>
            </div>
            <div>
              <label className="block text-lg font-semibold text-gray-700 mb-1">
                Willing to Work Weekends
              </label>
              <select
                name="willingToWorkWeekends"
                className="block w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-slate-500"
                value={formData.willingToWorkWeekends}
                onChange={handleChange}
                required
              >
                <option value="false">No</option>
                <option value="true">Yes</option>
              </select>
            </div>
          </div>
          {formError && (
            <p className="text-lg text-red-600 text-center font-semibold">
              {formError}
            </p>
          )}
          <div className="flex justify-center">
            <button
              type="submit"
              className=" mt-6 bg-slate-700 hover:bg-slate-800 text-slate-200 text-lg py-2 px-4 rounded-lg transition duration-300 ease-in-out transform hover:scale-105"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default CareerForm;
