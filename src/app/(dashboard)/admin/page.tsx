// src/app/dashboard/admin/page.tsx

import React from "react";
import Login from "@/components/admin/Auth/Login";
import Register from "@/components/admin/Auth/Register";

const DashboardPage: React.FC = () => {
  return (
    <div>
      <h1>Admin Dashboard</h1>
      <Login />
      <Register />
      {/* Other dashboard content */}
    </div>
  );
};

export default DashboardPage;
