import AddUserForm from "@/components/admin/Users/AddUserForm";
import UsersList from "@/components/admin/Users/UsersList";
import AdminLayout from "@/components/layouts/AdminLayout";
import { FaUserShield } from "react-icons/fa";

export const metadata = {
  title: "Al-Burraq - Dashboard",
};

export default function page() {
  return (
    <>
      <AdminLayout>
        <div className="mx-auto max-w-screen-sm text-center">
          <h2 className="text-3xl text-darkGold font-extrabold mb-4 mt-4 lg:mb-16 bg-black shadow-md p-4 rounded-xl bg-opacity-80 backdrop-blur-2xl backdrop-saturate-200  flex items-center justify-center space-x-2">
            <FaUserShield />
            <span>Users</span>
          </h2>
        </div>
        <AddUserForm />
        <UsersList />
      </AdminLayout>
    </>
  );
}
