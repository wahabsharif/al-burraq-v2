// src/components/admin/Users/AddUserForm.tsx

"use client";

import React, { useState } from "react";
import axios from "axios";

const NEXT_PUBLIC_API_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

const AddUserForm: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [email, setEmail] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const [error, setError] = useState("");
  const [passwordMatchMsg, setPasswordMatchMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      const response = await axios.post(
        `${NEXT_PUBLIC_API_URL}/api/user/register`,
        {
          username,
          password,
          email,
          isAdmin,
        }
      );
      // Optionally, you can handle success state or reset form fields
    } catch (error) {
      // Optionally, you can handle error state
    }
  };

  const handleConfirmPasswordChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setConfirmPassword(e.target.value);
    if (password === e.target.value) {
      setPasswordMatchMsg("Passwords matched😊");
    } else {
      setPasswordMatchMsg("Password do not matched ☹️");
    }
  };

  return (
    <section className="mb-6">
      <div className="mx-auto ml-0 max-w-screen-sm">
        <h2 className="text-lg text-darkGold font-extrabold mt-4 mb-2 bg-black shadow-md py-1 px-2 rounded-xl bg-opacity-80 backdrop-blur-2xl backdrop-saturate-200 inline-block text-left">
          Add User
        </h2>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block mb-2 text-lg font-medium text-gray-900 dark:text-white">
              Username
            </label>
            <input
              className="bg-slate-700 border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-slate-800 focus:border-slate-800 block w-full p-4 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-slate-800 dark:focus:border-slate-800"
              type="text"
              placeholder="Enter The Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block mb-2 text-lg font-medium text-gray-900 dark:text-white">
              Email
            </label>
            <input
              className="bg-slate-700 border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-slate-800 focus:border-slate-800 block w-full p-4 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-slate-800 dark:focus:border-slate-800"
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block mb-2 text-lg font-medium text-gray-900 dark:text-white">
              Password
            </label>
            <input
              className="bg-slate-700 border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-slate-800 focus:border-slate-800 block w-full p-4 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-slate-800 dark:focus:border-slate-800"
              type="password"
              placeholder="Enter The Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block mb-2 text-lg font-medium text-gray-900 dark:text-white">
              Confirm Password
            </label>
            <input
              className="bg-slate-700 border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-slate-800 focus:border-slate-800 block w-full p-4 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-slate-800 dark:focus:border-slate-800"
              type="password"
              placeholder="Re-enter The Password"
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
              required
            />
            <div
              className={`text-lg ${
                passwordMatchMsg === "Passwords matched😊"
                  ? "text-green-500"
                  : "text-red-500"
              }`}
            >
              {passwordMatchMsg}
            </div>
          </div>
          <div className="form-control">
            <div className="flex items-center">
              <label className="cursor-pointer text-xl font-bold label label-text mr-2">
                Set {username} As Admin
              </label>
              <input
                className="checkbox checkbox-success"
                type="checkbox"
                checked={isAdmin}
                onChange={(e) => setIsAdmin(e.target.checked)}
              />
            </div>
          </div>
          {error && <div className="text-red-500">{error}</div>}
        </div>
        <button
          className="rounded-lg px-3 py-1 my-2 button font-bold text-white text-lg"
          type="submit"
        >
          + Add User
        </button>
      </form>
    </section>
  );
};

export default AddUserForm;
