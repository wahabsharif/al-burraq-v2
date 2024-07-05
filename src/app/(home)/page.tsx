// src/app/(home)/page.tsx

import dynamic from "next/dynamic";
import FeaturedProperties from "@/components/home/FeaturedProperties";
import SearchBarNew from "@/components/home/SearchBarNew";

const Hero = dynamic(() => import("@/components/home/Hero"));
const Team = dynamic(() => import("@/components/home/Team"));
const TrustedDeveloper = dynamic(
  () => import("@/components/home/TrustedDeveloper")
);
const SearchBar = dynamic(() => import("@/components/home/SearchBar"), {
  ssr: false,
});

export default function Home() {
  return (
    <>
      <Hero />
      {/* <SearchBar /> */}
      <SearchBarNew />
      <FeaturedProperties />
      <TrustedDeveloper />
      <Team />
    </>
  );
}
