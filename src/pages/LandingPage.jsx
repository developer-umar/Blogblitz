import React from "react";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Features from "../components/Features";
import AppPreview from "../components/AppPreview";
import CTASection from "../components/CTASections";
import Footer from "../components/Footer";
const LandingPage = () => {
  return (
    <div className="bg-gray-900 text-white">
      <Navbar />
      <Hero />
      <AppPreview />
      <Features />
      <CTASection />
      <Footer/>
    </div>
  );
};

export default LandingPage;
