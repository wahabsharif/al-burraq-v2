import JobPostList from "@/components/admin/JobPost/JobPostList";
import AdminLayout from "@/components/layouts/AdminLayout";
import PostAJobButton from "@/components/admin/JobPost/PostAJobButton"; // Import the button component

export const metadata = {
  title: "Al-Burraq - Dashboard",
};

export default function Page() {
  return (
    <>
      <AdminLayout>
        <div className="container mx-auto p-4">
          <JobPostList />
          <div className="mt-10 text-left">
            <PostAJobButton />
          </div>
        </div>
      </AdminLayout>
    </>
  );
}
