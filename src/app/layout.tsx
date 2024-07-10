import React, { ReactNode } from "react";
import { AuthProvider } from "@/contexts/AuthContext";
// import "@/styles/admin.css";

export const metadata = {
  title: "Login",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html>
      <head>
        <title>{metadata.title}</title>
      </head>
      <body>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
