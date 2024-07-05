"use client";

import { useState } from "react";
import axios from "axios";
import Image from "next/image";
import { FaSearch } from "react-icons/fa";

interface Property {
  _id: string;
  title: string;
  description: string;
  price: number;
  location: string;
  propertyType: string;
  purpose: string;
  image: string;
}

const SearchBarNew = () => {
  const [purpose, setPurpose] = useState("");
  const [propertyType, setPropertyType] = useState("");
  const [location, setLocation] = useState("");
  const [priceRange, setPriceRange] = useState([0, 10000]);
  const [searchResults, setSearchResults] = useState<Property[]>([]);

  const handleSearch = async () => {
    const baseUrl = "http://localhost:5000/api/properties/search";
    const queryParams = `?purpose=${encodeURIComponent(
      purpose
    )}&propertyType=${encodeURIComponent(
      propertyType
    )}&location=${encodeURIComponent(location)}&minPrice=${
      priceRange[0]
    }&maxPrice=${priceRange[1]}`;

    try {
      const response = await axios.get(baseUrl + queryParams);
      setSearchResults(response.data);
    } catch (error) {
      console.error("Error fetching search results:", error);
    }
  };

  const handleMinPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPriceRange([parseInt(e.target.value), priceRange[1]]);
  };

  const handleMaxPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPriceRange([priceRange[0], parseInt(e.target.value)]);
  };

  return (
    <section className="p-4 mb-8">
      <div className="left-0 right-0 grid items-start grid-cols-12 gap-4 p-10 mx-auto rounded-lg shadow-md bg-opacity-80 backdrop-blur-2xl backdrop-saturate-200">
        <div className="col-span-12 sm:col-span-12 md:col-span-6 lg:col-span-3">
          <label className="block text-2xl font-bold text-slate-300 mb-3">
            Purpose
          </label>
          <select
            value={purpose}
            onChange={(e) => setPurpose(e.target.value)}
            className="search-bar-input mt-1 block w-full py-2 px-3 mx-auto rounded-lg "
          >
            <option className="text-lg" value="">
              Select Purpose
            </option>
            <option className="text-lg" value="rent">
              Rent
            </option>
            <option className="text-lg" value="buy">
              Buy
            </option>
            <option className="text-lg" value="sale">
              Sale
            </option>
          </select>
        </div>
        <div className="col-span-12 sm:col-span-12 md:col-span-6 lg:col-span-3">
          <label className="block text-2xl font-bold text-slate-300 mb-3">
            Property Type
          </label>
          <select
            value={propertyType}
            onChange={(e) => setPropertyType(e.target.value)}
            className="search-bar-input mt-1 block w-full py-2 px-3"
          >
            <option className="text-lg" value="">
              Select Property Type
            </option>
            <option className="text-lg" value="Offices">
              Offices
            </option>
            <option className="text-lg" value="apartments">
              Apartments
            </option>
            <option className="text-lg" value="lands">
              Lands
            </option>
            <option className="text-lg" value="penthouses">
              Penthouses
            </option>
            <option className="text-lg" value="shops">
              Shops
            </option>
            <option className="text-lg" value="houses">
              Houses
            </option>
            <option className="text-lg" value="townhouses">
              Townhouses
            </option>
            <option className="text-lg" value="villas">
              Villas
            </option>
          </select>
        </div>
        <div className="col-span-12 sm:col-span-12 md:col-span-6 lg:col-span-2">
          <label className="block text-2xl font-bold text-slate-300 mb-3">
            Location
          </label>
          <input
            type="text"
            placeholder="Enter Location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="search-bar-input mt-1 block w-full py-1 px-3"
          />
        </div>
        <div className="col-span-12 sm:col-span-12 md:col-span-6 lg:col-span-2">
          <label className="block text-2xl font-bold text-slate-300 mb-3">
            Price Range
          </label>
          <div className="flex space-x-2">
            <input
              type="number"
              min="0"
              max="10000"
              step="10"
              value={priceRange[0]}
              onChange={handleMinPriceChange}
              className="block w-full py-1 px-3 search-bar-input"
            />
            <input
              type="number"
              min="0"
              max="10000"
              step="10"
              value={priceRange[1]}
              onChange={handleMaxPriceChange}
              className="block w-full py-1 px-3 search-bar-input"
            />
          </div>
        </div>
        <div className="col-span-12 sm:col-span-12 md:col-span-6 lg:col-span-2 flex items-center justify-center mt-auto mb-0">
          <button
            onClick={handleSearch}
            className="shiny-btn py-2 px-3 text-3xl font-bold flex items-center"
          >
            Search <FaSearch className="ml-1" />
          </button>
        </div>
      </div>

      <div className="max-w-4xl mx-auto mt-8 bg-white shadow-md rounded-lg p-6">
        {searchResults.map((property: Property) => (
          <div key={property._id} className="property-item mb-6">
            <h3 className="text-xl font-semibold text-gray-800">
              {property.title}
            </h3>
            <p className="text-gray-600">{property.description}</p>
            <p className="text-gray-800 font-medium">Price: {property.price}</p>
            <p className="text-gray-600">Location: {property.location}</p>
            <p className="text-gray-600">Type: {property.propertyType}</p>
            <p className="text-gray-600">Purpose: {property.purpose}</p>
            {property.image ? (
              <Image
                src={property.image}
                alt={property.title}
                className="w-full h-auto mt-4 rounded-md shadow-md"
                width={1000}
                height={1000}
              />
            ) : (
              <div className="no-image-placeholder mt-4 text-gray-500 italic">
                No Image Available
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default SearchBarNew;
