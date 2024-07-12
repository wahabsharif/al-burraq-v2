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
      <AddBlogForm />
    </AdminLayout>
  );
};

export default DashboardPage;
