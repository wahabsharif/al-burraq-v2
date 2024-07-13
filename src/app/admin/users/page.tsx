import AddUserForm from "@/components/admin/Users/AddUserForm";
import UsersList from "@/components/admin/Users/UsersList";
import AdminLayout from "@/components/layouts/AdminLayout";

export const metadata = {
  title: "Al-Burraq - Dashboard",
};

export default function page() {
  return (
    <>
      <AdminLayout>
        <h2>Users</h2>
        <AddUserForm />
        <UsersList />
      </AdminLayout>
    </>
  );
}
