import PropertyList from "@/components/admin/Properties/PropertyList";
import AdminLayout from "@/components/layouts/AdminLayout";
import React from "react";

export const metadata = {
  title: "Al-Burraq - Dashboard",
};

export default function page() {
  return (
    <>
      <AdminLayout>
        <PropertyList />
      </AdminLayout>
    </>
  );
}
