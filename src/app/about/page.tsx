import dynamic from "next/dynamic";
import WebLayout from "@/components/layouts/WebLayout";

const Banner = dynamic(() => import("@/components/common/Banner"));
const AboutIntro = dynamic(() => import("@/components/about/AboutIntro"));

export const metadata = {
  title: "Al-Burraq - About",
};

export default function About() {
  return (
    <WebLayout>
      <Banner title="About Us" />
      <AboutIntro />
    </WebLayout>
  );
}
