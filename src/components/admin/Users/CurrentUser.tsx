// CurrentUser.tsx

"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";

const NEXT_PUBLIC_API_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

const CurrentUser: React.FC = () => {
  const [username, setUsername] = useState<string>("");

  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const token = localStorage.getItem("token"); // Ensure token is stored in localStorage
        if (!token) {
          throw new Error("No token found");
        }
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
        const response = await axios.get(
          `${NEXT_PUBLIC_API_URL}/api/user/me`,
          config
        );
        setUsername(response.data.username);
      } catch (error) {
        console.error("Error fetching current user:", error);
      }
    };

    fetchCurrentUser();
  }, []);

  return (
    <div>
      <p>{username}</p>
    </div>
  );
};

export default CurrentUser;