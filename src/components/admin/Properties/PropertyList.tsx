"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import EditPropertyForm from "./EditPropertyForm";
import DeletePropertyButton from "./DeletePropertyButton";

interface Property {
  _id: string;
  title: string;
  description: string;
  price: number;
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
      <h2>Property List</h2>
      <ul>
        {properties.map((property) => (
          <li key={property._id}>
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
  );
};

export default PropertyList;
