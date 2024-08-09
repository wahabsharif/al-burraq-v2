import AddBlogButton from "@/components/admin/Blogs/AddBlogButton";
import PropertyList from "@/components/admin/Dashboard/PropertyList";
import UsersStatus from "@/components/admin/Dashboard/UsersStatus";
import AddPropertyButton from "@/components/admin/Properties/AddPropertyButton";
import AdminLayout from "@/components/layouts/AdminLayout";
import React from "react";
import { LuLayoutDashboard } from "react-icons/lu";

export const metadata = {
  title: "Al-Burraq - Dashboard",
};

export default function Page() {
  return (
    <AdminLayout>
      <div className="mx-auto max-w-screen-sm text-center">
        <h2 className="text-3xl text-darkGold font-extrabold mb-4 mt-4 lg:mb-16 bg-black shadow-md p-4 rounded-xl bg-opacity-80 backdrop-blur-2xl backdrop-saturate-200 flex items-center justify-center space-x-2">
          <LuLayoutDashboard />
          <span>Dashboard</span>
        </h2>
      </div>

      <div className="flex items-center justify-center space-x-4 mb-6">
        <AddBlogButton />
        <AddPropertyButton />
      </div>

      <div className="flex flex-row gap-4 justify-center">
        <div className="flex-1 max-w-lg">
          <PropertyList />
        </div>
        <div className="flex-1 max-w-lg">
          <UsersStatus />
        </div>
      </div>
    </AdminLayout>
  );
}
