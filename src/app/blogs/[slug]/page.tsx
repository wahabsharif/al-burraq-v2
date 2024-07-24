import React from "react";
import dynamic from "next/dynamic";
import { BlogsList } from "@/components/blogs/BlogsList";

const WebLayout = dynamic(() => import("@/components/layouts/WebLayout"));
const Banner = dynamic(() => import("@/components/common/Banner"));
const BlogsDetails = dynamic(() => import("@/components/blogs/BlogsDetails"));

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
      <div className="flex flex-col lg:flex-row gap-4 px-4">
        <div className="flex-1 lg:max-w-3/4 xl:max-w-2/3">
          <BlogsDetails slug={params.slug} />
        </div>
        <div className="w-full lg:w-1/4 xl:w-1/3 overflow-hidden">
          <div className="max-w-full">
            <BlogsList currentSlug={params.slug} />
          </div>
        </div>
      </div>
    </WebLayout>
  );
};

export default BlogDetailsPage;
