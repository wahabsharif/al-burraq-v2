import React, { ReactNode } from "react";
import NavBar from "@/components/common/NavBar";
import Footer from "@/components/common/Footer";
import NextTopLoader from "nextjs-toploader";
import "@/styles/globals.css";

const WebLayout = ({ children }: { children: ReactNode }) => {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="flex flex-col min-h-screen">
        <main>
          <NextTopLoader
            color="rgb(198, 148,	57)"
            initialPosition={0.08}
            crawlSpeed={200}
            height={5}
            crawl={true}
            showSpinner={false}
            easing="ease"
            speed={200}
            shadow="0 0 10px rgb(255,230,158),0 0 5px rgb(255,230,158)"
            template='<div class="bar" role="bar"><div class="peg"></div></div> 
  <div class="spinner" role="spinner"><div class="spinner-icon"></div></div>'
            zIndex={1600}
            showAtBottom={false}
          />
          <NavBar />
          {children}
          <Footer />
        </main>
      </body>
    </html>
  );
};

export default WebLayout;
