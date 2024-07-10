// src/app/(dashboard)/admin/layout.tsx

import React, { ReactNode } from "react";
import SideBar from "@/components/admin/SideBar";
import "@/styles/admin.css";
import ProtectedRoute from "@/components/admin/Auth/ProtectedRoute";

export const metadata = {
  title: "Al-Burraq Dashboard",
  description: "Next.js starter app",
};

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <ProtectedRoute>
      <div className="flex h-screen">
        <SideBar />
        <main className="flex-1 p-4 sm:ml-60 bg-gray-100 overflow-y-auto">
          {children}
        </main>
      </div>
    </ProtectedRoute>
  );
}
