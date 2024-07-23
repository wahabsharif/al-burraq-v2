"use client";

import BlurFade from "@/components/magicui/blur-fade";
import BlurIn from "@/components/magicui/blur-in";
import axios from "axios";
import Image from "next/image";
import React, { useEffect, useState } from "react";

interface BlogsDetailsProps {
  slug: string;
}

interface Blog {
  title: string;
  createdAt: string;
  bodyContent: { content: string | undefined }[];
  images: string[];
}

const BlogsDetails: React.FC<BlogsDetailsProps> = ({ slug }) => {
  const [blog, setBlog] = useState<Blog | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/api/blogs/${slug}`
        );
        setBlog(response.data as Blog);
      } catch (err) {
        setError("Failed to fetch blog");
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [slug]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!blog) return <div>No blog found</div>;

  return (
    <section className="container mx-auto p-6">
      {/* Images */}
      <div className="mb-6">
        {blog.images.map((image, index) => (
          <BlurFade key={image} delay={0.25 * 0.1} inView>
            <Image
              className="mb-4 size-full rounded-lg object-contain"
              src={image || ""}
              alt={`Blog Details Image `}
              width={3500}
              height={2480}
            />
          </BlurFade>
        ))}
      </div>
      {/* Create Date */}
      <div className="flex justify-end mb-4">
        <p className="text-sm text-slate-100">
          Created At:{" "}
          {new Date(blog.createdAt).toLocaleDateString("en-US", {
            month: "long",
            day: "numeric",
            year: "numeric",
          })}
        </p>
      </div>
      {/* Heading */}
      <div className="flex justify-center items-center mb-5">
        <div className="inline-block bg-black shadow-md p-2 mb-4 rounded-xl bg-opacity-80 backdrop-blur-2xl backdrop-saturate-200">
          <BlurIn
            word={blog.title}
            className="font-bold text-3xl text-gradient"
          />
        </div>
      </div>

      {/* Body Content */}
      <BlurFade
        delay={0.25 * 2}
        inView
        className="inline-block bg-black shadow-md p-4 rounded-xl bg-opacity-80 backdrop-blur-2xl backdrop-saturate-200"
      >
        {blog.bodyContent.length > 0 ? (
          blog.bodyContent.map((item, index) => (
            <div
              key={index}
              dangerouslySetInnerHTML={{ __html: item.content || "" }}
            />
          ))
        ) : (
          <p>No content available.</p>
        )}
      </BlurFade>
    </section>
  );
};

export default BlogsDetails;
