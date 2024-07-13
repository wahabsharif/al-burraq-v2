"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import DeleteUserButton from "./DeleteUserButton";

// Step 1: Define the UserData interface
interface UserData {
  _id: string; // Assuming _id is the userId
  username: string;
  email: string;
  // Add other properties as needed
}

const NEXT_PUBLIC_API_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

const UsersList = () => {
  const [userData, setUserData] = useState<UserData[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  // ...

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("token");
        console.log("Token:", token); // Check token in console
        if (!token) {
          throw new Error("Token not found in localStorage");
        }
        const response = await axios.get(`${NEXT_PUBLIC_API_URL}/api/user`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log("API Response:", response.data); // Log API response data
        setUserData(response.data as UserData[]);
      } catch (error) {
        console.error("Error fetching user data:", error);
        setError("Error fetching user data. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  // ...

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div>
      <h2>User Information</h2>
      {message && <p>{message}</p>}
      {userData ? (
        <div>
          {userData.map((user) => (
            <div key={user._id}>
              <p>UserName: {user.username}</p>
              <p>Email: {user.email}</p>
              <DeleteUserButton
                userId={user._id}
                onDelete={() => setMessage("User deleted successfully")}
              />
            </div>
          ))}
        </div>
      ) : (
        <p>No user data available.</p>
      )}
    </div>
  );
};

export default UsersList;
