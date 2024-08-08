import CareerForm from "@/components/careers/CareerForm";
import WebLayout from "@/components/layouts/WebLayout";
import dynamic from "next/dynamic";

const Banner = dynamic(() => import("@/components/common/Banner"));

export const metadata = {
  title: "Al-Burraq - Career | Application Form",
};

export default function Career() {
  return (
    <WebLayout>
      <Banner title="Apply To Your Dream Job" />
      <CareerForm />
    </WebLayout>
  );
}
