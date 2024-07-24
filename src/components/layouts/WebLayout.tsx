import React, { ReactNode } from "react";
import NavBar from "@/components/common/NavBar";
import Footer from "@/components/common/Footer";
import "@/styles/globals.css";

const WebLayout = ({ children }: { children: ReactNode }) => {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="flex flex-col min-h-screen">
        <main>
          <NavBar />
          {children}
          <Footer />
        </main>
      </body>
    </html>
  );
};

export default WebLayout;
