import AddPropertyButton from "@/components/admin/Properties/AddPropertyButton";
import PropertyList from "@/components/admin/Properties/PropertyList";
import React from "react";

export default function page() {
  return (
    <>
      <PropertyList />
      <AddPropertyButton />
    </>
  );
}
