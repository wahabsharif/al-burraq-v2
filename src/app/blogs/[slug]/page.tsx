import dynamic from "next/dynamic";
import WebLayout from "@/components/layouts/WebLayout";

const Banner = dynamic(() => import("@/components/common/Banner"));

export const metadata = {
  title: "Al-Burraq - Our Blogs",
};

export default function About() {
  return (
    <WebLayout>
      <Banner title="Our Blogs" />
    </WebLayout>
  );
}
