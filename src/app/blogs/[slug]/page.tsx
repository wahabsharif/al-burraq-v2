import BlogsDetails from "@/components/blogs/BlogsDetails";
import React from "react";
import dynamic from "next/dynamic";
import WebLayout from "@/components/layouts/WebLayout";

const Banner = dynamic(() => import("@/components/common/Banner"));

export const metadata = {
  title: "Al-Burraq - Blog Details",
};

interface BlogDetailsPageProps {
  params: { slug: string };
}

const BlogDetailsPage: React.FC<BlogDetailsPageProps> = ({ params }) => {
  return (
    <WebLayout>
      <Banner title="Blog Details" />
      <BlogsDetails slug={params.slug} />
    </WebLayout>
  );
};

export default BlogDetailsPage;
