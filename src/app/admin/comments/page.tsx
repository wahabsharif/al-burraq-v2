import CommentsList from "@/components/admin/Comments/CommentsList";
import AdminLayout from "@/components/layouts/AdminLayout";
import { FaRegComments } from "react-icons/fa";

export const metadata = {
  title: "Al-Burraq - Dashboard",
};

export default function page() {
  return (
    <>
      <AdminLayout>
        <div className="mx-auto max-w-screen-sm text-center">
          <h2 className="text-3xl text-darkGold font-extrabold mb-4 mt-4 lg:mb-16 bg-black shadow-md p-4 rounded-xl bg-opacity-80 backdrop-blur-2xl backdrop-saturate-200  flex items-center justify-center space-x-2">
            <FaRegComments />
            <span>Comments</span>
          </h2>
        </div>
        <CommentsList />
      </AdminLayout>
    </>
  );
}
