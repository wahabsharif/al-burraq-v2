"use client";

import axios from "axios";
import dynamic from "next/dynamic";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  IoCallOutline,
  IoLocationOutline,
  IoMailOutline,
} from "react-icons/io5";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import ShimmerButton from "@/components/magicui/shimmer-button";
import "swiper/css";
import "swiper/css/bundle";
import { FaArrowCircleLeft, FaArrowCircleRight } from "react-icons/fa";
import ItemsLoader from "@/components/common/ItemsLoader"; // Import the ItemsLoader component

const DynamicImage = dynamic(() => import("next/image"), { ssr: false });

interface Property {
  slug: string;
  _id: string;
  title: string;
  price: number;
  location: string;
  image: string[];
  purpose: string;
  propertyType: string;
  area: number;
}

const NEXT_PUBLIC_API_URL = process.env.NEXT_PUBLIC_API_URL;

const FeaturedProperties: React.FC = () => {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState<boolean>(true); // State to manage loading
  const [delayLoading, setDelayLoading] = useState<boolean>(true); // State to manage delay
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      setDelayLoading(false);
      fetchProperties();
    }, 3000); // Set the delay to 3 seconds

    return () => clearTimeout(timer);
  }, []);

  const fetchProperties = async () => {
    try {
      const response = await axios.get<Property[]>(
        `${NEXT_PUBLIC_API_URL}/api/properties`
      );
      setProperties(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching properties:", error);
      setLoading(false);
    }
  };

  const handlePropertyClick = (slug: string) => {
    router.push(`/properties/${slug}`);
  };

  const formatNumber = (num: number) => {
    return num.toLocaleString();
  };

  if (loading || delayLoading) {
    return <ItemsLoader />;
  }

  return (
    <section className="mx-auto text-white mt-6 mb-3 relative">
      <div className="flex justify-center items-center mb-5">
        <div className="inline-block bg-black shadow-md p-4 rounded-xl bg-opacity-80 backdrop-blur-2xl backdrop-saturate-200">
          <h2 className="text-md font-bold text-gradient md:text-xl lg:text-3xl">
            Featured Properties.
          </h2>
        </div>
      </div>
      <div className="relative mx-auto max-w-screen-xl">
        <Swiper
          modules={[Autoplay, Pagination, Navigation]}
          spaceBetween={30}
          slidesPerView={3}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          pagination={{ clickable: true }}
          navigation={{
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
          }}
          loop
          breakpoints={{
            1024: {
              slidesPerView: 3,
            },
            768: {
              slidesPerView: 2,
            },
            640: {
              slidesPerView: 1,
            },
            480: {
              slidesPerView: 1,
            },
            320: {
              slidesPerView: 1,
            },
          }}
          className="mySwiper w-full"
        >
          {properties.map((property) => (
            <SwiperSlide key={property._id} className="px-2">
              <div className="bg-white mb-4 mt-4 lg:mb-16 bg-black shadow-md p-4 rounded-xl bg-opacity-80 backdrop-blur-2xl backdrop-saturate-200">
                <div className="property-slider-image">
                  {property.image.length > 0 ? (
                    <DynamicImage
                      src={property.image[0]}
                      alt={property.title}
                      width={800}
                      height={600}
                      priority
                    />
                  ) : (
                    <div className="no-image-placeholder">
                      No Image Available
                    </div>
                  )}
                </div>
                <div>
                  <div className="mt-2 text-sm text-gradient">
                    AED{" "}
                    <span className="text-xl font-bold">
                      {formatNumber(property.price)}
                    </span>
                  </div>
                  <div className="mt-2 flex items-center text-sm text-gray-400">
                    <div className="capitalize">{property.propertyType}</div>
                    <span className="mx-2">|</span>
                    <div className="mx-2 capitalize">{property.purpose}</div>
                    <span className="mx-2">|</span>
                    <div>Area: {formatNumber(property.area)} sq. ft.</div>
                  </div>
                  <div className="text-xl font-bold mt-4">{property.title}</div>
                  <div className="flex items-center mt-2 max-w-full overflow-hidden">
                    <IoLocationOutline className="mr-2 text-2xl" />
                    <div className="text-ellipsis whitespace-nowrap overflow-hidden max-w-full">
                      {property.location}
                    </div>
                  </div>
                </div>
                <div className="flex justify-center mt-2">
                  <ShimmerButton
                    className="shadow-2xl align-center px-3 py-1"
                    onClick={() => handlePropertyClick(property.slug)}
                  >
                    <span className="whitespace-pre-wrap text-center text-sm font-medium leading-none tracking-tight text-white dark:from-white dark:to-slate-900/10 lg:text-lg">
                      Explore More
                    </span>
                  </ShimmerButton>
                </div>
                {/* Contact Icons Section */}
                <div className="flex items-center justify-center mt-4">
                  <Link
                    href={`tel:#`}
                    className="shiny-btn p-2 font-bold flex items-center mr-4"
                  >
                    <IoCallOutline className="text-2xl" />
                    <span className="ml-1">Call</span>
                  </Link>
                  <Link
                    href={`mailto:#`}
                    className="shiny-btn p-2 font-bold flex items-center mr-4"
                  >
                    <IoMailOutline className="text-2xl" />
                    <span className="ml-1">Mail</span>
                  </Link>
                </div>
              </div>
            </SwiperSlide>
          ))}
          {/* Custom Navigation */}
        </Swiper>
      </div>
      <div className="swiper-button-prev absolute top-1/2 left-0 transform -translate-y-1/2 p-2">
        <FaArrowCircleLeft className="text-3xl text-white" />
      </div>
      <div className="swiper-button-next absolute top-1/2 right-0 transform -translate-y-1/2 p-2">
        <FaArrowCircleRight className="text-3xl text-white" />
      </div>
    </section>
  );
};

export default FeaturedProperties;
