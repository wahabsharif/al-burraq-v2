import WebLayout from "@/components/layouts/WebLayout";
import Hero from "@/components/home/Hero";
import SearchBarNew from "@/components/home/SearchBarNew";
import FeaturedProperties from "@/components/home/FeaturedProperties";
import TrustedDeveloper from "@/components/home/TrustedDeveloper";
import Team from "@/components/home/Team";
import { ClientsComments } from "@/components/common/ClientsComments";
import CommentForm from "@/components/common/CommentForm";

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
