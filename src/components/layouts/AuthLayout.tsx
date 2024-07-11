// components/AuthLayout.tsx
import React, { ReactNode } from "react";
import "@/styles/admin.css";

const AuthLayout = ({ children }: { children: ReactNode }) => {
  return <main className="flex items-center">{children}</main>;
};

export default AuthLayout;
