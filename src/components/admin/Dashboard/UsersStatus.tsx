"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import moment from "moment"; // Import moment for formatting time

interface UserData {
  _id: string;
  fullName: string;
  isAdmin: boolean;
  isActive: boolean;
  lastLogin: string;
}

const NEXT_PUBLIC_API_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

const UsersStatus = () => {
  const [userData, setUserData] = useState<UserData[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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
        setError("An error occurred while fetching user data.");
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
    <section className="container mx-auto px-1 py-6">
      {userData ? (
        <div className="mx-auto max-w-lg">
          <h2 className="text-xl text-darkGold font-extrabold my-2 bg-black shadow-md p-2 rounded-xl bg-opacity-80 backdrop-blur-2xl backdrop-saturate-200 inline-block">
            Users Status
          </h2>
          {userData.length > 0 ? (
            <table className="min-w-full bg-darkBg border-gray-200 shadow-md rounded-xl">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 capitalize tracking-wider">
                    Full Name
                  </th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 capitalize tracking-wider">
                    Account Type
                  </th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 capitalize tracking-wider">
                    Status
                  </th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 capitalize tracking-wider">
                    Last Login
                  </th>
                </tr>
              </thead>
              <tbody>
                {userData.map((user) => (
                  <tr key={user._id}>
                    <td className="px-4 py-3 capitalize whitespace-nowrap">
                      {user.fullName}
                    </td>
                    <td
                      className={`px-4 py-3 capitalize whitespace-nowrap text-start ${
                        user.isAdmin ? "text-green-500" : "text-red-500"
                      }`}
                    >
                      {user.isAdmin ? "Admin" : "User"}
                    </td>
                    <td
                      className={`px-4 py-3 capitalize whitespace-nowrap text-start ${
                        user.isActive ? "text-green-500" : "text-red-500"
                      }`}
                    >
                      {user.isActive ? "Active" : "Inactive"}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      {user.lastLogin
                        ? moment(user.lastLogin).fromNow()
                        : "Never logged in"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>No user data available.</p>
          )}
        </div>
      ) : (
        <p>No user data available.</p>
      )}
    </section>
  );
};

export default UsersStatus;
