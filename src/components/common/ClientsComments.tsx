"use client";

import React, { useEffect, useState } from "react";
import Marquee from "@/components/magicui/marquee";
import Image from "next/image";
import UserImageIcon from "@/assets/icons/comment-users-icon.svg";
import ShineBorder from "@/components/magicui/shine-border";
import TypingAnimation from "@/components/magicui/typing-animation";

const NEXT_PUBLIC_API_URL = process.env.NEXT_PUBLIC_API_URL;

const CommentCard = ({ name, comment }: { name: string; comment: string }) => {
  return (
    <ShineBorder
      className="p-4 border border-gray-200 rounded-lg shadow-md flex flex-col justify-between relative w-32 md:w-40 lg:w-60 h-32 cursor-pointer overflow-hidden bg-opacity-80 backdrop-blur-2xl backdrop-saturate-200"
      color={["rgb(198, 148, 57)", "#FE8FB5", "#FFBE7B"]}
    >
      <figure className="flex flex-col">
        <div className="flex flex-row items-center gap-2">
          <Image
            className="rounded-full"
            width={40}
            height={40}
            alt="User Icon"
            src={UserImageIcon}
          />
          <div className="flex flex-col">
            <figcaption className="text-lg sm:text-2xl capitalize font-bold text-lightGold2">
              {name}
            </figcaption>
          </div>
        </div>
        <TypingAnimation
          className="mt-2 text-xs md:text-sm lg:text-md"
          text={comment}
        />
      </figure>
    </ShineBorder>
  );
};

export function ClientsComments() {
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

  const halfLength = Math.ceil(comments.length / 2);
  const firstRow = comments.slice(0, halfLength);
  const secondRow = comments.slice(halfLength);

  return (
    <div className="relative flex flex-col items-center justify-center overflow-hidden mt-10 px-4 md:px-6 lg:px-8">
      <div className="flex justify-center items-center mb-5">
        <div className="inline-block bg-black shadow-md p-4 rounded-xl bg-opacity-80 backdrop-blur-2xl backdrop-saturate-200">
          <h2 className="text-md font-bold text-gradient md:text-xl lg:text-3xl">
            What They Are Saying.
          </h2>
        </div>
      </div>
      <div className="w-full">
        <Marquee pauseOnHover className="[--duration:30s]">
          {firstRow.map((comment) => (
            <CommentCard key={comment.name} {...comment} />
          ))}
        </Marquee>
      </div>
      <div className="w-full">
        <Marquee reverse pauseOnHover className="[--duration:30s]">
          {secondRow.map((comment) => (
            <CommentCard key={comment.name} {...comment} />
          ))}
        </Marquee>
      </div>
    </div>
  );
}
