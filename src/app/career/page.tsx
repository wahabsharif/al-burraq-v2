import dynamic from "next/dynamic";
import WebLayout from "@/components/layouts/WebLayout";
import UserJobPosts from "@/components/careers/UserJobPosts";

const Banner = dynamic(() => import("@/components/common/Banner"));

export const metadata = {
  title: "Al-Burraq - Career",
};

export default function Career() {
  return (
    <WebLayout>
      <Banner title="Build Your Career With Us" />
      <UserJobPosts />
    </WebLayout>
  );
}
