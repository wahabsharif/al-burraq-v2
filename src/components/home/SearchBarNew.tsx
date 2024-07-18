"use client";

import { useEffect, useRef, useState } from "react";
import axios from "axios";
import Image from "next/image";
import { FaFilter } from "react-icons/fa6";

import { IoLocationSharp } from "react-icons/io5";

interface Property {
  _id: string;
  title: string;
  description: string;
  price: number;
  location: string;
  propertyType: string;
  purpose: string;
  area: string;
  image: string[];
}

const NEXT_PUBLIC_API_URL = process.env.NEXT_PUBLIC_API_URL;

const Alert = ({
  show,
  setShow,
}: {
  show: boolean;
  setShow: (show: boolean) => void;
}) => {
  const [progress, setProgress] = useState(100);

  // Use useRef to persist the timer across renders
  const timerRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    if (show) {
      const decrementBy = 1;

      // Start the timer only if it hasn't already been started
      if (!timerRef.current) {
        timerRef.current = setInterval(() => {
          setProgress((prev) => {
            if (prev <= 0) {
              // Clear the interval stored in the ref
              if (timerRef.current) clearInterval(timerRef.current);
              setShow(false); // Hide the alert after progress completes
              return 0;
            }
            return prev - decrementBy; // Correctly update the progress
          });
        }, 30); // Set the interval to decrease progress every 30ms
      }
    }

    // Cleanup function to clear the timer when the component unmounts or when show becomes false
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = undefined; // Clear the ref after clearing the interval
      }
    };
  }, [show, setShow]); // Depend on show and setShow to restart the timer if necessary

  useEffect(() => {
    if (!show) {
      // Reset progress and any other state needed when show becomes false
      setProgress(100);
    }
  }, [show]);

  if (!show) return null;

  return (
    <div className="fixed top-0 left-0 right-0 flex justify-center z-50">
      <div
        className="max-w-lg w-full bg-slate-100 border-l-4 border-red-700 text-slate-700 p-4 relative rounded-md shadow-lg"
        role="alert"
        style={{
          animation: `${show ? "fadeIn" : "fadeOut"} 0.3s ease-in-out forwards`,
        }}
      >
        <p className="text-3xl text-red-0 font-bold mb-4 border-b-2 border-slate-700 pb-2">
          OOPS❗ 🙁
        </p>
        <p className="text-xl">
          We Apologize, But We don&apos;t Have Any Properties That Match Your
          Search Criteria.
        </p>
        <p className="text-xl">Try Other Keywords.</p>
        <div className="absolute bottom-0 left-0 right-0 h-2 overflow-hidden">
          <div
            className="h-full bg-red-700"
            style={{ width: `${progress}%` }} // Dynamically set width based on progress
          />
        </div>
      </div>
    </div>
  );
};

const SearchBarNew = () => {
  const [purpose, setPurpose] = useState("");
  const [propertyType, setPropertyType] = useState("");
  const [location, setLocation] = useState("");
  const [priceRange, setPriceRange] = useState([0, 10000000]);
  const [searchResults, setSearchResults] = useState<Property[]>([]);
  const [showError, setShowError] = useState(false);

  const handleSearch = async () => {
    setShowError(false); // Reset showError to false before making the API call

    const baseUrl = `${NEXT_PUBLIC_API_URL}/api/properties/search`;
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
      if (response.data.length === 0) {
        setShowError(true); // Show the alert popup if there are no search results
      }
    } catch (error) {
      console.error("Error fetching search results:", error);
      setShowError(true); // Show the alert popup if there's an error fetching results
    }
  };

  const handleMinPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPriceRange([parseInt(e.target.value), priceRange[1]]);
  };

  const handleMaxPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPriceRange([priceRange[0], parseInt(e.target.value)]);
  };

  return (
    <section className="mb-4">
      <Alert show={showError} setShow={setShowError} />
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
              max="10000000"
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
            className="shiny-btn py-2 px-3 text-3xl flex  font-semibold items-center"
          >
            Filter
            <FaFilter className="ml-1" />
          </button>
        </div>
      </div>

      {/* Render The Search Results */}
      <div className="max-w-4xl mx-auto mt-1 p-6">
        {searchResults.length > 0 && (
          <div className="flex justify-center items-center mb-5">
            <div className="inline-block bg-black shadow-md p-4 rounded-xl bg-opacity-80 backdrop-blur-2xl backdrop-saturate-200 animate-pop-up">
              <h2 className="text-3xl font-bold text-gradient">
                Search Results
              </h2>
            </div>
          </div>
        )}

        {searchResults.length > 0 &&
          searchResults.map((property: Property) => (
            <div
              key={property._id}
              className="property-item mb-6 flex bg-white bg-opacity-80 backdrop-blur-2xl backdrop-saturate-200 rounded-xl shadow-md p-4 ml-4"
            >
              {/* Image on the left */}
              <div className="w-1/2">
                {property.image.length > 0 ? (
                  <Image
                    src={property.image[0]}
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
              {/* Property details on the right */}
              <div className="w-1/2 p-4 ml-4">
                <p className="text-gray-800 text-xl text-darkGold  mb-3">
                  AED <span className="text-3xl"> {property.price}</span>
                </p>
                <div className="flex">
                  <p className="text-xl font-bold text-gray-600 mb-2 mr-4">
                    {property.propertyType}
                  </p>
                  <p className="text-xl font-bold text-gray-600 mb-2">
                    Area:
                    <span className="text-lg font-medium ml-1">
                      {property.area} sqft
                    </span>
                  </p>
                </div>
                <p className="text-gray-600 mb-2">{property.purpose}</p>
                <p className="text-gray-600 mb-2">{property.description}</p>
                <div className="flex items-center text-xl text-slate-400">
                  <IoLocationSharp className="text-gray-600 mr-1" />
                  <p className="text-gray-600">{property.location}</p>
                </div>
              </div>
            </div>
          ))}

        {/* Display message if no results */}
        {searchResults.length === 0 && showError && (
          <div className="flex justify-center mt-4">
            <Alert show={true} setShow={setShowError} />
          </div>
        )}
      </div>
    </section>
  );
};

export default SearchBarNew;
