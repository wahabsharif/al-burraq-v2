import PropertyList from "@/components/admin/Properties/PropertyList";
import React from "react";
import Link from "next/link";

export default function page() {
  return (
    <>
      <PropertyList />
      <Link href="/admin/properties/add">Add Property</Link>
    </>
  );
}
