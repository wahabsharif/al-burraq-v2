"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";
import ShineBorder from "@/components/magicui/shine-border";
import ShimmerButton from "@/components/magicui/shimmer-button";
import Link from "next/link";
import ItemsLoader from "@/components/common/ItemsLoader";

interface Blog {
  _id: string;
  images: string[];
  title: string;
  shortDescription: string;
  createdAt: string;
  slug: string;
}

const NEXT_PUBLIC_API_URL = process.env.NEXT_PUBLIC_API_URL;

export function BlogsGrid() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [displayContent, setDisplayContent] = useState<boolean>(false);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axios.get(`${NEXT_PUBLIC_API_URL}/api/blogs`);
        setBlogs(response.data);

        setTimeout(() => {
          setLoading(false);
          setDisplayContent(true);
        }, 3000);
      } catch (error) {
        console.error("Error fetching blogs:", error);
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  if (loading) {
    return <ItemsLoader />;
  }

  if (!displayContent) {
    return <ItemsLoader />;
  }

  return (
    <section className="mx-auto p-4 text-white mt-6 mb-3">
      <div className="flex justify-center items-center mb-5">
        <div className="inline-block bg-black shadow-md p-4 rounded-xl bg-opacity-80 backdrop-blur-2xl backdrop-saturate-200">
          <h2 className="text-md font-bold text-gradient md:text-xl lg:text-3xl">
            Read Our Latest Blogs.
          </h2>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {blogs.map((blog) => (
          <div key={blog._id} className="w-full">
            <ShineBorder
              className="p-4 border border-gray-200 rounded-lg shadow-md h-full flex flex-col justify-between"
              color={["rgb(198, 148, 57)", "#FE8FB5", "#FFBE7B"]}
            >
              <div className="mb-4">
                <div className="relative w-full h-40 sm:h-48 lg:h-56 mb-4">
                  <Image
                    src={blog.images[0]}
                    alt={blog.title}
                    layout="fill"
                    objectFit="cover"
                    className="rounded-lg"
                  />
                </div>
                <h2 className="text-lightGold2 text-lg sm:text-xl font-semibold mb-2">
                  {blog.title}
                </h2>
                <p className="text-xs text-gray-400 my-5">
                  Created At:{" "}
                  {new Date(blog.createdAt).toLocaleDateString("en-US", {
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                  })}
                </p>
                <p className="text-sm sm:text-md text-gray-600 mb-2 line-clamp-3">
                  {blog.shortDescription}
                </p>
              </div>
              <Link href={`/blogs/${blog.slug}`}>
                <ShimmerButton className="shadow-2xl mt-4 cursor-pointer">
                  <span className="whitespace-pre-wrap font-bold text-center text-xs sm:text-sm leading-none tracking-tight text-white lg:text-lg">
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
