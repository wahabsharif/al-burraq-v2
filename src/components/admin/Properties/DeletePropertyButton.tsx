"use client";

import React from "react";
import axios from "axios";

interface DeletePropertyButtonProps {
  propertyId: string;
  onDelete: () => void;
}

const DeletePropertyButton: React.FC<DeletePropertyButtonProps> = ({
  propertyId,
  onDelete,
}) => {
  const handleDelete = async () => {
    try {
      const response = await axios.delete(
        `https://al-burraq-backend.vercel.app/api/properties/${propertyId}`
      );
      console.log("Property deleted:", response.data);
      onDelete(); // Trigger parent component update
    } catch (error) {
      console.error("Error deleting property:", error);
    }
  };

  return <button onClick={handleDelete}>Delete</button>;
};

export default DeletePropertyButton;
