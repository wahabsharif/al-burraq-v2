import React from "react";
import dynamic from "next/dynamic";

import WebLayout from "@/components/layouts/WebLayout";

const Banner = dynamic(() => import("@/components/404/Banner"));

export const metadata = {
  title: "Al-Burraq - 404",
};

export default function NotFound() {
  return (
    <WebLayout>
      <Banner />
    </WebLayout>
  );
}
