// src/components/home/SearchBar.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const SearchBar = () => {
  const [purpose, setPurpose] = useState("");
  const [propertyType, setPropertyType] = useState("");
  const [location, setLocation] = useState("");
  const [priceRange, setPriceRange] = useState([0, 10000]);
  const router = useRouter();

  const handleSearch = () => {
    const baseUrl = "/search";
    const queryParams = `?purpose=${encodeURIComponent(
      purpose
    )}&propertyType=${encodeURIComponent(
      propertyType
    )}&location=${encodeURIComponent(location)}&minPrice=${
      priceRange[0]
    }&maxPrice=${priceRange[1]}`;

    console.log("Navigating to:", baseUrl + queryParams); // Debug statement
    router.push(baseUrl + queryParams);
  };

  return (
    <div className="search-bar">
      <div className="field">
        <label>Purpose</label>
        <select value={purpose} onChange={(e) => setPurpose(e.target.value)}>
          <option value="rent">Rent</option>
          <option value="buy">Buy</option>
          <option value="sale">Sale</option>
        </select>
      </div>
      <div className="field">
        <label>Property Type</label>
        <select
          value={propertyType}
          onChange={(e) => setPropertyType(e.target.value)}
        >
          <option value="Offices">Offices</option>
          <option value="apartments">Apartments</option>
          <option value="lands">Lands</option>
          <option value="penthouses">Penthouses</option>
          <option value="shops">Shops</option>
          <option value="houses">Houses</option>
          <option value="townhouses">Townhouses</option>
          <option value="villas">Villas</option>
        </select>
      </div>
      <div className="field">
        <label>Location</label>
        <input
          type="text"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
      </div>
      <div className="field">
        <label>Price Range</label>
        <input
          type="range"
          min="0"
          max="10000"
          step="10"
          value={priceRange[1]}
          onChange={(e) => setPriceRange([0, parseInt(e.target.value)])}
        />
        <span>
          {priceRange[0]} - {priceRange[1]}
        </span>
      </div>
      <button onClick={handleSearch}>Search</button>
    </div>
  );
};

export default SearchBar;
