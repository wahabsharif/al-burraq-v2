import dynamic from "next/dynamic";
import WebLayout from "./layout";
import FeaturedProperties from "@/components/home/FeaturedProperties";

// Use dynamic imports for your components
const Hero = dynamic(() => import("@/components/home/Hero"));
const Team = dynamic(() => import("@/components/home/Team"));
const TrustedDeveloper = dynamic(
  () => import("@/components/home/TrustedDeveloper")
);

export default function Home() {
  return (
    <>
      <WebLayout>
        <Hero />
        <FeaturedProperties />
        <TrustedDeveloper />
        <Team />
      </WebLayout>
    </>
  );
}
