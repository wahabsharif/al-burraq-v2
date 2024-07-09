import dynamic from "next/dynamic";
import WebLayout from "@/app/(home)/layout";
import ContactArea from "@/components/contact/ContactArea";

// Use dynamic import for the Banner component
const Banner = dynamic(() => import("@/components/common/Banner"));

export default function Contact() {
  return (
    <WebLayout title="Contact Us">
      <Banner title="Contact Us" />
      <ContactArea />
    </WebLayout>
  );
}
