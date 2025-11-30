import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createPost } from "../features/post/postSlice";
import { useNavigate } from "react-router-dom";
import { FaImage } from "react-icons/fa";
import axiosInstance from "../utils/axios.js";

const CreatePost = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.user);
  const { loading } = useSelector((state) => state.posts);

  // Local States
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [showToast, setShowToast] = useState(false);

  // ⭐ AI Loader
  const [aiLoading, setAiLoading] = useState(false);

  const categories = ["Technology", "Entertainment", "Politics", "Education"];

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  // ⭐ AI Content Generate Function
  const generateWithAI = async () => {
    if (!title.trim()) {
      alert("Please enter a topic/title first.");
      return;
    }

    setAiLoading(true);

    try {
      const res = await axiosInstance.post(
        "ai/generate",
        { topic: title },
        {
          headers: {
            Authorization: `Bearer ${user?.token}`,
          },
        }
      );

      if (!res.data.success) {
        alert(res.data.message || "AI failed to generate content");
        return;
      }

      setContent(res.data.data.content);
    } catch (error) {
      console.log(error);
      alert("AI request failed");
    } finally {
      setAiLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !content || !category || !image) {
      alert("Please fill all fields and upload an image.");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    formData.append("category", category);
    formData.append("image", image);

    try {
      await dispatch(createPost(formData)).unwrap();
      setShowToast(true);
      setTimeout(() => {
        setShowToast(false);
        navigate("/post");
      }, 2000);
    } catch (err) {
      alert(err || "Failed to create post.");
    }
  };

  return (
    <div className="flex justify-center min-h-screen bg-black text-white pt-10">
      <div className="w-full max-w-2xl border border-gray-800 rounded-2xl bg-[#16181c] p-6 shadow-lg">

        {/* Header */}
        <h2 className="text-2xl font-bold mb-6 text-center text-blue-400">
          Create a New Post
        </h2>

        {/* Author */}
        <div className="flex items-center mb-6">
          <img
            src={user?.avatar || "/default-avatar.png"}
            alt="avatar"
            className="w-12 h-12 rounded-full border border-gray-700 object-cover"
          />
          <span className="ml-3 text-lg font-medium">{user?.username}</span>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">

          {/* Title */}
          <input
            type="text"
            placeholder="Post Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full bg-transparent border border-gray-700 rounded-xl p-3 focus:outline-none focus:border-blue-500"
          />

          {/* ⭐ AI Generate Button (Professional Premium Style) */}
          <button
            type="button"
            onClick={generateWithAI}
            disabled={aiLoading}
            className={`w-full py-2 rounded-xl font-semibold transition ${
              aiLoading
                ? "bg-gradient-to-r from-purple-700 to-purple-900 opacity-60 cursor-not-allowed"
                : "bg-gradient-to-r from-purple-500 to-purple-700 hover:from-purple-600 hover:to-purple-800"
            }`}
          >
            {aiLoading ? (
              <span className="flex items-center justify-center gap-2">
                <svg
                  className="animate-spin h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 100 16v-4l-3 3 3 3v-4a8 8 0 01-8-8z"
                  ></path>
                </svg>
                Generating...
              </span>
            ) : (
              "✨ Write with AI"
            )}
          </button>

          {/* Content */}
          <textarea
            rows="4"
            placeholder="What's happening?"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full bg-transparent border border-gray-700 rounded-xl p-3 focus:outline-none focus:border-blue-500 resize-none"
          />

          {/* Category Dropdown */}
          <div>
            <label className="block text-gray-400 mb-2">Select Category</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full bg-transparent border border-gray-700 rounded-xl p-3 focus:outline-none focus:border-blue-500 appearance-none"
            >
              <option value="" disabled>
                -- Choose Category --
              </option>
              {categories.map((cat) => (
                <option
                  key={cat}
                  value={cat}
                  className="bg-black text-white hover:bg-gray-800"
                >
                  {cat}
                </option>
              ))}
            </select>
          </div>

          {/* Image Upload */}
          <div className="flex items-center gap-3">
            <label className="flex items-center gap-2 text-blue-400 cursor-pointer hover:text-blue-300">
              <FaImage className="text-xl" />
              <span>Upload File</span>
              <input
                type="file"
                accept="image/*,video/*"
                onChange={handleImageChange}
                hidden
              />
            </label>
            {preview && (
              <img
                src={preview}
                alt="preview"
                className="w-20 h-20 rounded-lg object-cover border border-gray-700"
              />
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 rounded-full transition disabled:opacity-50"
          >
            {loading ? "Posting..." : "Post"}
          </button>
        </form>
      </div>

      {/* Success Toast */}
      {showToast && (
        <div className="fixed bottom-6 right-6 bg-green-600 text-white px-5 py-3 rounded-xl shadow-lg text-sm font-medium animate-fadeIn z-50">
          ✅ Post created successfully!
        </div>
      )}
    </div>
  );
};

export default CreatePost;
