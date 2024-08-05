import dynamic from "next/dynamic";
import WebLayout from "@/components/layouts/WebLayout";
import BuyPropertiesGrid from "@/components/buy/BuyPropertiesGrid";

const Banner = dynamic(() => import("@/components/common/Banner"));

export const metadata = {
  title: "Al-Burraq - Buy A Property",
};

export default function Buy() {
  return (
    <WebLayout>
      <Banner title="Buy A Property" />
      <BuyPropertiesGrid />
    </WebLayout>
  );
}
