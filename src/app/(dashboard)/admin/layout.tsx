import React, { ReactNode } from "react";
import SideBar from "@/components/admin/SideBar";
import "@/styles/admin.css";

export const metadata = {
  title: "Al-Burraq Dashboard",
  description: "Next.js starter app",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html>
      <head>
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
      </head>
      <body className="flex h-screen">
        <SideBar />
        <main className="flex-1 p-4 sm:ml-60 bg-gray-100 overflow-y-auto">
          {children}
        </main>
      </body>
    </html>
  );
}
