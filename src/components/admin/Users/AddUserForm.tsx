// AddUserForm.tsx
"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const NEXT_PUBLIC_API_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

interface AddUserFormProps {
  onUserAdd: () => void; // Define the prop type for the callback
}

const AddUserForm: React.FC<AddUserFormProps> = ({ onUserAdd }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [email, setEmail] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const [error, setError] = useState("");
  const [passwordMatchMsg, setPasswordMatchMsg] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    if (showSuccess) {
      timeoutId = setTimeout(() => setShowSuccess(false), 3000);
    }

    if (showError) {
      timeoutId = setTimeout(() => setShowError(false), 3000);
    }

    return () => clearTimeout(timeoutId);
  }, [showSuccess, showError]);

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
      setError(""); // Clear any previous error
      setShowSuccess(true);
      onUserAdd(); // Trigger callback to refresh user list
      resetForm();
    } catch (error) {
      // setError("Failed to add user.");
      setShowError(true);
    }
  };

  const resetForm = () => {
    setUsername("");
    setPassword("");
    setConfirmPassword("");
    setEmail("");
    setIsAdmin(false);
    setPasswordMatchMsg("");
  };

  const handleConfirmPasswordChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setConfirmPassword(e.target.value);
    if (password === e.target.value) {
      setPasswordMatchMsg("Passwords matched😊");
    } else {
      setPasswordMatchMsg("Passwords do not match ☹️");
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
            <div className="relative flex items-center">
              <input
                className="bg-slate-700 border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-slate-800 focus:border-slate-800 block w-full p-4 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-slate-800 dark:focus:border-slate-800"
                type={showPassword ? "text" : "password"}
                placeholder="Enter The Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <div
                className="absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer z-20 opacity-100"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </div>
            </div>{" "}
          </div>
          <div>
            <label className="block mb-2 text-lg font-medium text-gray-900 dark:text-white">
              Confirm Password
            </label>
            <div className="relative flex items-center">
              <input
                className="bg-slate-700 border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-slate-800 focus:border-slate-800 block w-full p-4 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-slate-800 dark:focus:border-slate-800"
                type={showPassword ? "text" : "password"}
                placeholder="Re-enter The Password"
                value={confirmPassword}
                onChange={handleConfirmPasswordChange}
                required
              />
              <div
                className="absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer z-20 opacity-100"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </div>
            </div>
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
        {showSuccess && (
          <div className="text-green-500">User added successfully!</div>
        )}
        {showError && <div className="text-red-500">Failed to add user.</div>}
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
