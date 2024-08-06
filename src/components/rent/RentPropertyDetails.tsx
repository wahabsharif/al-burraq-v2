import axios from "axios";
import { GetServerSideProps } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  IoCallOutline,
  IoLocationOutline,
  IoMailOutline,
} from "react-icons/io5";
import DotLoader from "react-spinners/DotLoader";

interface Property {
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

const NEXT_PUBLIC_API_URL = process.env.NEXT_PUBLIC_API_URL;

interface RentPropertyDetailsProps {
  property: Property | null;
  error?: string;
}

const RentPropertyDetails = ({ property, error }: RentPropertyDetailsProps) => {
  const formatNumber = (num: number) => {
    return num.toLocaleString();
  };

  if (!property && !error) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <DotLoader color="rgb(198, 148, 57)" />
      </div>
    );
  }

  if (error) {
    return <div className="text-center text-red-500">{error}</div>;
  }

  return (
    <section className="container mx-auto p-4 sm:px-6 md:px-8 lg:px-10 xl:px-12">
      <div className="flex justify-center">
        <div className="bg-black shadow-md p-4 rounded-xl bg-opacity-80 backdrop-blur-2xl backdrop-saturate-200 w-full max-w-5xl">
          <Image
            src={property!.image[0]}
            alt={property!.title}
            className="w-full h-64 sm:h-80 md:h-96 lg:h-[30rem] object-cover mb-4 rounded"
            width={1000}
            height={800}
          />
          <div className="flex justify-center items-center mb-5">
            <div className="inline-block">
              <h2 className="text-xl md:text-3xl lg:text-4xl font-bold text-gradient">
                {property!.title}
              </h2>
            </div>
          </div>
          <div>
            <div className="mt-2 text-sm sm:text-md md:text-lg text-gradient">
              AED{" "}
              <span className="text-xl sm:text-2xl md:text-3xl font-bold">
                {formatNumber(property!.price)}
              </span>
            </div>
            <div className="mt-2 flex flex-wrap items-center text-sm sm:text-md text-gray-400 gap-2">
              <div className="capitalize">{property!.propertyType}</div>
              <span className="mx-2">|</span>
              <div className="capitalize">{property!.purpose}</div>
              <span className="mx-2">|</span>
              <div>Area: {formatNumber(property!.area)} sq. ft.</div>
            </div>
            <div className="flex items-center my-4 max-w-full overflow-hidden">
              <IoLocationOutline className="mr-2 text-2xl" />
              <div className="text-ellipsis whitespace-nowrap overflow-hidden max-w-full">
                {property!.location}
              </div>
            </div>
            <p className="text-gray-600">{property!.description}</p>
          </div>
          <div className="flex items-center justify-center mt-4 space-x-4">
            <Link
              href={`tel:#`}
              className="shiny-btn p-2 font-bold flex items-center"
            >
              <IoCallOutline className="text-2xl" />
              <span className="ml-1">Call</span>
            </Link>
            <Link
              href={`mailto:#`}
              className="shiny-btn p-2 font-bold flex items-center"
            >
              <IoMailOutline className="text-2xl" />
              <span className="ml-1">Mail</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { slug } = context.params!;
  try {
    const response = await axios.get(
      `${NEXT_PUBLIC_API_URL}/api/properties/slug/${slug}`
    );
    return {
      props: {
        property: response.data,
      },
    };
  } catch (error) {
    return {
      props: {
        property: null,
        error: "Failed to fetch property details.",
      },
    };
  }
};

export default RentPropertyDetails;
