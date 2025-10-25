import React from "react";
import { motion } from "framer-motion";
import heroVideo from "../assets/videos/hero-background.mp4";
import { Link } from "react-router-dom";

// ✅ Framer Motion version of Link
const MotionLink = motion(Link);

const Hero = () => {
  return (
    <section className="w-full min-h-screen relative overflow-hidden flex items-center justify-center">
      
      {/* Background Video */}
      <video
        src={heroVideo}
        autoPlay
        loop
        muted
        className="absolute top-0 left-0 w-full h-full object-cover"
      />

      {/* Overlay */}
      <div className="absolute top-0 left-0 w-full h-full bg-black/50"></div>

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="relative z-10 text-center px-6 md:px-16 space-y-8 max-w-3xl"
      >
        <motion.h1 className="text-4xl md:text-6xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-rose-700 to-pink-600">
          Share Your Thoughts,<br />
          <span className="text-white">Connect Instantly.</span>
        </motion.h1>

        <motion.p className="text-gray-300 text-lg md:text-xl">
          Join <span className="text-rose-500 font-semibold">BlockBlitz</span> — a modern microblogging space where ideas flow freely and creativity thrives.
        </motion.p>

        {/* ✅ Animated Link (no reload) */}
        <MotionLink
          to="/register"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.97 }}
          transition={{ type: "spring", stiffness: 120 }}
          className="inline-block px-8 py-4 bg-gradient-to-r from-rose-700 to-pink-600 rounded-xl text-white font-semibold shadow-lg shadow-rose-700/30 hover:shadow-rose-700/50 transition-all duration-300"
        >
          Get Started
        </MotionLink>
      </motion.div>

      {/* Glow Effects */}
      <div className="absolute -top-20 -right-20 w-[400px] h-[400px] bg-rose-700/20 blur-[150px] rounded-full"></div>
      <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-blue-600/20 blur-[130px] rounded-full"></div>
    </section>
  );
};

export default Hero;
