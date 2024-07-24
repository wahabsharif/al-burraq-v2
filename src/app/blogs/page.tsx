import dynamic from "next/dynamic";
import WebLayout from "@/components/layouts/WebLayout";
import { BlogsGrid } from "@/components/blogs/BlogsGrid";
import { ClientsComments } from "@/components/common/ClientsComments";
import CommentForm from "@/components/common/CommentForm";

const Banner = dynamic(() => import("@/components/common/Banner"));

export const metadata = {
  title: "Al-Burraq - Our Blogs",
};

export default function About() {
  return (
    <WebLayout>
      <Banner title="Our Blogs" />
      <BlogsGrid />
      <ClientsComments />
      <CommentForm />
    </WebLayout>
  );
}
