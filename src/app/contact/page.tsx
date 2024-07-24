import dynamic from "next/dynamic";

export const metadata = {
  title: "Al-Burraq -Contact",
};

// Use dynamic import for the Banner component
const WebLayout = dynamic(() => import("@/components/layouts/WebLayout"));
const Banner = dynamic(() => import("@/components/common/Banner"));
const ContactArea = dynamic(() => import("@/components/contact/ContactArea"));

export default function Contact() {
  return (
    <WebLayout>
      <Banner title="Contact Us" />
      <ContactArea />
    </WebLayout>
  );
}
