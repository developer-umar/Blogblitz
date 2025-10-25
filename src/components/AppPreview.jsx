import React from "react";
import { motion } from "framer-motion";
import appMockup from "../assets/images/app-mockup.png";

const AppPreview = () => {
  return (
    <section className="py-24 px-6 md:px-16 bg-black/95 backdrop-blur-sm text-white relative overflow-hidden border-y border-gray-800">
      {/* Subtle Background Accents for Premium Depth */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-red-600/10 to-transparent rounded-full blur-3xl -z-10"></div>
      <div className="absolute bottom-0 right-0 w-[450px] h-[450px] bg-gradient-to-br from-red-600/5 to-transparent rounded-full blur-3xl -z-10"></div>

      <div className="flex flex-col lg:flex-row items-center justify-between gap-12 md:gap-20">
        {/* Text Content - Enhanced for Premium Feel */}
        <motion.div
          className="lg:w-1/2 text-center lg:text-left mb-10 lg:mb-0"
          initial={{ x: -50, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black mb-6 tracking-tight drop-shadow-md">
            <span className="bg-gradient-to-r from-red-600 via-red-500 to-red-700 bg-clip-text text-transparent">
              Your World,
            </span>
            <br />
            <span className="text-white">One Post at a Time</span>
          </h2>
          <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-lg mx-auto lg:mx-0 leading-relaxed">
            Dive into a sleek, intuitive interface crafted for seamless sharing. Connect instantly, discover trends, and build your digital lifestyle with effortless elegance.
          </p>
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
          >
            <a
              href="/register"
              className="px-8 py-4 text-base font-semibold bg-red-600 text-white hover:bg-red-700 transition-all duration-300 rounded-lg border border-red-600 hover:border-red-700 shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              Posts
            </a>
            {/* <a
              href="/features"
              className="px-8 py-4 text-base font-medium text-gray-300 hover:text-white transition-all duration-300 border border-gray-600 hover:border-white rounded-lg"
            >
              Explore Features
            </a> */}
          </motion.div>
        </motion.div>

        {/* Image Preview - Larger, Premium Styling */}
        <motion.div
          className="lg:w-1/2 relative"
          initial={{ x: 50, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          <div className="relative z-10">
            <motion.img
              src={appMockup}
              alt="BlockBlitz App Preview"
              className="w-full max-w-md mx-auto lg:max-w-lg rounded-2xl shadow-2xl border border-gray-700/50"
              whileHover={{ scale: 1.02, rotateY: 5 }}
              transition={{ type: "spring", stiffness: 100 }}
            />
          </div>
          {/* Premium Glow Effect Around Image */}
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-red-600/20 to-transparent blur-xl -z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          <div className="absolute inset-0 shadow-[0_0_30px_rgba(239,68,68,0.3)] rounded-2xl blur-sm -z-5"></div>
        </motion.div>
      </div>
    </section>
  );
};

export default AppPreview;