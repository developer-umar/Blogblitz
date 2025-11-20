// src/components/SearchBar.jsx
import React from "react";
import { FaSearch } from "react-icons/fa";

const SearchBar = ({ query, setQuery, handleSearch }) => {
  return (
    <form
      onSubmit={handleSearch}
      className="flex items-center bg-[#16181c] rounded-full px-4 py-2 shadow-sm border border-gray-700"
    >
      <FaSearch className="text-gray-400" />
      <input
        type="text"
        placeholder="Search posts..."
        className="bg-transparent outline-none text-white ml-3 w-full placeholder-gray-500"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
    </form>
  );
};

export default SearchBar;
