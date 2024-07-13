import React from "react";
import axios from "axios";

interface Props {
  userId: string;

  onDelete: () => void;
}

const NEXT_PUBLIC_API_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

const DeleteUserButton: React.FC<Props> = ({ userId, onDelete }) => {
  const handleDelete = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("Token not found in localStorage");
      }

      await axios.delete(`${NEXT_PUBLIC_API_URL}/api/user/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      onDelete();
      console.log("User deleted successfully");
      // Optionally, you can handle success state or update user list
    } catch (error) {
      console.error("Error deleting user:", error);
      // Optionally, you can handle error state
    }
  };

  return <button onClick={handleDelete}>Delete</button>;
};

export default DeleteUserButton;
