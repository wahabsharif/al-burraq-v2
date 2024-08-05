import WebLayout from "@/components/layouts/WebLayout";
import Banner from "@/components/common/Banner";
import BuyPropertyDetails from "@/components/buy/BuyPropertyDetails";
import axios from "axios";
import BuyPropertyList from "@/components/buy/BuyPropertyList";

// types/property.ts
export interface Property {
  _id: string;
  title: string;
  description: string;
  price: number;
  location: string;
  image: string[];
  purpose: string;
  propertyType: string;
  area: number;
  slug: string;
}

interface BuyPropertyDetailsPageProps {
  params: {
    slug: string;
  };
}

const fetchProperty = async (slug: string): Promise<Property> => {
  const response = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/api/properties/slug/${slug}`
  );
  return response.data;
};

const BuyPropertyDetailsPage = async ({
  params,
}: BuyPropertyDetailsPageProps) => {
  const property = await fetchProperty(params.slug);

  return (
    <WebLayout>
      <Banner title="Buy Property Details" />
      <div className="flex flex-col md:flex-row">
        <div className="flex-1">
          <BuyPropertyDetails property={property} loading={true} />
        </div>
        <div className="w-full md:w-1/3 md:ml-4">
          <BuyPropertyList />
        </div>
      </div>
    </WebLayout>
  );
};

export default BuyPropertyDetailsPage;
