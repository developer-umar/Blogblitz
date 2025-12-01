// src/components/Filters.jsx
import React from "react";

const Filters = ({ category, setCategory }) => {
  const categories = ["All", "Technology", "Entertainment", "Politics", "Education"];

  return (
    <div className="flex justify-around bg-[#16181c] rounded-full py-2 px-3">
      {categories.map((cat) => (
        <button
          key={cat}
          onClick={() => setCategory(cat)}
          className={`px-4 py-1   rounded-full font-medium cursor-pointer text-sm transition ${
            category === cat
              ? "bg-blue-500 text-white"
              : "text-gray-400 hover:text-gray-200 hover:bg-[#1c1f26]"
          }`}
        >
          {cat}
        </button>
      ))}
    </div>
  );
};

export default Filters;
