import { ClientsComments } from "@/components/common/ClientsComments";
import dynamic from "next/dynamic";

const WebLayout = dynamic(() => import("@/components/layouts/WebLayout"));
const Hero = dynamic(() => import("@/components/home/Hero"));
const SearchBarNew = dynamic(() => import("@/components/home/SearchBarNew"));
const FeaturedProperties = dynamic(
  () => import("@/components/home/FeaturedProperties")
);
const TrustedDeveloper = dynamic(
  () => import("@/components/home/TrustedDeveloper")
);
const Team = dynamic(() => import("@/components/home/Team"));

const CommentForm = dynamic(() => import("@/components/common/CommentForm"));

export const metadata = {
  title: "Al-Burraq",
};

export default function Home() {
  return (
    <>
      <WebLayout>
        <Hero />
        <SearchBarNew />
        <FeaturedProperties />
        <TrustedDeveloper />
        <Team />
        <ClientsComments />
        <CommentForm />
      </WebLayout>
    </>
  );
}
