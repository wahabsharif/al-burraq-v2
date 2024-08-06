import AdminLayout from "@/components/layouts/AdminLayout";
import Link from "next/link";

export const metadata = {
  title: "Al-Burraq - Dashboard",
};

export default function page() {
  return (
    <>
      <AdminLayout>
        <h2>Careers Page</h2>
        <Link href={"/admin/careers/add"}>Post A Job</Link>
      </AdminLayout>
    </>
  );
}
