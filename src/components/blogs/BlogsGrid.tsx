// src/components/BlogsGrid.tsx

"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";
import ShineBorder from "@/components/magicui/shine-border";
import ShimmerButton from "@/components/magicui/shimmer-button";
import Link from "next/link";

interface Blog {
  _id: string;
  images: string[];
  title: string;
  shortDescription: string;
  createdAt: string;
  slug: string; // Add slug to the Blog interface
}

const NEXT_PUBLIC_API_URL = process.env.NEXT_PUBLIC_API_URL;

export function BlogsGrid() {
  const [blogs, setBlogs] = useState<Blog[]>([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axios.get(`${NEXT_PUBLIC_API_URL}/api/blogs`);
        setBlogs(response.data);
      } catch (error) {
        console.error("Error fetching blogs:", error);
      }
    };

    fetchBlogs();
  }, []);

  return (
    <section className="mx-auto max-w-screen-lg text-white mt-6 mb-3">
      <div className="flex justify-center items-center mb-5">
        <div className="inline-block bg-black shadow-md p-4 rounded-xl bg-opacity-80 backdrop-blur-2xl backdrop-saturate-200">
          <h2 className="text-3xl font-bold text-gradient">
            Our Latest Blogs.
          </h2>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {blogs.map((blog) => (
          <div key={blog._id} className="w-full">
            <ShineBorder
              className="p-4 border border-gray-200 rounded-lg shadow-md h-full flex flex-col justify-between"
              color={["#A07CFE", "#FE8FB5", "#FFBE7B"]}
            >
              <div className="mb-4">
                <div className="relative w-full h-40 mb-4">
                  <Image
                    src={blog.images[0]}
                    alt={blog.title}
                    layout="fill"
                    objectFit="cover"
                    className="rounded-lg"
                  />
                </div>
                <h2 className="text-lightGold2 text-xl font-semibold mb-2">
                  {blog.title}
                </h2>
                <p className="text-xs text-gray-400">
                  Created At:{" "}
                  {new Date(blog.createdAt).toLocaleDateString("en-US", {
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                  })}
                </p>
                <p className="text-md text-gray-600 mb-2 line-clamp-3">
                  {blog.shortDescription}
                </p>
              </div>
              <Link href={`/blogs/${blog.slug}`}>
                <ShimmerButton className="shadow-2xl mt-4 cursor-pointer">
                  <span className="whitespace-pre-wrap font-bold text-center text-sm leading-none tracking-tight text-white dark:from-white dark:to-slate-900/10 lg:text-lg">
                    Read More...
                  </span>
                </ShimmerButton>
              </Link>
            </ShineBorder>
          </div>
        ))}
      </div>
    </section>
  );
}
