import AddPropertyForm from "@/components/admin/Properties/AddPropertyForm";
import AdminLayout from "@/components/layouts/AdminLayout";
import React from "react";

export const metadata = {
  title: "Al-Burraq - Dashboard",
};
export default function add() {
  return (
    <AdminLayout>
      <AddPropertyForm />
    </AdminLayout>
  );
}
