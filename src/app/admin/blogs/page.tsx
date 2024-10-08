// src/app/dashboard/admin/page.tsx

import BlogList from "@/components/admin/Blogs/BlogList";
import AdminLayout from "@/components/layouts/AdminLayout";
import Link from "next/link";
import React from "react";

export const metadata = {
  title: "Al-Burraq - Dashboard",
};

const DashboardPage: React.FC = () => {
  return (
    <AdminLayout>
      <BlogList />
    </AdminLayout>
  );
};

export default DashboardPage;
