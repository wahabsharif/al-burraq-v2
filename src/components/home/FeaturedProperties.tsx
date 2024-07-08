"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Image from "next/image";

interface Property {
  _id: string;
  title: string;
  description: string;
  price: number;
  location: string;
  image: string[]; // Adjusted to string array for image URLs
  purpose: string; // New field
  propertyType: string; // New field
  area: number; // New field
}

const FeaturedProperties: React.FC = () => {
  const [properties, setProperties] = useState<Property[]>([]);

  useEffect(() => {
    fetchProperties();
  }, []);

  const fetchProperties = async () => {
    try {
      const response = await axios.get<Property[]>(
        "http://localhost:5000/api/properties"
      );
      setProperties(response.data);
    } catch (error) {
      console.error("Error fetching properties:", error);
    }
  };

  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 3, // Display 3 cards at a time on large screens
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    responsive: [
      {
        breakpoint: 1024, // Large screens
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 768, // Medium screens
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 640, // Small screens
        settings: {
          slidesToShow: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <section className="mx-auto max-w-screen-lg text-white mt-6 mb-3 ">
      <div className="flex justify-center items-center mb-5">
        <div className="inline-block bg-black shadow-md p-4 rounded-xl bg-opacity-80 backdrop-blur-2xl backdrop-saturate-200">
          <h2 className="text-3xl font-bold text-gradient">
            Featured Properties
          </h2>
        </div>
      </div>

      <Slider {...settings}>
        {properties.map((property) => (
          <div key={property._id} className="px-2">
            <div className="bg-white mb-4 mt-4 lg:mb-16 bg-black shadow-md p-4 rounded-xl bg-opacity-80 backdrop-blur-2xl backdrop-saturate-200">
              <div className="property-slider-image">
                {property.image.length > 0 ? (
                  <Image src={property.image[0]} alt={property.title} width={800} height={600} />
                ) : (
                  <div className="no-image-placeholder">No Image Available</div>
                )}
              </div>

              <div className="text-xl font-bold mt-4">{property.title}</div>
              <div className="text-lg">AED {property.price}</div>
              <div className="mt-2">{property.description}</div>
              <div className="mt-2">Location: {property.location}</div>
              <div className="mt-2">Purpose: {property.purpose}</div>
              <div className="mt-2">Property Type: {property.propertyType}</div>
              <div className="mt-2">Area: {property.area} sqft</div>
            </div>
          </div>
        ))}
      </Slider>
    </section>
  );
};

export default FeaturedProperties;
