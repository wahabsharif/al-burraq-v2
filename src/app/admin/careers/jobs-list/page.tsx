import JobsPost from "@/components/admin/Careers/JobsPost";
import AdminLayout from "@/components/layouts/AdminLayout";

export const metadata = {
  title: "Al-Burraq - Dashboard",
};

export default function page() {
  return (
    <>
      <AdminLayout>
        <JobsPost />
      </AdminLayout>
    </>
  );
}
