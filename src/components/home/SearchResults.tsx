"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";

interface Property {
  _id: string;
  title: string;
  description: string;
  price: number | string;
  location: string;
}

const SearchResults = () => {
  const searchParams = useSearchParams();
  const [results, setResults] = useState<Property[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchSearchResults = async () => {
      setLoading(true);
      try {
        const purpose = searchParams.get("purpose");
        const propertyType = searchParams.get("propertyType");
        const location = searchParams.get("location");
        const minPrice = searchParams.get("minPrice")
          ? Number(searchParams.get("minPrice"))
          : null;
        const maxPrice = searchParams.get("maxPrice")
          ? Number(searchParams.get("maxPrice"))
          : null;

        console.log("Search parameters:", {
          purpose,
          propertyType,
          location,
          minPrice,
          maxPrice,
        }); // Debug statement

        const response = await axios.get(
          "http://localhost:5000/api/properties/search",
          {
            params: {
              purpose,
              propertyType,
              location,
              minPrice: minPrice || 0,
              maxPrice: maxPrice || 1000000,
            },
          }
        );

        console.log("API response:", response.data); // Debug statement

        setResults(response.data);
      } catch (error) {
        console.error("Error fetching search results:", error);
      } finally {
        setLoading(false);
      }
    };

    if (searchParams.get("purpose")) {
      fetchSearchResults();
    }
  }, [searchParams]);

  return (
    <div>
      <h1>Search Results</h1>
      {loading ? (
        <p className="text-black">Loading...</p>
      ) : (
        <ul>
          {results.map((property) => (
            <li key={property._id}>
              <h2 className="text-black">{property.title}</h2>
              <p className="text-black">{property.description}</p>
              <p className="text-black">{property.price}</p>
              <p className="text-black">{property.location}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchResults;
