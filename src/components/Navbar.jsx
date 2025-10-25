import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { HiMenu, HiX } from "react-icons/hi";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="w-full flex justify-between items-center px-6 md:px-8 py-4 bg-black/95 backdrop-blur-sm fixed top-0 z-50 border-b border-gray-800 shadow-sm">
      {/* Professional Logo - Netflix-inspired sleekness with golden metallic hashtag */}
      <div className="flex items-center space-x-3">
        {/* Golden Metallic Hashtag Icon with Shine - No circle background */}
        <div className="relative flex items-center justify-center group">
          <span className="text-3xl md:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-br from-yellow-300 via-yellow-500 to-yellow-700 drop-shadow-lg relative z-10">
            #
          </span>
          {/* Metallic Shine Effect - Highlight line for gold shine */}
          <div className="absolute top-1 left-1/2 transform -translate-x-1/2 w-1/2 h-1 bg-gradient-to-r from-transparent via-white to-transparent opacity-70 group-hover:opacity-100 transition-opacity duration-500"></div>
          {/* Subtle Glow */}
          <div className="absolute inset-0 shadow-[0_0_10px_rgba(255,215,0,0.4)] blur-sm opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
          {/* Additional Metallic Depth with shadows */}
          <div className="absolute inset-0 bg-gradient-to-br from-yellow-600/20 to-amber-800/20 opacity-50"></div>
        </div>
        <div className="text-2xl md:text-3xl font-black text-white tracking-tight drop-shadow-md">
          BlockBlitz
        </div>
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