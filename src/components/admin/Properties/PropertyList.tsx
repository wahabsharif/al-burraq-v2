"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import Image from "next/image";
import EditPropertyForm from "./EditPropertyForm";
import DeletePropertyButton from "./DeletePropertyButton";
import AddPropertyButton from "./AddPropertyButton";
import Modal from "react-modal"; // Import Modal

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

const NEXT_PUBLIC_API_URL = process.env.NEXT_PUBLIC_API_URL;

const PropertyList: React.FC = () => {
  const [properties, setProperties] = useState<Property[]>([]);
  const [editPropertyId, setEditPropertyId] = useState<string | null>(null);
  const [selectedImages, setSelectedImages] = useState<string[]>([]);
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);

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

  const handleEditClick = (propertyId: string) => {
    setEditPropertyId(propertyId);
  };

  const handleUpdateSuccess = () => {
    setEditPropertyId(null); // Clear edit mode
    fetchProperties(); // Refresh property list
  };

  const openModal = (images: string[]) => {
    setSelectedImages(images);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  return (
    <div>
      <div className="mx-auto max-w-screen-sm text-center">
        <h2 className="text-3xl text-darkGold font-extrabold mb-4 mt-4 lg:mb-16 bg-black shadow-md p-4 rounded-xl bg-opacity-80 backdrop-blur-2xl backdrop-saturate-200 inline-block">
          All Properties
        </h2>
      </div>
      <AddPropertyButton />
      <div className="container mx-auto px-4 py-6">
        <div className="-mx-4">
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border-gray-200 shadow-md rounded">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Image
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Title
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
                              className="rounded-full"
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
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2">
                      {editPropertyId === property._id ? (
                        <EditPropertyForm
                          property={property}
                          onUpdateSuccess={handleUpdateSuccess}
                        />
                      ) : (
                        <>
                          <button
                            className="text-indigo-600 hover:text-indigo-900 mr-2"
                            onClick={() => handleEditClick(property._id)}
                          >
                            Edit
                          </button>
                          <DeletePropertyButton
                            propertyId={property._id}
                            onDelete={fetchProperties}
                          />
                        </>
                      )}
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
      >
        <div className="flex justify-end">
          <button onClick={closeModal} className="modal-close">
            Close
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {selectedImages.map((image, index) => (
            <div key={index} className="p-2">
              <Image
                src={image}
                alt={`Property Image ${index}`}
                width={300}
                height={300}
                className="rounded-md"
              />
            </div>
          ))}
        </div>
      </Modal>
    </div>
  );
};

export default PropertyList;
