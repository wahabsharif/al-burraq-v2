import JobApplications from "@/components/admin/Careers/JobApplications";
import AdminLayout from "@/components/layouts/AdminLayout";
import Link from "next/link";

export const metadata = {
  title: "Al-Burraq - Dashboard",
};

export default function page() {
  return (
    <>
      <AdminLayout>
        <div className="flex justify-end items-center mt-10">
          <Link
            className="button flex items-center bg-slate-700 hover:bg-blue-700 text-slate-100 text-xl font-bold py-2 px-4"
            href="/admin/jobs-list"
          >
            See The Posted Jobs
          </Link>
        </div>

        <JobApplications />
      </AdminLayout>
    </>
  );
}
