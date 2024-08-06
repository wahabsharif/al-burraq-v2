import AddJobPostForm from "@/components/admin/Careers/AddJobPostForm";
import AdminLayout from "@/components/layouts/AdminLayout";

export const metadata = {
  title: "Al-Burraq - Dashboard",
};

export default function page() {
  return (
    <>
      <AdminLayout>
        <AddJobPostForm />
      </AdminLayout>
    </>
  );
}
