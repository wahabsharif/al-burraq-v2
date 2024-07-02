import React, { ReactNode } from "react";

import "@/styles/admin.css";

export const metadata = {
  title: "Al-Burraq Dashboard",
  description: "Next.js starter app",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="flex flex-col min-h-screen">{children}</body>
    </html>
  );
}
