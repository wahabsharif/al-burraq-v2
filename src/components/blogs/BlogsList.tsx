"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import ShineBorder from "@/components/magicui/shine-border";

interface Blog {
  _id: string;
  images: string[];
  title: string;
  slug: string; // Keep slug for linking
}

const NEXT_PUBLIC_API_URL = process.env.NEXT_PUBLIC_API_URL;

interface BlogsListProps {
  currentSlug?: string;
}

export function BlogsList({ currentSlug }: BlogsListProps) {
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
        <div className="inline-block bg-black shadow-md p-2 rounded-xl bg-opacity-80 backdrop-blur-2xl backdrop-saturate-200">
          <h2 className="text-lg font-bold text-gradient">Read More Blogs.</h2>
        </div>
      </div>
      <div className="space-y-4">
        {blogs
          .filter((blog) => blog.slug !== currentSlug)
          .map((blog) => (
            <div key={blog._id}>
              <Link href={`/blogs/${blog.slug}`} className=" w-full">
                <ShineBorder
                  className="flex items-center p-4 border border-gray-200 rounded-lg shadow-md border-gray-200 w-[30rem] space-x-1"
                  color={["#A07CFE", "#FE8FB5", "#FFBE7B"]}
                >
                  <div className="relative w-24 h-16 flex-shrink-0">
                    <Image
                      src={blog.images[0]}
                      alt={blog.title}
                      layout="fill"
                      objectFit="cover"
                      className="rounded-lg"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg font-semibold text-lightGold2 truncate">
                      {blog.title}
                    </h3>
                  </div>
                </ShineBorder>
              </Link>
            </div>
          ))}
      </div>
    </section>
  );
}
