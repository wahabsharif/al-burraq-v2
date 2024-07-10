// src/components/Auth/Login.tsx

"use client";
import React, { useState } from "react";
import axios from "axios";

const NEXT_PUBLIC_API_URL = process.env.NEXT_PUBLIC_API_URL;

const Login: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const response = await axios.post(
        `${NEXT_PUBLIC_API_URL}/api/users/login`,
        { username, password }
      );
      console.log("Login successful:", response.data);
      // Handle success, e.g., redirect to dashboard
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        console.error("Login error:", error.response?.data);
        // Handle error, e.g., show error message
      } else {
        console.error("An unexpected error occurred:", error);
      }
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
