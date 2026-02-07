// src/components/Feed.jsx

import React, { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import SearchBar from "./SearchBar";
import Filters from "./Filters";
import PostCard from "./PostCard";
import Loader from "./Loader";
import {
  getAllPosts,
  getPostsByCategory,
  searchPosts,
} from "../features/post/postSlice";

const Feed = () => {
  const dispatch = useDispatch();

  // ✅ IMPORTANT: context-wise state use karo
  const {
    feedPosts,
    categoryPosts,
    searchPosts: searchedPosts,
    loading,
  } = useSelector((state) => state.posts);

  const [category, setCategory] = useState("All");
  const [query, setQuery] = useState("");

  // Decide kaunsa posts dikhane hain
  const postsToRender = query.trim()
    ? searchedPosts
    : category === "All"
    ? feedPosts
    : categoryPosts;

  // Fetch posts when category / query change
  useEffect(() => {
    // Jab search clear ho
    if (!query.trim()) {
      if (category === "All") {
        dispatch(getAllPosts());
      } else {
        dispatch(getPostsByCategory(category));
      }
    }
  }, [category, query, dispatch]);

  // 🔍 Search handler
  const handleSearch = useCallback(
    (e) => {
      e.preventDefault();
      if (query.trim()) {
        dispatch(searchPosts(query));
      }
    },
    [query, dispatch]
  );

  return (
    <div className="bg-black text-white">
      {/* Sticky top bar */}
      <div className="sticky top-0 z-10 bg-black/95 backdrop-blur-md border-b border-gray-800 shadow-md">
        <div className="max-w-5xl mx-auto px-4 py-3 flex flex-col gap-3">
          <SearchBar
            query={query}
            setQuery={setQuery}
            handleSearch={handleSearch}
          />
          <Filters category={category} setCategory={setCategory} />
        </div>
      </div>

      {/* Posts list */}
      <div className="max-w-5xl mx-auto px-4 pb-24">
        {loading ? (
          <Loader />
        ) : postsToRender.length === 0 ? (
          <p className="text-gray-500 text-center mt-10">
            No posts found.
          </p>
        ) : (
          <div className="space-y-6 mt-6">
            {postsToRender.map((post) => (
              <PostCard key={post._id} post={post} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Feed;
