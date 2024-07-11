// src/pages/login.tsx

"use client";

import React, { useState } from "react";
import axios from "axios";
import { useAuth } from "@/contexts/AuthContext";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import Logo from "@/assets/images/logo/al-burraq-logo-dark.svg";
import Image from "next/image";

const NEXT_PUBLIC_API_URL = process.env.NEXT_PUBLIC_API_URL;

const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const { login } = useAuth();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${NEXT_PUBLIC_API_URL}/api/users/login`,
        {
          username,
          password,
        }
      );
      login(response.data.token);
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  return (
    <section className="bg-gray-100 w-full flex justify-center items-center">
      <div className="bg-darkBg rounded-xl flex flex-col md:flex-row max-w-max p-5 items-center justify-center shadow-lg">
        <div className="md:w-full max-w-md px-8">
          <div className="flex justify-center items-center">
            <h1 className="text-2xl font-bold mb-4">Login</h1>
            {/* <Image
              src={Logo}
              alt="Al-Burraq Logo"
              style={{
                width: "2rem",
                height: "2rem",
              }}
              className="w-24 h-24"
            /> */}
          </div>
          <form onSubmit={handleLogin} className="w-full">
            <div className="mb-4">
              <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-indigo-200"
              />
            </div>
            <div className="mb-4">
              <div className="relative flex items-center">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  placeholder="Password"
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-indigo-200 pr-10"
                />
                <div
                  className="absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer z-20 opacity-100"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </div>
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-indigo-500 text-white py-2 rounded-md hover:bg-indigo-600 transition duration-200"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default LoginForm;
