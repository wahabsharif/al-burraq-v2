"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import Image from "next/image";
import EditPropertyForm from "./EditPropertyForm";
import DeletePropertyButton from "./DeletePropertyButton";
import AddPropertyButton from "./AddPropertyButton";
import Modal from "react-modal";

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
  createdAt: string;
  updatedAt: string; // Optional: if you need to display update date as well
}

const NEXT_PUBLIC_API_URL = process.env.NEXT_PUBLIC_API_URL;

const PropertyList: React.FC = () => {
  const [properties, setProperties] = useState<Property[]>([]);
  const [editProperty, setEditProperty] = useState<Property | null>(null);
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);

  useEffect(() => {
    fetchProperties();
  }, []);

  const fetchProperties = async () => {
    try {
      const response = await axios.get<Property[]>(
        `${NEXT_PUBLIC_API_URL}/api/properties`
      );

      // Log the raw data to ensure it's correctly formatted
      console.log("Raw data:", response.data);

      // Ensure that createdAt is a valid date string
      const validatedProperties = response.data.filter((property) => {
        const date = new Date(property.createdAt);
        return !isNaN(date.getTime()); // Validate that the date is valid
      });

      // Sort the properties
      const sortedProperties = validatedProperties.sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );

      // Log the sorted data
      console.log("Sorted data:", sortedProperties);

      setProperties(sortedProperties);
    } catch (error) {
      console.error("Error fetching properties:", error);
    }
  };

  const handleEditClick = (property: Property) => {
    setEditProperty(property);
    setModalIsOpen(true);
  };

  const handleUpdateSuccess = () => {
    setEditProperty(null);
    setModalIsOpen(false);
    fetchProperties();
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  function openModal(image: string[]): void {
    // Implementation for opening the modal
  }

  return (
    <section>
      <div className="mx-auto max-w-screen-sm text-center">
        <h2 className="text-3xl text-darkGold font-extrabold mb-4 mt-4 lg:mb-16 bg-black shadow-md p-4 rounded-xl bg-opacity-80 backdrop-blur-2xl backdrop-saturate-200 inline-block">
          All Properties
        </h2>
      </div>
      <AddPropertyButton />
      <div className="container mx-auto px-4 py-6">
        <div className="-mx-4">
          <div className="overflow-x-auto">
            <table className="min-w-full bg-darkBg border-gray-200 shadow-md rounded-xl">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Image
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Title
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Slug
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Price
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Location
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Purpose
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Property Type
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Area
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Timestamp
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {properties.map((property) => (
                  <tr key={property._id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        {property.image.length > 0 ? (
                          <button
                            onClick={() => openModal(property.image)}
                            className="focus:outline-none"
                          >
                            <Image
                              src={property.image[0]}
                              alt={property.title}
                              width={40}
                              height={40}
                            />
                          </button>
                        ) : (
                          <div className="w-10 h-10 flex items-center justify-center bg-gray-100 rounded-full">
                            No Image
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        {property.title}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {property.slug}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        AED {property.price}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {property.location}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {property.purpose}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {property.propertyType}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {property.area} sqft
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {property.createdAt
                          ? new Date(property.createdAt).toLocaleString()
                          : "No Date"}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2">
                      <button
                        className="bg-green-800 py-2 px-4 text-slate-100 rounded-lg hover:text-indigo-900 mr-2"
                        onClick={() => handleEditClick(property)}
                      >
                        Edit
                      </button>
                      <DeletePropertyButton
                        propertyId={property._id}
                        onDelete={fetchProperties}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        className="image-modal"
        overlayClassName="image-modal-overlay"
      >
        {editProperty && (
          <EditPropertyForm
            property={editProperty}
            onUpdateSuccess={handleUpdateSuccess}
          />
        )}
      </Modal>
    </section>
  );
};

export default PropertyList;
