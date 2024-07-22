import dynamic from "next/dynamic";
import WebLayout from "@/components/layouts/WebLayout";

const NEXT_PUBLIC_API_URL = process.env.NEXT_PUBLIC_API_URL;
const Banner = dynamic(() => import("@/components/common/Banner"));
const PropertyDetails = dynamic(
  () => import("@/components/home/PropertyDetails"),
  {
    ssr: false,
  }
);

const fetchPropertyData = async (slug: string) => {
  const response = await fetch(
    `${NEXT_PUBLIC_API_URL}/api/properties/slug/${slug}`,
    { cache: "no-store" }
  );
  if (!response.ok) {
    throw new Error("Failed to fetch property data");
  }
  return response.json();
};

// Metadata generation function
export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}) {
  const { slug } = params;
  const property = await fetchPropertyData(slug);
  return {
    title: `Al-Burraq - ${property.title}`,
    description: `Details of the property: ${property.description}`,
  };
}

export default async function PropertyDetailsPage({
  params,
}: {
  params: { slug: string };
}) {
  const { slug } = params;
  const property = await fetchPropertyData(slug);

  return (
    <WebLayout>
      <Banner title={property.title} />
      <PropertyDetails property={property} />
    </WebLayout>
  );
}
