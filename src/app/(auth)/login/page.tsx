import LoginForm from "@/components/admin/Auth/LoginForm";
import AuthLayout from "@/components/layouts/AuthLayout";
import React from "react";

export const metadata = {
  title: "Authentication",
};

export default function page() {
  return (
    <AuthLayout>
      <LoginForm />
    </AuthLayout>
  );
}
