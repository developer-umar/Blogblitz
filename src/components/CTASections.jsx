import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const CTASection = () => {
  return (
    <section className="py-24 px-6 md:px-16 bg-black/95 backdrop-blur-sm text-white text-center relative overflow-hidden border-y border-gray-800">
      {/* Subtle Background Glows for Depth */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-red-600/10 to-transparent rounded-full blur-3xl -z-10"></div>
      <div className="absolute bottom-0 right-0 w-[450px] h-[450px] bg-gradient-to-br from-red-600/5 to-transparent rounded-full blur-3xl -z-10"></div>

      <motion.h2
        initial={{ y: 30, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        viewport={{ once: true }}
        className="text-4xl md:text-5xl font-black mb-6 tracking-tight drop-shadow-md"
      >
        Ready to Update with Latest Tech & Trends?
      </motion.h2>
      
      <motion.p
        initial={{ y: 30, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
        viewport={{ once: true }}
        className="text-xl md:text-2xl mb-8 text-gray-300 max-w-2xl mx-auto leading-relaxed"
      >
        Share your lifestyle, connect with innovators, and dive into real-time discussions on cutting-edge tech, fashion trends, fitness hacks, and more. Join the conversation today!
      </motion.p>
      
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        viewport={{ once: true }}
        className="inline-flex space-x-4"
      >
        <Link
          to="/register"
          className="px-8 py-4 text-base font-semibold bg-red-600 text-white hover:bg-red-700 transition-all duration-300 rounded-lg border border-red-600 hover:border-red-700 shadow-lg hover:shadow-xl transform hover:scale-105"
        >
          Sign Up Free
        </Link>
        <Link
          to="/login"
          className="px-8 py-4 text-base font-medium text-gray-300 hover:text-white transition-all duration-300 border border-gray-600 hover:border-white rounded-lg"
        >
          Already a Member? Login
        </Link>
      </motion.div>
    </section>
  );
};

export default CTASection;