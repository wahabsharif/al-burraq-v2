import WebLayout from "@/components/layouts/WebLayout";
import Banner from "@/components/common/Banner";
import RentPropertyDetails from "@/components/rent/RentPropertyDetails";
import axios from "axios";
import RentPropertyList from "@/components/rent/RentPropertyList";

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

interface RentPropertyDetailsPageProps {
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

const RentPropertyDetailsPage = async ({
  params,
}: RentPropertyDetailsPageProps) => {
  const property = await fetchProperty(params.slug);

  return (
    <WebLayout>
      <Banner title="Rent Property Details" />
      <div className="flex flex-col md:flex-row">
        <div className="flex-1">
          <RentPropertyDetails property={property} />
        </div>
        <div className="w-full md:w-1/3 md:ml-4">
          <RentPropertyList />
        </div>
      </div>
    </WebLayout>
  );
};

export default RentPropertyDetailsPage;
