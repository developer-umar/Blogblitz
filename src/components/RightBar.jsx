// src/components/RightBar.jsx
import React from "react";

const RightBar = () => {
  return (
    <div className="bg-black text-white p-5 border-l border-gray-800 h-full">
      <div className="bg-[#16181c] rounded-2xl p-4 mb-5">
        <h2 className="font-semibold text-lg mb-3">What's happening</h2>
        <ul className="space-y-3">
          {["#ReactJS", "#MERNStack", "#OpenAI", "#WebDev"].map((trend) => (
            <li key={trend} className="text-blue-400 hover:underline cursor-pointer">
              {trend}
            </li>
          ))}
        </ul>
      </div>

      <div className="bg-[#16181c] rounded-2xl p-4">
        <h2 className="font-semibold text-lg mb-3">Who to follow</h2>
        <ul className="space-y-2 text-sm text-gray-300">
          <li>@developer_umar</li>
          <li>@tech_guru</li>
          <li>@ai_updates</li>
        </ul>
      </div>
    </div>
  );
};

export default RightBar;
