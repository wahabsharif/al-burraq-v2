import Hero from "@/components/home/Hero";
import Team from "@/components/home/Team";
import TrustedDeveloper from "@/components/home/TrustedDeveloper";
import WebLayout from "./layout";

export default function Home() {
  return (
    <>
      <WebLayout>
        <Hero />
        <TrustedDeveloper />
        <Team />
      </WebLayout>
    </>
  );
}
