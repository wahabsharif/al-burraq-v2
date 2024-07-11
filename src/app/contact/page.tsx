import dynamic from "next/dynamic";
import WebLayout from "@/components/layouts/WebLayout";
import ContactArea from "@/components/contact/ContactArea";

export const metadata = {
  title: "Al-Burraq -Contact",
};

// Use dynamic import for the Banner component
const Banner = dynamic(() => import("@/components/common/Banner"));

export default function Contact() {
  return (
    <WebLayout>
      <Banner title="Contact Us" />
      <ContactArea />
    </WebLayout>
  );
}
