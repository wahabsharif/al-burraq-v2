"use client";
import React, { useState, useEffect, useCallback, useMemo } from "react";
import axios from "axios";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import debounce from "lodash.debounce"; // Import debounce from lodash

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
  const [fullName, setFullName] = useState(""); // New state for Full Name
  const [designation, setDesignation] = useState(""); // New state for Designation
  const [isAdmin, setIsAdmin] = useState(false);
  const [error, setError] = useState("");
  const [usernameError, setUsernameError] = useState(""); // New state for username error
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

  useEffect(() => {
    if (fullName) {
      const generatedUsername = fullName.toLowerCase().replace(/[\s.]/g, ""); // Remove spaces and dots
      setUsername(generatedUsername);
    } else {
      setUsername(""); // Clear username if fullName is empty
    }
  }, [fullName]); // Auto-generate username or clear it when fullName changes

  const debouncedValidateUsername = useMemo(() => {
    return debounce(async (username: string) => {
      if (username.length === 0) return; // Skip validation if username is empty
      try {
        const response = await axios.get(
          `${NEXT_PUBLIC_API_URL}/api/user/${username}`
        );
        if (response.data.exists) {
          setUsernameError("Username already exists.");
        } else {
          setUsernameError(""); // Clear error if username is valid
        }
      } catch (error) {
        if (axios.isAxiosError(error)) {
          console.error(
            "Error checking username availability:",
            error.response?.data || error.message
          );
          setUsernameError("Failed to check username availability.");
        } else {
          console.error("An unexpected error occurred:", error);
          setUsernameError("Unexpected error occurred.");
        }
        setUsernameError("Failed to check username availability.");
      }
    }, 300); // Debounce for 300ms
  }, []);

  useEffect(() => {
    debouncedValidateUsername(username);
  }, [username, debouncedValidateUsername]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (usernameError) {
      // If there's an existing username error, do not proceed
      return;
    }

    try {
      const response = await axios.post(
        `${NEXT_PUBLIC_API_URL}/api/user/register`,
        {
          username,
          password,
          email,
          fullName, // Include fullName in the request body
          designation, // Include designation in the request body
          isAdmin,
        }
      );
      setError(""); // Clear any previous error
      setUsernameError(""); // Clear username error
      setShowSuccess(true);
      onUserAdd(); // Trigger callback to refresh user list
      resetForm();
    } catch (error) {
      setShowError(true);
    }
  };

  const resetForm = () => {
    setUsername("");
    setPassword("");
    setConfirmPassword("");
    setEmail("");
    setFullName(""); // Reset fullName
    setDesignation(""); // Reset designation
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
              Full Name
            </label>
            <input
              className="bg-slate-700 capitalize border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-slate-800 focus:border-slate-800 block w-full p-4 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-slate-800 dark:focus:border-slate-800"
              type="text"
              placeholder="Enter The Full Name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block mb-2 text-lg font-medium text-gray-900 dark:text-white">
              Username
            </label>
            <input
              className="bg-slate-700 border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-slate-800 focus:border-slate-800 block w-full p-4 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-slate-800 dark:focus:border-slate-800"
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            {usernameError && (
              <div className="text-red-500">{usernameError}</div>
            )}
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
              Designation
            </label>
            <select
              className="bg-slate-700 border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-slate-800 focus:border-slate-800 block w-full p-4 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-slate-800 dark:focus:border-slate-800"
              value={designation}
              onChange={(e) => setDesignation(e.target.value)}
              required
            >
              <option value="">Select Designation</option>
              <option value="CEO">CEO</option>
              <option value="Managing Director">Managing Director</option>
              <option value="Director of Operations">
                Director of Operations
              </option>
              <option value="Director of Sales">Director of Sales</option>
              <option value="Branch Manager">Branch Manager</option>
              <option value="Sales Manager">Sales Manager</option>
              <option value="Property Manager">Property Manager</option>
              <option value="Leasing Manager">Leasing Manager</option>
              <option value="HR">HR</option>
            </select>
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
            </div>
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
              <label className="cursor-pointer capitalize text-xl font-bold label label-text mr-2">
                Set {fullName} As Admin
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
