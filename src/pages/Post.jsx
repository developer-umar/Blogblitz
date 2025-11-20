// src/pages/Post.jsx
import React from "react";
import Sidebar from "../components/Sidebar";
import Feed from "../components/Feed";
import RightBar from "../components/RightBar";

function Post() {
  return (
    // parent keeps full viewport height
    <div className="flex justify-center bg-black min-h-screen text-white">
      {/* Left Sidebar: fixed (sticky) */}
      <div className="hidden lg:block lg:w-[22%] border-r border-gray-800 p-4">
        <div className="sticky top-0 h-screen overflow-hidden">
          <Sidebar />
        </div>
      </div>

      {/* Main Feed (center) => ONLY THIS is scrollable */}
      <div className="w-full sm:w-[90%] md:w-[70%] lg:w-[45%] border-x border-gray-800">
        {/* make this column full height and scrollable */}
        <div className="h-screen overflow-y-auto hide-scrollbar">
          <Feed />
        </div>
      </div>

      {/* Right Sidebar: fixed (sticky) */}
      <div className="hidden lg:block lg:w-[28%] border-l border-gray-800 p-4 bg-black">
        <div className="sticky top-0 h-screen overflow-hidden">
          <RightBar />
        </div>
      </div>
    </div>
  );
}

export default Post;
