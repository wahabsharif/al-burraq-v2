import dynamic from "next/dynamic";
import WebLayout from "@/components/layouts/WebLayout";
import AboutIntro from "@/components/about/AboutIntro";

// Use dynamic import for the Banner component
const Banner = dynamic(() => import("@/components/common/Banner"));

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
