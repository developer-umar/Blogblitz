import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../features/user/userSlice";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, isAuthenticated } = useSelector((state) => state.user);

  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  // Redirect agar already logged in hai
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/post");
    }
  }, [isAuthenticated, navigate]);

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await dispatch(loginUser(credentials));
    if (result.meta.requestStatus === "fulfilled") {
      navigate("/post");
    }
  };

  return (
    <section className="min-h-screen py-24 px-6 md:px-16 bg-black/95 backdrop-blur-sm text-white relative overflow-hidden flex items-center justify-center">
      {/* Subtle red-gradient accents */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-red-600/10 to-transparent rounded-full blur-3xl -z-10"></div>
      <div className="absolute bottom-0 right-0 w-[450px] h-[450px] bg-gradient-to-br from-red-600/5 to-transparent rounded-full blur-3xl -z-10"></div>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative z-10 w-full max-w-lg"
      >
        {/* Card with premium glass + glow */}
        <div className="bg-gray-900/60 backdrop-blur-lg border border-gray-700 rounded-2xl shadow-2xl p-8 md:p-10">
          {/* Red-gradient heading */}
          <h1 className="text-4xl md:text-5xl font-black mb-6 tracking-tight text-center drop-shadow-md">
            <span className="bg-gradient-to-r from-red-600 via-red-500 to-red-700 bg-clip-text text-transparent">
              Welcome Back
            </span>
          </h1>

          <p className="text-xl text-gray-300 text-center mb-8 max-w-md mx-auto leading-relaxed">
            Log in to continue to your blogging dashboard
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email */}
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={credentials.email}
              onChange={handleChange}
              required
              className="w-full bg-gray-800/80 border border-gray-700 rounded-lg px-5 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-red-600 focus:ring-2 focus:ring-red-600/30 transition-all duration-200"
            />

            {/* Password */}
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={credentials.password}
              onChange={handleChange}
              required
              className="w-full bg-gray-800/80 border border-gray-700 rounded-lg px-5 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-red-600 focus:ring-2 focus:ring-red-600/30 transition-all duration-200"
            />

            {/* Error */}
            {error && (
              <motion.p
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-red-400 text-sm bg-red-600/10 border border-red-600/30 px-4 py-2 rounded-lg text-center"
              >
                {error}
              </motion.p>
            )}

            {/* Submit button */}
            <motion.button
              type="submit"
              disabled={loading}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              className="w-full py-4 text-base font-semibold bg-red-600 text-white hover:bg-red-700 transition-all duration-300 rounded-lg border border-red-600 hover:border-red-700 shadow-lg hover:shadow-xl"
            >
              {loading ? "Logging in…" : "Login"}
            </motion.button>
          </form>

          {/* Register link */}
          <p className="text-center text-gray-400 mt-6 text-sm">
            Don’t have an account?{" "}
            <Link
              to="/register"
              className="text-red-500 hover:text-red-400 underline transition-colors"
            >
              Register
            </Link>
          </p>
        </div>

        {/* Optional glow around the card */}
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-red-600/20 to-transparent blur-xl -z-10 opacity-0 transition-opacity duration-500"></div>
        <div className="absolute inset-0 shadow-[0_0_30px_rgba(239,68,68,0.3)] rounded-2xl blur-sm -z-10"></div>
      </motion.div>
    </section>
  );
};

export default Login;
