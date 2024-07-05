import React from "react";
import dynamic from "next/dynamic";

import WebLayout from "@/app/(home)/layout";

const Banner = dynamic(() => import("@/components/404/Banner"));

export default function NotFound() {
  return (
    <WebLayout title="404">
      <Banner />
    </WebLayout>
  );
}
