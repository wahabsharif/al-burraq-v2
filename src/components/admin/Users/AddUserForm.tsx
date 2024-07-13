// src/components/admin/Users/AddUserForm.tsx

"use client";

import React, { useState } from "react";
import axios from "axios";

const NEXT_PUBLIC_API_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

const AddUserForm: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
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

  return (
    <form onSubmit={handleSubmit}>
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
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <label>
        <input
          type="checkbox"
          checked={isAdmin}
          onChange={(e) => {
            if (e.target.checked) {
              setIsAdmin(true);
            } else {
              setIsAdmin(false);
            }
          }}
        />
        Is Admin
      </label>
      <button type="submit">Add User</button>
    </form>
  );
};

export default AddUserForm;
