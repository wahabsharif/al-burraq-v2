// src/pages/login.tsx

"use client";

import { useAuth } from "@/contexts/AuthContext";
import axios, { AxiosError } from "axios";
import React, { useState } from "react";

const NEXT_PUBLIC_API_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const { login } = useAuth();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${NEXT_PUBLIC_API_URL}/api/user/login`,
        {
          username,
          password,
        }
      );
      login(response.data.token);
    } catch (error: unknown) {
      console.error("Login error:", error);
      if (axios.isAxiosError(error) && error.response?.status === 401) {
        setError("Wrong Password");
      } else {
        setError("Invalid Username or Password");
      }
    }
  };

  return (
    <section className="bg-gray-100 w-full flex justify-center items-center">
      <div className="box">
        <div className="flex justify-center items-center">
          <h1 className="text-2xl font-bold mb-4">Login</h1>
        </div>
        <form onSubmit={handleLogin} className="w-full">
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-indigo-200"
          />
          <input
            type={showPassword ? "text" : "password"}
            value={password}
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-indigo-200 pr-10"
          />
          {error && <div className="text-red-500 text-md mt-2">{error}</div>}
          <button type="submit">Login</button>
        </form>
      </div>
    </section>
  );
};

export default LoginForm;
