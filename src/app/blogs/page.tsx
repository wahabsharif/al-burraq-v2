import dynamic from "next/dynamic";
import { BlogsGrid } from "@/components/blogs/BlogsGrid";
import { ClientsComments } from "@/components/common/ClientsComments";

const WebLayout = dynamic(() => import("@/components/layouts/WebLayout"));
const Banner = dynamic(() => import("@/components/common/Banner"));
const CommentForm = dynamic(() => import("@/components/common/CommentForm"));

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
