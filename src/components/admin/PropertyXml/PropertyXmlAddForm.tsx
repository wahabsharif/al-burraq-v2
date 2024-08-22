// src/components/admin/PropertyXml/PropertyXmlAddForm.tsx

"use client";

import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import slugify from "slugify";

const NEXT_PUBLIC_API_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

const PropertyXmlAddForm: React.FC = () => {
  const [formData, setFormData] = useState({
    Property_Ref_No: "",
    Permit_Number: "",
    Property_Status: "live",
    Property_purpose: "Buy",
    Property_Type: "",
    Property_Size: 0,
    Property_Size_Unit: "SQFT",
    Bedrooms: 0,
    Bathrooms: 0,
    Features: "",
    Off_plan: "Yes",
    Portals: [],
    Last_Updated: new Date().toISOString(),
    Property_Title: "",
    Property_Description: "",
    Property_Title_AR: "",
    Property_Description_AR: "",
    Price: 0,
    Rent_Frequency: "Monthly",
    Furnished: "No",
    Images: "",
    Videos: "",
    City: "",
    Locality: "",
    Sub_Locality: "",
    Tower_Name: "",
    Listing_Agent: "",
    Listing_Agent_Phone: "",
    Listing_Agent_Email: "",
    Slug: "",
  });

  const router = useRouter();

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const target = e.target;
    let value = target.value;

    // If the field is Property_Title, auto-generate the Slug
    if (target.name === "Property_Title") {
      const slug = slugify(value, { lower: true, strict: true });
      setFormData({
        ...formData,
        [target.name]: value,
        Slug: slug,
      });
    } else {
      setFormData({
        ...formData,
        [target.name]: value,
      });
    }

    // Handle multiple selections for Portals
    if ("options" in target && target instanceof HTMLSelectElement) {
      const options = target.options;
      const selectedOptions: string[] = [];
      for (let i = 0; i < options.length; i++) {
        if (options[i].selected) {
          selectedOptions.push(options[i].value);
        }
      }
      setFormData({
        ...formData,
        [target.name]: selectedOptions,
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post(`${NEXT_PUBLIC_API_URL}/api/propertyxml`, formData);
      router.push("/propertyxml");
    } catch (error) {
      console.error("Error adding property XML:", error);
    }
  };

  return (
    <div className="container mx-auto">
      <h1 className="text-2xl font-bold mb-4">Add Property XML</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label
            htmlFor="Property_Ref_No"
            className="block text-sm font-medium text-gray-700"
          >
            Property Ref No
          </label>
          <input
            type="text"
            name="Property_Ref_No"
            id="Property_Ref_No"
            value={formData.Property_Ref_No}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
          />
        </div>
        <div>
          <label
            htmlFor="Permit_Number"
            className="block text-sm font-medium text-gray-700"
          >
            Permit Number
          </label>
          <input
            type="text"
            name="Permit_Number"
            id="Permit_Number"
            value={formData.Permit_Number}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
          />
        </div>
        <div>
          <label
            htmlFor="Property_Status"
            className="block text-sm font-medium text-gray-700"
          >
            Property Status
          </label>
          <select
            name="Property_Status"
            id="Property_Status"
            value={formData.Property_Status}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
          >
            <option value="live">Live</option>
            <option value="deleted">Deleted</option>
          </select>
        </div>
        <div>
          <label
            htmlFor="Property_purpose"
            className="block text-sm font-medium text-gray-700"
          >
            Property Purpose
          </label>
          <select
            name="Property_purpose"
            id="Property_purpose"
            value={formData.Property_purpose}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
          >
            <option value="Buy">Buy</option>
            <option value="Rent">Rent</option>
          </select>
        </div>
        <div>
          <label
            htmlFor="Property_Type"
            className="block text-sm font-medium text-gray-700"
          >
            Property Type
          </label>
          <select
            name="Property_Type"
            id="Property_Type"
            value={formData.Property_Type}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
          >
            <option value="Villa">Villa</option>
            <option value="Apartment">Apartment</option>
            <option value="Office">Office</option>
            <option value="Shop">Shop</option>
            <option value="Warehouse">Warehouse</option>
            <option value="Factory">Factory</option>
            <option value="Labour Camp">Labour Camp</option>
            <option value="Other Commercial">Other Commercial</option>
            <option value="Commercial Building">Commercial Building</option>
            <option value="Residential Floor">Residential Floor</option>
            <option value="Commercial Floor">Commercial Floor</option>
            <option value="Residential Land">Residential Land</option>
            <option value="Commercial Land">Commercial Land</option>
            <option value="Townhouse">Townhouse</option>
            <option value="Residential Building">Residential Building</option>
            <option value="Hotel Apartment">Hotel Apartment</option>
            <option value="Loft Apartment">Loft Apartment</option>
            <option value="Duplex">Duplex</option>
            <option value="Pent House">Pent House</option>
          </select>
        </div>
        <div>
          <label
            htmlFor="Property_Size"
            className="block text-sm font-medium text-gray-700"
          >
            Property Size
          </label>
          <input
            type="number"
            name="Property_Size"
            id="Property_Size"
            value={formData.Property_Size}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
          />
        </div>
        <div>
          <label
            htmlFor="Property_Size_Unit"
            className="block text-sm font-medium text-gray-700"
          >
            Property Size Unit
          </label>
          <select
            name="Property_Size_Unit"
            id="Property_Size_Unit"
            value={formData.Property_Size_Unit}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
          >
            <option value="SQFT">SQFT</option>
            {/* Add other units if necessary */}
          </select>
        </div>
        <div>
          <label
            htmlFor="Bedrooms"
            className="block text-sm font-medium text-gray-700"
          >
            Bedrooms
          </label>
          <input
            type="number"
            name="Bedrooms"
            id="Bedrooms"
            value={formData.Bedrooms}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
          />
        </div>
        <div>
          <label
            htmlFor="Bathrooms"
            className="block text-sm font-medium text-gray-700"
          >
            Bathrooms
          </label>
          <input
            type="number"
            name="Bathrooms"
            id="Bathrooms"
            value={formData.Bathrooms}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
          />
        </div>
        <div>
          <label
            htmlFor="Features"
            className="block text-sm font-medium text-gray-700"
          >
            Features
          </label>
          <textarea
            name="Features"
            id="Features"
            value={formData.Features}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
          />
        </div>
        <div>
          <label
            htmlFor="Off_plan"
            className="block text-sm font-medium text-gray-700"
          >
            Off Plan
          </label>
          <select
            name="Off_plan"
            id="Off_plan"
            value={formData.Off_plan}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
          >
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>
        </div>
        <div>
          <label
            htmlFor="Portals"
            className="block text-sm font-medium text-gray-700"
          >
            Portals
          </label>
          <select
            name="Portals"
            id="Portals"
            multiple
            value={formData.Portals}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
          >
            <option value="Bayut">Bayut</option>
            <option value="PropertyFinder">Property Finder</option>
            <option value="Dubizzle">Dubizzle</option>
          </select>
        </div>
        <div>
          <label
            htmlFor="Last_Updated"
            className="block text-sm font-medium text-gray-700"
          >
            Last Updated
          </label>
          <input
            type="datetime-local"
            name="Last_Updated"
            id="Last_Updated"
            value={formData.Last_Updated}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
          />
        </div>
        <div>
          <label
            htmlFor="Property_Title"
            className="block text-sm font-medium text-gray-700"
          >
            Property Title
          </label>
          <input
            type="text"
            name="Property_Title"
            id="Property_Title"
            value={formData.Property_Title}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
          />
        </div>
        <div>
          <label
            htmlFor="Slug"
            className="block text-sm font-medium text-gray-700"
          >
            Slug
          </label>
          <input
            type="text"
            name="Slug"
            id="Slug"
            value={formData.Slug}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
          />
        </div>
        <div>
          <label
            htmlFor="Property_Description"
            className="block text-sm font-medium text-gray-700"
          >
            Property Description
          </label>
          <textarea
            name="Property_Description"
            id="Property_Description"
            value={formData.Property_Description}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
          />
        </div>
        <div>
          <label
            htmlFor="Property_Title_AR"
            className="block text-sm font-medium text-gray-700"
          >
            Property Title (Arabic)
          </label>
          <input
            type="text"
            name="Property_Title_AR"
            id="Property_Title_AR"
            value={formData.Property_Title_AR}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
          />
        </div>
        <div>
          <label
            htmlFor="Property_Description_AR"
            className="block text-sm font-medium text-gray-700"
          >
            Property Description (Arabic)
          </label>
          <textarea
            name="Property_Description_AR"
            id="Property_Description_AR"
            value={formData.Property_Description_AR}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
          />
        </div>
        <div>
          <label
            htmlFor="Price"
            className="block text-sm font-medium text-gray-700"
          >
            Price
          </label>
          <input
            type="number"
            name="Price"
            id="Price"
            value={formData.Price}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
          />
        </div>
        <div>
          <label
            htmlFor="Rent_Frequency"
            className="block text-sm font-medium text-gray-700"
          >
            Rent Frequency
          </label>
          <select
            name="Rent_Frequency"
            id="Rent_Frequency"
            value={formData.Rent_Frequency}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
          >
            <option value="Monthly">Monthly</option>
            <option value="Quarterly">Quarterly</option>
            <option value="Yearly">Yearly</option>
            <option value="Weekly">Weekly</option>
          </select>
        </div>
        <div>
          <label
            htmlFor="Furnished"
            className="block text-sm font-medium text-gray-700"
          >
            Furnished
          </label>
          <select
            name="Furnished"
            id="Furnished"
            value={formData.Furnished}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
          >
            <option value="No">No</option>
            <option value="Yes">Yes</option>
          </select>
        </div>
        <div>
          <label
            htmlFor="Images"
            className="block text-sm font-medium text-gray-700"
          >
            Images
          </label>
          <input
            type="text"
            name="Images"
            id="Images"
            value={formData.Images}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
          />
        </div>
        <div>
          <label
            htmlFor="Videos"
            className="block text-sm font-medium text-gray-700"
          >
            Videos
          </label>
          <input
            type="text"
            name="Videos"
            id="Videos"
            value={formData.Videos}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
          />
        </div>
        <div>
          <label
            htmlFor="City"
            className="block text-sm font-medium text-gray-700"
          >
            City
          </label>
          <input
            type="text"
            name="City"
            id="City"
            value={formData.City}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
          />
        </div>
        <div>
          <label
            htmlFor="Locality"
            className="block text-sm font-medium text-gray-700"
          >
            Locality
          </label>
          <input
            type="text"
            name="Locality"
            id="Locality"
            value={formData.Locality}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
          />
        </div>
        <div>
          <label
            htmlFor="Sub_Locality"
            className="block text-sm font-medium text-gray-700"
          >
            Sub-Locality
          </label>
          <input
            type="text"
            name="Sub_Locality"
            id="Sub_Locality"
            value={formData.Sub_Locality}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
          />
        </div>
        <div>
          <label
            htmlFor="Tower_Name"
            className="block text-sm font-medium text-gray-700"
          >
            Tower Name
          </label>
          <input
            type="text"
            name="Tower_Name"
            id="Tower_Name"
            value={formData.Tower_Name}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
          />
        </div>
        <div>
          <label
            htmlFor="Listing_Agent"
            className="block text-sm font-medium text-gray-700"
          >
            Listing Agent
          </label>
          <input
            type="text"
            name="Listing_Agent"
            id="Listing_Agent"
            value={formData.Listing_Agent}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
          />
        </div>
        <div>
          <label
            htmlFor="Listing_Agent_Phone"
            className="block text-sm font-medium text-gray-700"
          >
            Listing Agent Phone
          </label>
          <input
            type="text"
            name="Listing_Agent_Phone"
            id="Listing_Agent_Phone"
            value={formData.Listing_Agent_Phone}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
          />
        </div>
        <div>
          <label
            htmlFor="Listing_Agent_Email"
            className="block text-sm font-medium text-gray-700"
          >
            Listing Agent Email
          </label>
          <input
            type="email"
            name="Listing_Agent_Email"
            id="Listing_Agent_Email"
            value={formData.Listing_Agent_Email}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
          />
        </div>
        <button
          type="submit"
          className="w-full px-4 py-2 bg-blue-500 text-white font-semibold rounded-md shadow-md hover:bg-blue-700 focus:outline-none"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default PropertyXmlAddForm;
