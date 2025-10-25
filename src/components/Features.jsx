import React from "react";
import { FaPenFancy, FaHeart, FaGlobe, FaBell, FaShieldAlt, FaRocket } from "react-icons/fa";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const features = [
  { 
    icon: <FaPenFancy />, 
    title: "Quick Posting", 
    desc: "Share short messages, photos, or videos instantly. Craft engaging content with ease and reach your audience in seconds." 
  },
  { 
    icon: <FaHeart />, 
    title: "Engage with Others", 
    desc: "Like, comment, and repost in real time. Build meaningful connections and grow your community through interactive discussions." 
  },
  { 
    icon: <FaGlobe />, 
    title: "Discover Trends", 
    desc: "Explore trending topics and follow your favorites. Stay ahead of the curve with personalized recommendations and global insights." 
  },
  { 
    icon: <FaBell />, 
    title: "Stay Updated", 
    desc: "Get notified about what matters to you. Never miss a beat with customizable alerts for mentions, likes, and new followers." 
  },
  { 
    icon: <FaShieldAlt />, 
    title: "Secure & Private", 
    desc: "Your data is protected with advanced encryption. Control your privacy settings and share confidently without worries." 
  },
  { 
    icon: <FaRocket />, 
    title: "Lightning Fast", 
    desc: "Experience seamless performance with optimized loading times. Post, scroll, and interact at blazing speeds across all devices." 
  },
];

const Features = () => {
  return (
    <section id="features" className="py-24 px-6 md:px-16 bg-black/95 backdrop-blur-sm text-white relative overflow-hidden border-y border-gray-800">
      {/* Premium Background Glow Accents - Red-themed for Netflix consistency */}
      <div className="absolute top-0 -left-28 w-96 h-96 bg-red-600/10 blur-3xl rounded-full -z-10 animate-pulse"></div>
      <div className="absolute top-20 right-0 w-72 h-72 bg-red-500/10 blur-3xl rounded-full -z-10 animate-pulse delay-1000"></div>
      <div className="absolute bottom-0 -right-28 w-[450px] h-[450px] bg-red-600/5 blur-3xl rounded-full -z-10"></div>
      <div className="absolute bottom-20 left-0 w-80 h-80 bg-red-500/10 blur-3xl rounded-full -z-10 animate-pulse delay-2000"></div>

      {/* Section Title - Red gradient for premium Netflix vibe */}
      <motion.h2 
        className="text-4xl md:text-6xl font-black text-center mb-4 bg-clip-text text-transparent bg-gradient-to-r from-red-500 via-red-600 to-red-700 drop-shadow-lg tracking-tight"
        initial={{ opacity: 0, y: -50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
        viewport={{ once: true }}
      >
        Features
      </motion.h2>
      <motion.p 
        className="text-xl md:text-2xl text-center mb-20 text-gray-300 max-w-3xl mx-auto leading-relaxed"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        viewport={{ once: true }}
      >
        Discover the powerful tools that make BlockBlitz the ultimate social experience. Designed for creators, connectors, and explorers – sleek, secure, and built to scale.
      </motion.p>

      {/* Feature Cards Grid - Unified red theme for consistency */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
        {features.map((f, i) => (
          <motion.div
            key={i}
            className="group bg-gray-800/70 backdrop-blur-md p-6 md:p-8 rounded-2xl cursor-pointer shadow-xl border border-red-500/30 transition-all duration-700 hover:shadow-2xl hover:border-red-400/60 hover:bg-gradient-to-br hover:from-red-500/10 hover:to-red-600/10 overflow-hidden relative"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: i * 0.1 }}
            whileHover={{ 
              scale: 1.03, 
              y: -8,
              rotateX: 2,
            }}
            viewport={{ once: true }}
          >
            {/* Card Glow Effect on Hover */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl -z-10 bg-gradient-to-r from-red-400/20 to-red-600/20"></div>
            
            <motion.div 
              className="text-4xl md:text-5xl mb-4 md:mb-6 text-red-400 group-hover:text-red-300 transition-all duration-500 flex justify-center"
              whileHover={{ 
                scale: 1.2, 
                rotate: 180,
                y: -10 
              }}
              transition={{ duration: 0.5, type: "spring", stiffness: 100 }}
            >
              {f.icon}
            </motion.div>
            <h3 className="text-lg md:text-xl lg:text-2xl font-bold mb-3 tracking-tight text-white text-center group-hover:text-red-100 transition-colors duration-300">{f.title}</h3>
            <p className="text-gray-300 text-sm md:text-base leading-relaxed text-center group-hover:text-gray-200 transition-colors duration-300">{f.desc}</p>
          </motion.div>
        ))}
      </div>

      {/* Call to Action at Bottom - Consistent red button */}
      <motion.div 
        className="text-center mt-16"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        viewport={{ once: true }}
      >
        {/* <Link
          to="/register"
          className="inline-block bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-2xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 border border-red-600 hover:border-red-700"
        >
          Get Started Today
        </Link> */}
      </motion.div>
    </section>
  );
};

export default Features;