// src/app/dashboard/admin/page.tsx

import AdminLayout from "@/components/layouts/AdminLayout";
import React from "react";

export const metadata = {
  title: "Al-Burraq - Dashboard",
};

const DashboardPage: React.FC = () => {
  return (
    <AdminLayout>
      <div>
        <h1>Admin Dashboard</h1>
      </div>
    </AdminLayout>
  );
};

export default DashboardPage;
