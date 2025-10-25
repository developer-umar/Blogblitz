import React from "react";
import { motion } from "framer-motion";
import { FaTwitter, FaInstagram, FaLinkedin, FaGithub } from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="w-full bg-black/95 backdrop-blur-sm text-gray-400 border-t border-gray-800 relative overflow-hidden">
      {/* Subtle Background Glow for Depth */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-red-600/5 to-transparent rounded-full blur-3xl -z-10"></div>
      <div className="absolute bottom-0 right-0 w-[450px] h-[450px] bg-gradient-to-br from-red-600/5 to-transparent rounded-full blur-3xl -z-10"></div>

      <div className="max-w-7xl mx-auto px-6 md:px-16 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-12">
          {/* Logo and Company Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="md:col-span-1"
          >
            <div className="flex items-center space-x-3 mb-4">
              {/* Golden Metallic Hashtag Icon */}
              <div className="relative flex items-center justify-center">
                <span className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-br from-yellow-300 via-yellow-500 to-yellow-700 drop-shadow-lg">
                  #
                </span>
                <div className="absolute top-0.5 left-1/2 transform -translate-x-1/2 w-1/2 h-0.5 bg-gradient-to-r from-transparent via-white to-transparent opacity-60"></div>
                <div className="absolute inset-0 shadow-[0_0_10px_rgba(255,215,0,0.3)] blur-sm"></div>
              </div>
              <h3 className="text-xl md:text-2xl font-black text-white tracking-tight">
                BlockBlitz
              </h3>
            </div>
            <p className="text-sm leading-relaxed text-gray-500 max-w-xs">
              The ultimate platform for sharing trends, tech updates, and lifestyle moments. Connect, create, and conquer.
            </p>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
            className="md:col-span-1"
          >
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {[
                { label: "Home", to: "/" },
                { label: "Features", to: "#features" },
                { label: "About", to: "#about" },
                { label: "Contact", to: "#contact" }
              ].map((item, idx) => (
                <li key={idx}>
                  <Link
                    to={item.to}
                    className="text-gray-400 hover:text-red-400 transition-colors duration-200 text-sm hover:underline"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Legal Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="md:col-span-1"
          >
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Legal</h4>
            <ul className="space-y-2">
              {[
                { label: "Privacy Policy", to: "/privacy" },
                { label: "Terms of Service", to: "/terms" },
                { label: "Cookie Policy", to: "/cookies" },
                { label: "Support", to: "/support" }
              ].map((item, idx) => (
                <li key={idx}>
                  <Link
                    to={item.to}
                    className="text-gray-400 hover:text-red-400 transition-colors duration-200 text-sm hover:underline"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Social & Newsletter */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
            className="md:col-span-1"
          >
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Connect With Us</h4>
            <div className="flex space-x-4 mb-4">
              {[
                { icon: FaTwitter, color: "hover:text-blue-400" },
                { icon: FaInstagram, color: "hover:text-pink-500" },
                { icon: FaLinkedin, color: "hover:text-blue-600" },
                { icon: FaGithub, color: "hover:text-gray-300" }
              ].map((social, idx) => (
                <motion.a
                  key={idx}
                  href="#"
                  whileHover={{ scale: 1.1 }}
                  className={`p-2 rounded-full bg-gray-800 ${social.color} transition-all duration-200 text-gray-500`}
                >
                  <social.icon className="w-5 h-5" />
                </motion.a>
              ))}
            </div>
            <div className="text-sm text-gray-500">
              <p>Stay updated with the latest trends.</p>
            </div>
          </motion.div>
        </div>

        {/* Bottom Divider */}
        <div className="border-t border-gray-800 my-8"></div>

        {/* Copyright */}
        <div className="text-center text-sm">
          <p className="text-gray-500">
            Copyright © 2025 <Link to="/" className="text-white hover:text-red-400 transition-colors duration-200 font-semibold">BlockBlitz</Link>. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;