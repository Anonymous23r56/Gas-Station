import React, { useState } from "react";
import { CiSearch } from "react-icons/ci";

const SearchBar = ({ onSearch = () => {} }) => {
  const [query, setQuery] = useState("");

  const handleSubmit = () => {
    onSearch(query || "");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSubmit();
    }
  };
  return (
    <div className="w-full  py-16">
      <div className="max-w-5xl mx-auto px-6">
        {/* Headings */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold leading-none mb-2">
            Looking For Gas?
          </h1>
          <p className="text-3xl font-semibold leading-none text-gray-700">
            Find Stations Near You Easily
          </p>
        </div>

        {/* Search Bar */}
        <div className="flex gap-6 h-[60px]">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Search by name or location"
            className="flex-1 px-6 text-lg border border-blue-500 bg-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />

          <button
            onClick={handleSubmit}
            className="bg-blue-500 text-white px-10 rounded-lg hover:bg-blue-600 transition font-semibold text-lg flex items-center gap-2"
            type="button"
          >
            <CiSearch />
            Search
          </button>
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
