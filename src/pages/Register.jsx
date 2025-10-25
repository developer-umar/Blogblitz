import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../features/user/userSlice";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.user);

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    bio: "",
    avatar: null,
    coverImage: null,
  });

  const [previews, setPreviews] = useState({
    avatar: null,
    coverImage: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      const file = files[0];
      setFormData({ ...formData, [name]: file });

      // Generate preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviews((prev) => ({ ...prev, [name]: reader.result }));
      };
      reader.readAsDataURL(file);
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = new FormData();
    for (let key in formData) {
      form.append(key, formData[key]);
    }

    const result = await dispatch(registerUser(form));
    if (result.meta.requestStatus === "fulfilled") {
      navigate("/login");
    }
  };

  return (
    <section className="min-h-screen py-24 px-6 md:px-16 bg-black/95 backdrop-blur-sm text-white relative overflow-hidden flex items-center justify-center">
      {/* Premium Red Gradient Accents */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-red-600/10 to-transparent rounded-full blur-3xl -z-10"></div>
      <div className="absolute bottom-0 right-0 w-[450px] h-[450px] bg-gradient-to-br from-red-600/5 to-transparent rounded-full blur-3xl -z-10"></div>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative z-10 w-full max-w-2xl"
      >
        {/* Premium Glass Card */}
        <div className="bg-gray-900/60 backdrop-blur-lg border border-gray-700 rounded-2xl shadow-2xl p-8 md:p-12">
          {/* Red Gradient Heading */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black mb-6 tracking-tight text-center drop-shadow-md">
            <span className="bg-gradient-to-r from-red-600 via-red-500 to-red-700 bg-clip-text text-transparent">
              Join the Revolution
            </span>
          </h1>

          <p className="text-xl text-gray-300 text-center mb-10 max-w-md mx-auto leading-relaxed">
            Create your profile and start sharing your world with style.
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Username & Email */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <input
                type="text"
                name="username"
                placeholder="Username"
                value={formData.username}
                onChange={handleChange}
                required
                className="w-full bg-gray-800/80 border border-gray-700 rounded-lg px-5 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-red-600 focus:ring-2 focus:ring-red-600/30 transition-all duration-200"
              />
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full bg-gray-800/80 border border-gray-700 rounded-lg px-5 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-red-600 focus:ring-2 focus:ring-red-600/30 transition-all duration-200"
              />
            </div>

            {/* Password */}
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full bg-gray-800/80 border border-gray-700 rounded-lg px-5 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-red-600 focus:ring-2 focus:ring-red-600/30 transition-all duration-200"
            />

            {/* Bio */}
            <textarea
              name="bio"
              placeholder="Write a short bio..."
              rows={3}
              value={formData.bio}
              onChange={handleChange}
              required
              className="w-full bg-gray-800/80 border border-gray-700 rounded-lg px-5 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-red-600 focus:ring-2 focus:ring-red-600/30 transition-all duration-200 resize-none"
            />

            {/* File Uploads with Preview */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Avatar */}
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">
                  Avatar
                </label>
                <div className="relative">
                  <input
                    type="file"
                    name="avatar"
                    accept="image/*"
                    onChange={handleChange}
                    required
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                  />
                  <div className="bg-gray-800/80 border border-dashed border-gray-600 rounded-lg p-4 flex items-center justify-center hover:border-red-600 transition-all duration-200">
                    {previews.avatar ? (
                      <img
                        src={previews.avatar}
                        alt="Avatar preview"
                        className="w-16 h-16 rounded-full object-cover"
                      />
                    ) : (
                      <span className="text-gray-500 text-sm">Choose Avatar</span>
                    )}
                  </div>
                </div>
              </div>

              {/* Cover Image */}
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">
                  Cover Image
                </label>
                <div className="relative">
                  <input
                    type="file"
                    name="coverImage"
                    accept="image/*"
                    onChange={handleChange}
                    required
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                  />
                  <div className="bg-gray-800/80 border border-dashed border-gray-600 rounded-lg p-4 flex items-center justify-center hover:border-red-600 transition-all duration-200">
                    {previews.coverImage ? (
                      <img
                        src={previews.coverImage}
                        alt="Cover preview"
                        className="w-full h-20 rounded-lg object-cover"
                      />
                    ) : (
                      <span className="text-gray-500 text-sm">Choose Cover</span>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <motion.p
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-red-400 text-sm bg-red-600/10 border border-red-600/30 px-4 py-2 rounded-lg text-center"
              >
                {error}
              </motion.p>
            )}

            {/* Premium Red Button */}
            <motion.button
              type="submit"
              disabled={loading}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              className="w-full py-4 text-base font-semibold bg-red-600 text-white hover:bg-red-700 transition-all duration-300 rounded-lg border border-red-600 hover:border-red-700 shadow-lg hover:shadow-xl"
            >
              {loading ? "Creating Account…" : "Register"}
            </motion.button>
          </form>

          {/* Login Link */}
          <p className="text-center text-gray-400 mt-6 text-sm">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-red-500 hover:text-red-400 underline transition-colors font-medium"
            >
              Login
            </Link>
          </p>
        </div>

        {/* Glow Effects Around Card */}
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-red-600/20 to-transparent blur-xl -z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        <div className="absolute inset-0 shadow-[0_0_30px_rgba(239,68,68,0.3)] rounded-2xl blur-sm -z-5"></div>
      </motion.div>
    </section>
  );
};

export default Register;