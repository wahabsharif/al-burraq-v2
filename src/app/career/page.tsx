import dynamic from "next/dynamic";
import WebLayout from "@/components/layouts/WebLayout";
import CareerForm from "@/components/careers/CareerForm";

const Banner = dynamic(() => import("@/components/common/Banner"));

export const metadata = {
  title: "Al-Burraq - Career",
};

export default function Career() {
  return (
    <WebLayout>
      <Banner title="Build Your Career With Us" />
      <CareerForm />
    </WebLayout>
  );
}
