// src/app/dashboard/admin/page.tsx

import AddBlogForm from "@/components/admin/Blogs/AddBlogForm";
import BlogList from "@/components/admin/Blogs/BlogList";
import AdminLayout from "@/components/layouts/AdminLayout";
import React from "react";

export const metadata = {
  title: "Al-Burraq - Dashboard",
};

const DashboardPage: React.FC = () => {
  return (
    <AdminLayout>
      <div>
        <h1>Admin Blogs</h1>
        <AddBlogForm />
        <BlogList />
      </div>
    </AdminLayout>
  );
};

export default DashboardPage;
