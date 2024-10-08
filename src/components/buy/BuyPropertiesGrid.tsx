"use client";

import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { IoLocationOutline } from "react-icons/io5";
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

const BuyPropertiesGrid = () => {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchBuyPropertiesGrid = async () => {
      try {
        const response = await axios.get(
          `${NEXT_PUBLIC_API_URL}/api/properties?purpose=buy`
        );
        setProperties(response.data);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch properties.");
        setLoading(false);
      }
    };

    fetchBuyPropertiesGrid();
  }, []);

  const formatNumber = (num: number) => {
    return num.toLocaleString();
  };

  if (loading) {
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
    <section className="container mx-auto p-4">
      <div className="flex justify-center items-center mb-5">
        <div className="inline-block bg-black shadow-md p-4 rounded-xl bg-opacity-80 backdrop-blur-2xl backdrop-saturate-200">
          <h2 className="text-md font-bold text-gradient md:text-xl lg:text-3xl">
            Buy A Property.
          </h2>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {properties.length === 0 ? (
          <div className="text-center">No properties found.</div>
        ) : (
          properties.map((property) => (
            <Link key={property._id} href={`/buy/${property.slug}`}>
              <div className="bg-black shadow-md p-4 rounded-xl bg-opacity-80 backdrop-blur-2xl backdrop-saturate-200 h-full flex flex-col justify-between">
                <Image
                  src={property.image[0]}
                  alt={property.title}
                  className="w-full h-48 object-cover mb-4 rounded"
                  width={1000}
                  height={800}
                />
                <div>
                  <div className="mt-2 text-xs text-gradient">
                    AED{" "}
                    <span className="text-xl font-bold">
                      {formatNumber(property.price)}
                    </span>
                  </div>
                  <div className="mt-2 flex items-center text-sm text-gray-400 gap-1">
                    <div className="capitalize">{property.propertyType}</div>
                    <span className="mx-2">|</span>
                    <div className="mx-2 capitalize">{property.purpose}</div>
                    <span className="mx-2">|</span>
                    <div>Area: {formatNumber(property.area)} sq. ft.</div>
                  </div>
                  <div className="text-md font-bold mt-4">{property.title}</div>
                  <div className="flex items-center mt-4 max-w-full overflow-hidden">
                    <IoLocationOutline className="mr-2 text-2xl" />
                    <div className="text-ellipsis text-sm whitespace-nowrap overflow-hidden max-w-full">
                      {property.location}
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))
        )}
      </div>
    </section>
  );
};

export default BuyPropertiesGrid;
