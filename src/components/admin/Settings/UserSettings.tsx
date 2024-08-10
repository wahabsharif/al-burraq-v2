"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const NEXT_PUBLIC_API_URL = process.env.NEXT_PUBLIC_API_URL;

const UserSettings: React.FC = () => {
  const [user, setUser] = useState<any>({});
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    fullName: "",
    designation: "",
    password: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [passwordMatchMsg, setPasswordMatchMsg] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);
  const [showPasswordMsg, setShowPasswordMsg] = useState(false);
  const [redirectTimer, setRedirectTimer] = useState<NodeJS.Timeout | null>(
    null
  );
  const [countdown, setCountdown] = useState(5);

  const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("token");

        const response = await axios.get(`${NEXT_PUBLIC_API_URL}/api/user/me`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setUser(response.data);
        setFormData({
          username: response.data.username,
          email: response.data.email,
          fullName: response.data.fullName,
          designation: response.data.designation,
          password: "",
          confirmPassword: "",
        });
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch user data");
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  useEffect(() => {
    if (formData.password === formData.confirmPassword) {
      setPasswordMatchMsg("Passwords matched 😊");
    } else if (formData.password || formData.confirmPassword) {
      setPasswordMatchMsg("Passwords do not match ☹️");
    } else {
      setPasswordMatchMsg("");
    }
  }, [formData.password, formData.confirmPassword]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
    if (name === "password" || name === "confirmPassword") {
      setShowPasswordMsg(true);
    }
  };

  const handleFocus = (
    e: React.FocusEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name } = e.target;
    if (name === "password" || name === "confirmPassword") {
      setShowPasswordMsg(true);
    }
  };

  const handleBlur = (
    e: React.FocusEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name } = e.target;
    if (name === "password" || name === "confirmPassword") {
      setShowPasswordMsg(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setPasswordMatchMsg("Passwords do not match ☹️");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      await axios.put(`${NEXT_PUBLIC_API_URL}/api/user/me`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      setError(null);
      setShowSuccess(true);

      if (redirectTimer) {
        clearTimeout(redirectTimer);
      }

      const timer = setTimeout(() => {
        setShowSuccess(false);
        localStorage.removeItem("token");
        router.push("/login");
      }, countdown * 1000);

      setRedirectTimer(timer);

      const countdownInterval = setInterval(() => {
        setCountdown((prevCountdown) => prevCountdown - 1);
      }, 1000);

      setTimeout(() => {
        clearInterval(countdownInterval);
      }, countdown * 1000);
    } catch (err) {
      setShowError(true);
      setTimeout(() => setShowError(false), 5000);
    }
  };

  if (loading)
    return <div className="text-center text-gray-500">Loading...</div>;
  if (error) return <div className="text-center text-red-500">{error}</div>;

  return (
    <section className="mb-6">
      <h2 className="text-xl text-darkGold font-extrabold my-2 bg-black shadow-md p-2 rounded-xl bg-opacity-80 backdrop-blur-2xl backdrop-saturate-200 inline-block">
        User Profile Settings
      </h2>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block mb-2 text-lg font-medium text-gray-900 dark:text-white">
              Full Name
            </label>
            <input
              className="bg-slate-700 border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-slate-800 focus:border-slate-800 block w-full p-4 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-slate-800 dark:focus:border-slate-800"
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              onFocus={handleFocus}
              onBlur={handleBlur}
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
              name="username"
              value={formData.username}
              onChange={handleChange}
              onFocus={handleFocus}
              onBlur={handleBlur}
              required
              disabled
            />
          </div>
          <div>
            <label className="block mb-2 text-lg font-medium text-gray-900 dark:text-white">
              Email
            </label>
            <input
              className="bg-slate-700 border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-slate-800 focus:border-slate-800 block w-full p-4 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-slate-800 dark:focus:border-slate-800"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              onFocus={handleFocus}
              onBlur={handleBlur}
              required
            />
          </div>
          <div>
            <label className="block mb-2 text-lg font-medium text-gray-900 dark:text-white">
              Designation
            </label>
            <select
              className="bg-slate-700 border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-slate-800 focus:border-slate-800 block w-full p-4 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-slate-800 dark:focus:border-slate-800"
              name="designation"
              value={formData.designation}
              onChange={handleChange}
              onFocus={handleFocus}
              onBlur={handleBlur}
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
                className="bg-slate-700 border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-slate-800 focus:border-slate-800 block w-full p-4 pr-10 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-slate-800 dark:focus:border-slate-800"
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                onFocus={handleFocus}
                onBlur={handleBlur}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>
          <div>
            <label className="block mb-2 text-lg font-medium text-gray-900 dark:text-white">
              Confirm Password
            </label>
            <div className="relative flex items-center">
              <input
                className="bg-slate-700 border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-slate-800 focus:border-slate-800 block w-full p-4 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-slate-800 dark:focus:border-slate-800"
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                onFocus={handleFocus}
                onBlur={handleBlur}
              />
              <div
                className="absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer z-20 opacity-100"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
              </div>
            </div>
            {showPasswordMsg && passwordMatchMsg && (
              <p
                className={`mt-2 text-sm ${
                  formData.password === formData.confirmPassword
                    ? "text-green-500"
                    : "text-red-500"
                }`}
              >
                {passwordMatchMsg}
              </p>
            )}
          </div>
        </div>
        <div className="flex items-center justify-start mt-4">
          <button
            type="submit"
            className="bg-green-800 hover:bg-green-700 text-slate-200 font-bold py-2 px-4 rounded-xl"
          >
            Save Changes
          </button>
        </div>
      </form>
      {showSuccess && (
        <div className="fixed inset-0 flex bg-white bg-black backdrop-blur-xl backdrop-saturate-200 items-center justify-center z-50">
          <p className="text-green-600 text-4xl font-bold  text-center bg-black shadow-md p-2 rounded-lg bg-opacity-80 backdrop-blur-2xl backdrop-saturate-200 inline-block">
            Profile updated successfully! <br /> Please Login Again in{" "}
            <span className="text-5xl text-lightGold2">
              {countdown}
              {countdown !== 1 ? "s" : ""}.
            </span>
          </p>
        </div>
      )}
      {showError && (
        <p className="text-red-600 font-bold mt-4 bg-black shadow-md p-2 rounded-lg bg-opacity-80 backdrop-blur-2xl backdrop-saturate-200 inline-block">
          Failed to update profile. Please try again.
        </p>
      )}
    </section>
  );
};

export default UserSettings;
