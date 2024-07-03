// PropertyList.tsx
"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import Image from "next/image";
import EditPropertyForm from "./EditPropertyForm";
import DeletePropertyButton from "./DeletePropertyButton";
import AddPropertyButton from "./AddPropertyButton";

interface Property {
  _id: string;
  title: string;
  description: string;
  price: number;
  location: string;
  image: string[]; // Adjusted to string array for image URLs
}

const PropertyList: React.FC = () => {
  const [properties, setProperties] = useState<Property[]>([]);
  const [editPropertyId, setEditPropertyId] = useState<string | null>(null);

  useEffect(() => {
    fetchProperties();
  }, []);

  const fetchProperties = async () => {
    try {
      const response = await axios.get<Property[]>(
        "http://localhost:5000/api/properties"
      );
      setProperties(response.data);
    } catch (error) {
      console.error("Error fetching properties:", error);
    }
  };

  const handleEditClick = (propertyId: string) => {
    setEditPropertyId(propertyId);
  };

  const handleUpdateSuccess = () => {
    setEditPropertyId(null); // Clear edit mode
    fetchProperties(); // Refresh property list
  };

  return (
    <div>
      <div className="mx-auto max-w-screen-sm text-center">
        <h2 className="text-3xl text-darkGold font-extrabold mb-4 mt-4 lg:mb-16 bg-black shadow-md p-4 rounded-xl bg-opacity-80 backdrop-blur-2xl backdrop-saturate-200 inline-block">
          All Properties
        </h2>
      </div>
      <AddPropertyButton />
      <div>
        <ul>
          {properties.map((property) => (
            <li key={property._id}>
              {property.image.length > 0 ? (
                <Image
                  src={property.image[0]} // Access the first image URL from the array
                  alt={property.title}
                  width={200}
                  height={0}
                  priority // Add priority to prioritize loading
                />
              ) : (
                <div>No Image Available</div>
              )}
              <strong>{property.title}</strong> - {property.description} - AED{" "}
              {property.price}
              {editPropertyId === property._id ? (
                <EditPropertyForm
                  property={property}
                  onUpdateSuccess={handleUpdateSuccess}
                />
              ) : (
                <div>
                  <button onClick={() => handleEditClick(property._id)}>
                    Edit
                  </button>
                  <DeletePropertyButton
                    propertyId={property._id}
                    onDelete={fetchProperties}
                  />
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default PropertyList;
