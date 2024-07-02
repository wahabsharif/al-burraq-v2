import CreatePropertyForm from "@/components/admin/Properties/AddPropertyForm";
import PropertyList from "@/components/admin/Properties/PropertyList";
import React from "react";

export default function page() {
  return (
    <>
      <PropertyList />
      <CreatePropertyForm />
    </>
  );
}
