"use client";

import React, { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import Marquee from "@/components/magicui/marquee";
import Image from "next/image";
import UserImageIcon from "@/assets/icons/comment-users-icon.svg";

const NEXT_PUBLIC_API_URL = process.env.NEXT_PUBLIC_API_URL;

const CommentCard = ({ name, comment }: { name: string; comment: string }) => {
  return (
    <figure
      className={cn(
        "relative w-64 cursor-pointer overflow-hidden rounded-xl border p-4 bg-opacity-80 backdrop-blur-2xl backdrop-saturate-200",
        // light styles
        "border-gray-950/[.1] bg-gray-950/[.01] hover:bg-gray-950/[.05]",
        // dark styles
        "dark:border-gray-50/[.1] dark:bg-gray-50/[.10] dark:hover:bg-gray-50/[.15]"
      )}
    >
      <div className="flex flex-row items-center gap-2">
        <Image
          className="rounded-full"
          width="40"
          height="40"
          alt=""
          src={UserImageIcon}
        />
        <div className="flex flex-col">
          <figcaption className="text-2xl capitalize font-bold dark:text-white">
            {name}
          </figcaption>
        </div>
      </div>
      <blockquote className="mt-2 text-md">{comment}</blockquote>
    </figure>
  );
};

export function BlogComments() {
  const [comments, setComments] = useState<{ name: string; comment: string }[]>(
    []
  );

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await fetch(`${NEXT_PUBLIC_API_URL}/api/comments`);
        const data = await response.json();
        setComments(data);
      } catch (error) {
        console.error("Error fetching comments:", error);
      }
    };

    fetchComments();
  }, []);

  const firstRow = comments.slice(0, comments.length / 2);
  const secondRow = comments.slice(comments.length / 2);

  return (
    <div className="relative flex h-[500px] w-full flex-col mt-10 items-center justify-center overflow-hidden md:shadow-xl">
      <div className="flex justify-center items-center mb-5">
        <div className="inline-block bg-black shadow-md p-4 rounded-xl bg-opacity-80 backdrop-blur-2xl backdrop-saturate-200">
          <h2 className="text-3xl font-bold text-gradient">
            What they are saying.
          </h2>
        </div>
      </div>
      <Marquee pauseOnHover className="[--duration:20s]">
        {firstRow.map((comment) => (
          <CommentCard key={comment.name} {...comment} />
        ))}
      </Marquee>
      <Marquee reverse pauseOnHover className="[--duration:20s]">
        {secondRow.map((comment) => (
          <CommentCard key={comment.name} {...comment} />
        ))}
      </Marquee>
      <div className="pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-white dark:from-background"></div>
      <div className="pointer-events-none absolute inset-y-0 right-0 w-1/3 bg-gradient-to-l from-white dark:from-background"></div>
    </div>
  );
}
