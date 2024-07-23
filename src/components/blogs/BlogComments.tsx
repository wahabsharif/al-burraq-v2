import { cn } from "@/lib/utils";
import Marquee from "@/components/magicui/marquee";
import Image from "next/image";
import UserImageIcon from "@/assets/icons/comment-users-icon.svg";

const comments = [
  {
    name: "Jack",
    comment:
      "I've never seen anything like this before. It's amazing. I love it.",
  },
  {
    name: "Jill",
    comment: "I don't know what to say. I'm speechless. This is amazing.",
  },
  {
    name: "John",
    comment: "I'm at a loss for words. This is amazing. I love it.",
  },
  {
    name: "Jane",
    comment: "I'm at a loss for words. This is amazing. I love it.",
  },
  {
    name: "Jenny",
    comment: "I'm at a loss for words. This is amazing. I love it.",
  },
  {
    name: "James",
    comment: "I'm at a loss for words. This is amazing. I love it.",
  },
];

const firstRow = comments.slice(0, comments.length / 2);
const secondRow = comments.slice(comments.length / 2);

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
          <figcaption className="text-lg font-bold dark:text-white">
            {name}
          </figcaption>
        </div>
      </div>
      <blockquote className="mt-2 text-md">{comment}</blockquote>
    </figure>
  );
};

export function BlogComments() {
  return (
    <div className="relative flex h-[500px] w-full flex-col items-center justify-center overflow-hidden md:shadow-xl">
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
