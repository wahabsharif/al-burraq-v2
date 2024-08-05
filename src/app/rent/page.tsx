import dynamic from "next/dynamic";
import WebLayout from "@/components/layouts/WebLayout";
import RentPropertiesGrid from "@/components/rent/RentPropertiesGrid";

const Banner = dynamic(() => import("@/components/common/Banner"));

export const metadata = {
  title: "Al-Burraq - Rent A Property",
};

export default function Rent() {
  return (
    <WebLayout>
      <Banner title="Rent A Property" />
      <RentPropertiesGrid />
    </WebLayout>
  );
}
