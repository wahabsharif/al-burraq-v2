import JobPostForm from "@/components/admin/JobPost/JobPostForm";
import AdminLayout from "@/components/layouts/AdminLayout";

export const metadata = {
  title: "Al-Burraq - Dashboard",
};

export default function page() {
  return (
    <>
      <AdminLayout>
        <JobPostForm />
      </AdminLayout>
    </>
  );
}
