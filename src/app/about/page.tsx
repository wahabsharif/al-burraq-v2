import dynamic from "next/dynamic";
import WebLayout from "../(home)/layout";

// Use dynamic import for the Banner component
const Banner = dynamic(() => import("@/components/common/Banner"));

export default function About() {
  return (
    <WebLayout title="About Us">
      <Banner title="About Us" />
    </WebLayout>
  );
}
