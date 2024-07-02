import React from "react";
import Link from "next/link";
import {
  MdAdminPanelSettings,
  MdSpaceDashboard,
  MdOutlineSettings,
  MdLogout,
} from "react-icons/md";
import { LuTableProperties } from "react-icons/lu";
import { TbLogs } from "react-icons/tb";
import { CgProfile } from "react-icons/cg";
import { FaUsers } from "react-icons/fa";

const SideBar: React.FC = () => {
  return (
    <aside className="fixed top-0 left-0 h-full bg-black text-white shadow-md rounded-r-3xl bg-opacity-80 backdrop-blur-2xl backdrop-saturate-200 lg:w-60 z-50">
      <div className="p-4 flex items-center">
        <h2 className="text-white text-2xl font-semibold">
          <MdAdminPanelSettings className="text-4xl inline-block mr-2" />
          Admin Panel
        </h2>
      </div>
      <nav className="mt-6">
        <div className="p-4 flex items-center">
          <Link
            href="/admin/dashboard"
            passHref
            className="flex items-center text-gray-300 hover:bg-gray-700 hover:text-white py-2 px-4 rounded-md"
          >
            <MdSpaceDashboard className="text-2xl mr-2" />
            Dashboard
          </Link>
        </div>
        <div className="p-4 flex items-center">
          <Link
            href="/admin/properties"
            passHref
            className="flex items-center text-gray-300 hover:bg-gray-700 hover:text-white py-2 px-4 rounded-md"
          >
            <LuTableProperties className="text-2xl mr-2" />
            Properties
          </Link>
        </div>
        <div className="p-4 flex items-center">
          <Link
            href="/admin/blogs"
            passHref
            className="flex items-center text-gray-300 hover:bg-gray-700 hover:text-white py-2 px-4 rounded-md"
          >
            <TbLogs className="text-2xl mr-2" />
            Blogs
          </Link>
        </div>
        <div className="p-4 flex items-center">
          <Link
            href="/admin/blogs"
            passHref
            className="flex items-center text-gray-300 hover:bg-gray-700 hover:text-white py-2 px-4 rounded-md"
          >
            <FaUsers className="text-2xl mr-2" />
            Users
          </Link>
        </div>
      </nav>

      {/* Bottom Options */}
      <div className="absolute bottom-0 left-0 w-full">
        <div className="border-t border-slate-500"></div>
        <nav className="mt-6 mb-6 ml-2">
          <div className="p-2 flex items-center">
            <Link
              href="/admin/profile"
              passHref
              className="flex items-center text-gray-300 hover:bg-gray-700 hover:text-white px-1 rounded-md"
            >
              <CgProfile className="text-xl mr-2" />
              Profile
            </Link>
          </div>
          <div className="p-2 flex items-center">
            <Link
              href="/admin/settings"
              passHref
              className="flex items-center text-gray-300 hover:bg-gray-700 hover:text-white px-1 rounded-md"
            >
              <MdOutlineSettings className="text-xl mr-2" />
              Settings
            </Link>
          </div>
          <div className="p-2 flex items-center">
            <Link
              href="/admin/"
              passHref
              className="flex items-center text-gray-300 hover:bg-gray-700 hover:text-white px-1 rounded-md"
            >
              <MdLogout className="text-xl mr-2" />
              Logout
            </Link>
          </div>
        </nav>
      </div>
    </aside>
  );
};

export default SideBar;
