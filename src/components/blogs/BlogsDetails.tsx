"use client";

import BlurFade from "@/components/magicui/blur-fade";
import BlurIn from "@/components/magicui/blur-in";
import axios from "axios";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { DotLoader } from "react-spinners";

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
  const [error, setError] = useState<string | null>(null);
  const [initialDelay, setInitialDelay] = useState<boolean>(true);

  useEffect(() => {
    // Simulate a 3-second delay before starting to fetch the data
    const delayTimer = setTimeout(() => {
      setInitialDelay(false);
    }, 2000);

    const fetchBlog = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/api/blogs/${slug}`
        );
        setBlog(response.data as Blog);
      } catch (err) {
        setError("Failed to fetch blog");
      }
    };

    // Start fetching data after the initial delay
    if (!initialDelay) {
      fetchBlog();
      clearTimeout(delayTimer);
    }

    // Cleanup timeout if component unmounts
    return () => clearTimeout(delayTimer);
  }, [slug, initialDelay]);

  if (initialDelay) {
    return (
      <div className="flex items-center justify-center h-screen">
        <DotLoader color="rgb(198, 148, 57)" />
      </div>
    );
  }

  if (error) return <div>Error: {error}</div>;
  if (!blog) return <div>No blog found</div>;

  return (
    <section className="container mx-auto p-6 sm:px-4 sm:py-4">
      {/* Images */}
      <div className="mb-3 flex flex-wrap justify-center">
        {blog.images.map((image, index) => (
          <BlurFade key={image} delay={0.25 * 0.1} inView>
            <Image
              className="mb-4 max-w-full h-auto rounded-lg object-contain"
              src={image || ""}
              alt={`Blog Details Image ${index}`}
              width={3500}
              height={2480}
            />
          </BlurFade>
        ))}
      </div>
      {/* Create Date */}
      <div className="flex justify-end m-2">
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
            className="font-bold text-lg md:text-2xl lg:text-4xl text-gradient"
          />
        </div>
      </div>

      {/* Body Content */}
      <BlurFade
        delay={0.25 * 2}
        inView
        className="bg-black shadow-md p-4 rounded-xl bg-opacity-80 backdrop-blur-2xl backdrop-saturate-200 w-full"
      >
        {blog.bodyContent.length > 0 ? (
          blog.bodyContent.map((item, index) => (
            <div
              key={index}
              dangerouslySetInnerHTML={{ __html: item.content || "" }}
              className="w-full"
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
