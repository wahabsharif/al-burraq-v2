import React from "react";
import Link from "next/link";
import { FaPlus } from "react-icons/fa";

const AddPropertyButton: React.FC = () => {
  return (
    <div className="flex justify-end items-center">
      <Link
        className="button  flex items-center bg-slate-700 hover:bg-blue-700 text-slate-100 text-2xl font-bold py-2 px-4"
        href="/admin/properties/add"
      >
        Add Property <FaPlus className="ml-2" />
      </Link>
    </div>
  );
};

export default AddPropertyButton;
