"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import Image from "next/image";
import Modal from "react-modal";
import { RxCross2 } from "react-icons/rx";
import { TiArrowSortedDown, TiArrowSortedUp } from "react-icons/ti";

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
  createdAt: string; // Add this field if it exists
}

const NEXT_PUBLIC_API_URL = process.env.NEXT_PUBLIC_API_URL;

const DashboardPropertyList: React.FC = () => {
  const [properties, setProperties] = useState<Property[]>([]);
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);
  const [selectedImage, setSelectedImage] = useState<string[] | null>(null);
  const [expandedPropertyId, setExpandedPropertyId] = useState<string | null>(
    null
  );

  useEffect(() => {
    fetchProperties();
  }, []);

  const fetchProperties = async () => {
    try {
      const response = await axios.get<Property[]>(
        `${NEXT_PUBLIC_API_URL}/api/properties`
      );

      // Assuming properties have a createdAt field for sorting
      const sortedProperties = response.data.sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );

      // Display only the 5 latest properties
      setProperties(sortedProperties.slice(0, 5));
    } catch (error) {
      console.error("Error fetching properties:", error);
    }
  };

  const openModal = (image: string[]) => {
    setSelectedImage(image);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setSelectedImage(null);
  };

  const handleToggleDetails = (id: string) => {
    setExpandedPropertyId((prevId) => (prevId === id ? null : id));
  };

  return (
    <section>
      <div className="container mx-auto px-4 py-6">
        <h2 className="text-xl text-darkGold font-extrabold my-2 bg-black shadow-md p-2 rounded-xl bg-opacity-80 backdrop-blur-2xl backdrop-saturate-200 inline-block">
          Latest Properties
        </h2>
        <div className="-mx-4">
          <div className="overflow-x-auto">
            <div className="space-y-1">
              {properties.map((property) => (
                <div
                  key={property._id}
                  className="bg-darkBg p-4 rounded-xl shadow-md max-w-lg"
                >
                  <div className="flex items-center space-x-4">
                    <button
                      onClick={() => openModal(property.image)}
                      className="focus:outline-none"
                    >
                      <Image
                        src={property.image[0] || "/no-image.png"}
                        alt={property.title}
                        width={80}
                        height={60}
                        className="rounded-xl"
                      />
                    </button>
                    <div className="flex-1">
                      <div className="text-lg font-medium text-gray-900">
                        {property.title}
                      </div>
                      <div className="text-sm text-gray-600">
                        AED {property.price}
                      </div>
                    </div>
                    <button
                      onClick={() => handleToggleDetails(property._id)}
                      className="text-gray-500"
                    >
                      {expandedPropertyId === property._id ? (
                        <TiArrowSortedUp className="text-xl" />
                      ) : (
                        <TiArrowSortedDown className="text-xl" />
                      )}
                    </button>
                  </div>
                  {expandedPropertyId === property._id && (
                    <div className="mt-4 text-sm text-gray-700 space-y-2">
                      <div>
                        <strong>Location:</strong> {property.location}
                      </div>
                      <div>
                        <strong>Purpose:</strong> {property.purpose}
                      </div>
                      <div>
                        <strong>Property Type:</strong> {property.propertyType}
                      </div>
                      <div>
                        <strong>Area:</strong> {property.area} sqft
                      </div>
                      <div>
                        <strong>Description:</strong> {property.description}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        className="image-modal"
        overlayClassName="image-modal-overlay"
      >
        {selectedImage && (
          <div className="flex justify-center items-center h-full">
            {selectedImage.map((img, index) => (
              <Image
                key={index}
                src={img}
                alt={`Image ${index + 1}`}
                width={800}
                height={600}
                className="rounded-xl"
              />
            ))}
          </div>
        )}
        <button
          onClick={closeModal}
          className="absolute top-4 right-4 p-2 bg-gray-600 text-white rounded"
        >
          <RxCross2 className="text-3xl" />
        </button>
      </Modal>
    </section>
  );
};

export default DashboardPropertyList;
