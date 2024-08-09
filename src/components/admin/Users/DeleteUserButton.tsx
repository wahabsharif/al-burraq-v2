import React, { useState } from "react";
import axios from "axios";

interface Props {
  userId: string;
  fullName: string; // Changed from username to fullName
  onDelete: () => void;
}

const NEXT_PUBLIC_API_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

const DeleteUserButton: React.FC<Props> = ({ userId, fullName, onDelete }) => {
  const [confirmDelete, setConfirmDelete] = useState(false);

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
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  const toggleConfirmation = () => {
    setConfirmDelete(!confirmDelete);
  };

  return (
    <div className="relative inline-block">
      {!confirmDelete && (
        <button
          className="py-2 px-4 rounded-lg bg-red-0 text-slate-100"
          onClick={toggleConfirmation}
        >
          Delete
        </button>
      )}
      {confirmDelete && (
        <>
          <div className="fixed inset-0 flex bg-white bg-black backdrop-blur-xl backdrop-saturate-200 items-center justify-center z-50">
            <div className="bg-white border-4 border-red-0 shadow-lg rounded-lg p-4">
              <p className="mb-4 text-2xl">
                Are you sure you want to delete{" "}
                <span className="uppercase font-bold text-3xl text-lightGold2">
                  {" "}
                  {fullName}
                </span>
                😕 ?
              </p>
              <div className="flex justify-center">
                <button
                  className="py-2 px-4 rounded-lg bg-red-0 text-slate-100 mr-2"
                  onClick={handleDelete}
                >
                  YES
                </button>
                <button
                  className="py-2 px-4 bg-green-800 rounded-lg text-slate-100"
                  onClick={toggleConfirmation}
                >
                  NO
                </button>
              </div>
            </div>
          </div>
          <div
            className="fixed inset-0 bg-black opacity-50 z-40"
            onClick={toggleConfirmation}
          ></div>
        </>
      )}
    </div>
  );
};

export default DeleteUserButton;
