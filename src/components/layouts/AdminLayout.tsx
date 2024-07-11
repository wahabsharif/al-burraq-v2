// components/AdminLayout.tsx
import React, { ReactNode } from "react";
import SideBar from "@/components/admin/SideBar";
import ProtectedRoute from "@/components/admin/Auth/ProtectedRoute";
import "@/styles/admin.css";

export const metadata = {
  title: "Al-Burraq Dashboard",
  description: "Next.js starter app",
};

const AdminLayout = ({ children }: { children: ReactNode }) => {
  return (
    <ProtectedRoute>
      <div className="flex h-screen w-full">
        <SideBar />
        <main className="flex-1 p-4 w-full sm:ml-60 bg-gray-100 overflow-y-auto">
          {children}
        </main>
      </div>
    </ProtectedRoute>
  );
};

export default AdminLayout;
