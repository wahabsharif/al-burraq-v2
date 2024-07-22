"use client";

import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  IoCallOutline,
  IoLocationOutline,
  IoMailOutline,
} from "react-icons/io5";
import "swiper/css";
import "swiper/css/bundle";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import ShimmerButton from "@/components/magicui/shimmer-button";

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
  const router = useRouter();

  useEffect(() => {
    fetchProperties();
  }, []);

  const fetchProperties = async () => {
    try {
      const response = await axios.get<Property[]>(
        `${NEXT_PUBLIC_API_URL}/api/properties`
      );
      setProperties(response.data);
    } catch (error) {
      console.error("Error fetching properties:", error);
    }
  };

  const handlePropertyClick = (slug: string) => {
    router.push(`/properties/${slug}`);
  };

  const formatNumber = (num: number) => {
    return num.toLocaleString();
  };

  return (
    <section className="mx-auto max-w-screen-lg text-white mt-6 mb-3">
      <div className="flex justify-center items-center mb-5">
        <div className="inline-block bg-black shadow-md p-4 rounded-xl bg-opacity-80 backdrop-blur-2xl backdrop-saturate-200">
          <h2 className="text-3xl font-bold text-gradient">
            Featured Properties
          </h2>
        </div>
      </div>
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
        }}
        className="mySwiper"
      >
        {properties.map((property) => (
          <SwiperSlide key={property._id} className="px-2">
            <div className="bg-white mb-4 mt-4 lg:mb-16 bg-black shadow-md p-4 rounded-xl bg-opacity-80 backdrop-blur-2xl backdrop-saturate-200">
              <div className="property-slider-image">
                {property.image.length > 0 ? (
                  <Image
                    src={property.image[0]}
                    alt={property.title}
                    width={800}
                    height={600}
                  />
                ) : (
                  <div className="no-image-placeholder">No Image Available</div>
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
                {/* <Link
        href={`mailto:#`}
        className="shiny-btn p-2 font-bold flex items-center mr-4"
      >
        <IoLogoWhatsapp className="text-2xl" />
        <span className="ml-1"></span>
      </Link> */}
              </div>
            </div>
          </SwiperSlide>
        ))}
        <div className="swiper-button-prev"></div>
        <div className="swiper-button-next"></div>
      </Swiper>
    </section>
  );
};

export default FeaturedProperties;
