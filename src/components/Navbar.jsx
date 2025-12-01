import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { HiMenu, HiX } from "react-icons/hi";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="w-full flex justify-between items-center px-6 md:px-8 py-4 bg-black/95 backdrop-blur-sm fixed top-0 z-50 border-b border-gray-800 shadow-sm">
      {/* Ultra-Professional Logo - Premium metallic gold, cinematic shine, subtle micro-animations for UI/UX mastery */}
      <div className="flex items-center space-x-3 group/logo">
        {/* Zabardast Golden Metallic Hashtag - Multi-faceted 3D, dynamic bevels, pro-level glow cascade */}
        <motion.div 
          className="relative flex items-center justify-center cursor-default"
          initial={{ scale: 0.95, rotate: -2 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          whileHover={{ scale: 1.05 }}
        >
          {/* Core Hashtag - Hyper-refined gradient with metallic sheen */}
          <span className="text-3xl md:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-br from-amber-400 via-yellow-500 to-amber-600 drop-shadow-2xl relative z-20">
            #
          </span>
          {/* Cinematic Primary Shine - Animated diagonal highlight with glow pulse */}
          <motion.div 
            className="absolute top-0.5 left-1/3 w-2/3 h-0.5 bg-gradient-to-r from-yellow-200 via-white to-yellow-200 opacity-80 rounded-sm shadow-md"
            initial={{ width: 0 }}
            animate={{ width: "66.67%" }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeInOut" }}
            whileHover={{ opacity: 100, scaleX: 1.1 }}
          />
          {/* Elite Secondary Bevel - Top-left emboss with micro-shimmer */}
          <div className="absolute top-1 left-0.5 w-1/2 h-1 bg-gradient-to-r from-white/60 to-transparent opacity-70 rounded-sm"></div>
          {/* Engraved Base Shadow - Subtle bottom-right for tactile depth */}
          <div className="absolute bottom-0.5 right-0.5 w-full h-0.5 bg-gradient-to-l from-amber-900/60 to-transparent opacity-80 blur-xs"></div>
          {/* Radiant Outer Halo - Breathing glow with hover intensification */}
          <motion.div 
            className="absolute inset-0 shadow-[0_0_20px_rgba(255,215,0,0.4),inset_0_0_15px_rgba(255,215,0,0.15)] blur-lg rounded-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.6, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            whileHover={{ opacity: 1, scale: 1.1 }}
          />
          {/* Textured Inner Overlay - Luxe gradient for forged-metal illusion */}
          <div className="absolute inset-0 bg-gradient-to-tr from-amber-700/40 via-transparent to-amber-900/40 rounded-sm backdrop-blur-xs"></div>
        </motion.div>
        {/* Masterclass BlockBlitz Text - Kinetic typography, gold foil effect, pro kerning & letter-spacing */}
        <motion.div 
          className="text-2xl md:text-3xl font-black tracking-[-0.03em] bg-gradient-to-r from-amber-300 via-yellow-400 to-amber-500 bg-clip-text text-transparent drop-shadow-2xl relative overflow-hidden"
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
          whileHover={{ scale: 1.02, y: -1 }}
        >
          BlockBlitz
          {/* Foil Shine Sweep - Animated light sweep across text on load/hover */}
          <motion.div 
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 opacity-0"
            initial={{ x: -100 }}
            animate={{ x: [ -100, 200 ] }}
            transition={{ duration: 1.5, delay: 0.4, ease: "easeInOut" }}
            whileHover={{ opacity: 50, transition: { duration: 0.8 } }}
          />
          {/* Layered Depth Shadows - Multi-pass for cinematic volume */}
          <div className="absolute inset-0 bg-gradient-to-b from-yellow-600/30 to-amber-800/50 -skew-x-2 opacity-90 blur-sm"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-amber-900/20 to-transparent opacity-70"></div>
        </motion.div>
      </div>

      {/* Desktop Menu - Clean, Netflix-like horizontal nav */}
      <ul className="hidden lg:flex space-x-10 text-sm font-medium text-gray-300">
        {["Home", "Features", "About", "Contact"].map((link, idx) => (
          <li key={idx}>
            <Link
              to={`#${link.toLowerCase()}`}
              className="relative px-2 py-1 hover:text-white transition-colors duration-200 group"
            >
              {link}
              <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-red-600 group-hover:w-full transition-all duration-300"></span>
            </Link>
          </li>
        ))}
      </ul>

      {/* Action Buttons - Subtle, professional like Netflix profile */}
      <div className="hidden lg:flex items-center space-x-6">
        <Link
          to="/login"
          className="px-4 py-2 text-sm font-medium text-gray-300 hover:text-white transition-colors duration-200 border border-transparent hover:border-gray-600 rounded"
        >
          Sign In
        </Link>
        <Link
          to="/register"
          className="px-6 py-2 text-sm font-semibold bg-red-600 text-white hover:bg-red-700 transition-colors duration-200 rounded border border-red-600 hover:border-red-700"
        >
          Sign Up
        </Link>
      </div>

      {/* Mobile Menu Button - Minimalist */}
      <div className="lg:hidden">
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className="p-2 text-gray-300 hover:text-white transition-colors duration-200 rounded"
        >
          {isOpen ? (
            <HiX className="w-6 h-6" />
          ) : (
            <HiMenu className="w-6 h-6" />
          )}
        </button>
      </div>

      {/* Mobile Menu - Full overlay like Netflix mobile */}
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 20 }}
          className="absolute top-full right-0 w-64 bg-black/95 backdrop-blur-sm border border-gray-800 shadow-xl py-6 px-4 flex flex-col space-y-4 text-white"
        >
          {["Home", "Features", "About", "Contact"].map((link, idx) => (
            <Link
              key={idx}
              to={`#${link.toLowerCase()}`}
              className="text-base font-medium hover:text-red-600 transition-colors duration-200 py-2"
              onClick={() => setIsOpen(false)}
            >
              {link}
            </Link>
          ))}
          <div className="pt-4 border-t border-gray-700 space-y-3">
            <Link
              to="/login"
              className="block w-full text-center px-4 py-3 text-sm font-medium text-gray-300 hover:text-white transition-colors duration-200 border border-gray-600 rounded"
              onClick={() => setIsOpen(false)}
            >
              Sign In
            </Link>
            <Link
              to="/register"
              className="block w-full text-center px-4 py-3 text-sm font-semibold bg-red-600 text-white hover:bg-red-700 transition-colors duration-200 rounded border border-red-600"
              onClick={() => setIsOpen(false)}
            >
              Sign Up
            </Link>
          </div>
        </motion.div>
      )}
    </nav>
  );
};

export default Navbar;