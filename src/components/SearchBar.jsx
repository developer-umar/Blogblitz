// src/components/SearchBar.jsx
import React, { useEffect, useRef } from "react";
import { FaSearch } from "react-icons/fa";

const SearchBar = ({ query, setQuery, handleSearch }) => {
  const inputRef = useRef(null);

  // 🔥 Explore click → Search bar auto focus
  useEffect(() => {
    const focusHandler = () => {
      if (inputRef.current) {
        inputRef.current.focus();
      }
    };

    window.addEventListener("focus-search", focusHandler);

    return () => window.removeEventListener("focus-search", focusHandler);
  }, []);

  return (
    <form
      onSubmit={handleSearch}
      className="flex items-center bg-[#16181c] rounded-full px-4 py-2 shadow-sm border border-gray-700"
    >
      <FaSearch className="text-gray-400" />

      <input
        ref={inputRef}
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
