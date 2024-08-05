"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import ShineBorder from "@/components/magicui/shine-border";
import { FadeLoader } from "react-spinners";

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
  const [loading, setLoading] = useState<boolean>(true);
  const [initialDelay, setInitialDelay] = useState<boolean>(true);

  useEffect(() => {
    // Simulate a 3-second delay before starting to fetch the data
    const delayTimer = setTimeout(() => {
      setInitialDelay(false);
    }, 3000);

    const fetchBlogs = async () => {
      try {
        const response = await axios.get(`${NEXT_PUBLIC_API_URL}/api/blogs`);
        setBlogs(response.data);
      } catch (error) {
        console.error("Error fetching blogs:", error);
      } finally {
        setLoading(false);
      }
    };

    // Start fetching data after the initial delay
    if (!initialDelay) {
      fetchBlogs();
      clearTimeout(delayTimer);
    }

    // Cleanup timeout if component unmounts
    return () => clearTimeout(delayTimer);
  }, [initialDelay]);

  if (initialDelay) {
    return (
      <div className="flex items-center justify-center h-screen">
        <FadeLoader
          color="#3498db"
          height={15}
          width={10}
          radius={5}
          margin={5}
        />
      </div>
    );
  }

  if (loading)
    return (
      <div className="flex items-center justify-center h-screen">
        <FadeLoader
          color="#3498db"
          height={15}
          width={10}
          radius={5}
          margin={5}
        />
      </div>
    );

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
              <Link href={`/blogs/${blog.slug}`} className="w-full">
                <ShineBorder
                  className="flex items-center p-2 border border-gray-200 rounded-lg shadow-md border-gray-200 w-[25rem] space-x-1"
                  color={["#A07CFE", "#FE8FB5", "#FFBE7B"]}
                >
                  <div className="relative w-16 h-10 flex-shrink-0 lg:w-24 lg:h-16">
                    <Image
                      src={blog.images[0]}
                      alt={blog.title}
                      layout="fill"
                      objectFit="cover"
                      className="rounded-lg"
                    />
                  </div>
                  <div className="flex-1 min-w-0 ml-2">
                    <h3 className="text-sm font-semibold text-lightGold2 truncate lg:text-lg">
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
