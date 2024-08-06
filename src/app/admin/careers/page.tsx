import AdminLayout from "@/components/layouts/AdminLayout";
import Link from "next/link";

export const metadata = {
  title: "Al-Burraq - Dashboard",
};

export default function page() {
  return (
    <>
      <AdminLayout>
        <Link href={"/admin/careers/jobs-list"}>Jobs List</Link>
        <h2 className="text-center">Careers Page</h2>
      </AdminLayout>
    </>
  );
}
