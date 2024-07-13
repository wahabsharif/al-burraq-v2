// src/components/admin/Users/UsersList.tsx

"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import DeleteUserButton from "./DeleteUserButton";

// Step 1: Define the UserData interface
interface UserData {
  _id: string;
  username: string;
  email: string;
  isAdmin: boolean; // Add isAdmin field
}

const NEXT_PUBLIC_API_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

const UsersList = () => {
  const [userData, setUserData] = useState<UserData[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          throw new Error("Token not found in localStorage");
        }
        const response = await axios.get(`${NEXT_PUBLIC_API_URL}/api/user`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUserData(response.data as UserData[]);
      } catch (error) {
        setError("Error fetching user data. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <section>
      <div className="mx-auto ml-0 max-w-screen-sm">
        <h2 className="text-lg text-darkGold font-extrabold mt-4 mb-2 bg-black shadow-md py-1 px-2 rounded-xl bg-opacity-80 backdrop-blur-2xl backdrop-saturate-200 inline-block text-left">
          Users List
        </h2>
      </div>
      {message && <p>{message}</p>}
      {userData ? (
        <table className="min-w-full bg-darkBg border-gray-200 shadow-md rounded-xl">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Username
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Email
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Account Type
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {userData.map((user) => (
              <tr key={user._id}>
                <td className="px-6 py-4 whitespace-nowrap">{user.username}</td>
                <td className="px-6 py-4 whitespace-nowrap">{user.email}</td>
                <td
                  className={`px-6 py-4 whitespace-nowrap text-start ${
                    user.isAdmin ? "text-green-500" : "text-red-500"
                  }`}
                >
                  {user.isAdmin ? "Admin" : "User"}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-start">
                  <DeleteUserButton
                    userId={user._id}
                    onDelete={() => setMessage("User deleted successfully")}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No user data available.</p>
      )}
    </section>
  );
};

export default UsersList;
