import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createPost } from "../features/post/postSlice";
import { useNavigate } from "react-router-dom";
import { FaImage } from "react-icons/fa";

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

  // Fixed Category Options
  const categories = ["Technology", "Entertainment", "Politics", "Education"];

  // Image Preview
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  // Submit Handler
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
              <span>Upload Image</span>
              <input
                type="file"
                accept="image/*"
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

      {/* ✅ Success Toast */}
      {showToast && (
        <div className="fixed bottom-6 right-6 bg-green-600 text-white px-5 py-3 rounded-xl shadow-lg text-sm font-medium animate-fadeIn z-50">
          ✅ Post created successfully!
        </div>
      )}
    </div>
  );
};

export default CreatePost;
