// components/Buy/BuyPropertyList.tsx

"use client";

import ShineBorder from "@/components/magicui/shine-border";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { IoLocationOutline } from "react-icons/io5";

interface Property {
  _id: string;
  title: string;
  price: number;
  image: string[];
  purpose: string;
  propertyType: string;

  slug: string;
}

const NEXT_PUBLIC_API_URL = process.env.NEXT_PUBLIC_API_URL;

const BuyPropertyList = () => {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchBuyProperties = async () => {
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

    fetchBuyProperties();
  }, []);

  const formatNumber = (num: number) => {
    return num.toLocaleString();
  };

  if (loading) {
    return <div className="text-center">Loading...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500">{error}</div>;
  }

  return (
    <section className="mx-auto max-w-screen-lg text-white mt-6 mb-3">
      <div className="flex justify-center items-center mb-5">
        <div className="inline-block bg-black shadow-md p-2 rounded-xl bg-opacity-80 backdrop-blur-2xl backdrop-saturate-200">
          <h2 className="text-lg font-bold text-gradient">
            Buy Property List.
          </h2>
        </div>
      </div>

      {/* List Card */}
      <div className="flex justify-center items-center">
        <div className="space-y-4">
          {properties.length === 0 ? (
            <div className="text-center">No properties found.</div>
          ) : (
            properties.map((property) => (
              <Link key={property._id} href={`/Buy/${property.slug}`}>
                <ShineBorder
                  className="flex p-2 border border-gray-200 rounded-lg shadow-md h-24"
                  color={["#A07CFE", "#FE8FB5", "#FFBE7B"]}
                >
                  <div className="w-24 h-full flex items-center mr-4">
                    <Image
                      src={property.image[0]}
                      alt={property.title}
                      className="object-cover rounded"
                      width={96} // Adjusted width for better visibility
                      height={96} // Adjusted height for better visibility
                    />
                  </div>
                  <div className="flex flex-col justify-center">
                    <div className="text-sm font-semibold text-lightGold2 truncate lg:text-lg">
                      AED {formatNumber(property.price)}
                    </div>
                    <div className="mt-1 text-md text-gray-400 flex items-center">
                      <span className="capitalize">
                        {property.propertyType}
                      </span>
                      <span className="mx-2">|</span>
                      <span className="capitalize">{property.purpose}</span>
                    </div>
                  </div>
                </ShineBorder>
              </Link>
            ))
          )}
        </div>
      </div>
    </section>
  );
};

export default BuyPropertyList;
