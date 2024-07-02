"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";

interface Property {
  _id: string;
  title: string;
  description: string;
  price: number;
}

const PropertyList: React.FC = () => {
  const [properties, setProperties] = useState<Property[]>([]);

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

  return (
    <div>
      <h2>Property List</h2>
      <ul>
        {properties.map((property) => (
          <li key={property._id}>
            <strong>{property.title}</strong> - {property.description} - $
            {property.price}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PropertyList;
