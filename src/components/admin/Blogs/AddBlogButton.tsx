import React from "react";
import Link from "next/link";
import { FaPlus } from "react-icons/fa";

const AddBlogButton: React.FC = () => {
  return (
    <div className="flex justify-end items-center">
      <Link
        className="button flex items-center bg-slate-700 hover:bg-blue-700 text-slate-100 text-xl font-bold py-2 px-4"
        href="/admin/blogs/add"
      >
        Add Blogs <FaPlus className="ml-2" />
      </Link>
    </div>
  );
};

export default AddBlogButton;
