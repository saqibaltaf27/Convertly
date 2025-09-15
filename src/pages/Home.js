import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

// Import your image as a module
// This tells Webpack to correctly process the image and provide a valid URL
import heroImage from '../images/img.png'; // Make sure this path is correct relative to your file

// Landing Page Component
export default function LandingPage() {
  return (
    <div className="relative min-h-screen bg-gradient-to-b from-blue-50 to-white text-gray-800 font-sans antialiased overflow-hidden">

      {/* Floating background shapes */}
      <motion.div
        className="absolute top-0 left-1/2 w-96 h-96 bg-blue-200 rounded-full opacity-30 -translate-x-1/2 -z-10"
        animate={{ y: [0, 20, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-0 right-1/3 w-72 h-72 bg-pink-200 rounded-full opacity-20 -z-10"
        animate={{ y: [0, -15, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 md:py-24 flex flex-col md:flex-row items-center gap-12 relative z-10">
        <div className="w-full md:w-1/2 text-center md:text-left space-y-6">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight tracking-tight"
          >
            Ultimate File <span className="text-blue-700">Converter</span> & <span className="text-blue-700">Compressor</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="text-gray-600 text-lg md:text-xl"
          >
            Reduce file sizes and convert documents effortlessly. Fast, secure, and reliable.
          </motion.p>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start"
          >
            <Link to="/word-to-excel">
              <button className="px-8 py-4 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 transition transform hover:-translate-y-1 hover:scale-105">
                Start Converting
              </button>
            </Link>
            <Link to="/compress-pdf">
              <button className="px-8 py-4 border border-gray-400 text-gray-700 rounded-full hover:bg-gray-100 transition transform hover:-translate-y-1 hover:scale-105">
                Compress a File
              </button>
            </Link>
          </motion.div>
        </div>

        <motion.div
          className="w-full md:w-1/2 flex justify-center md:justify-end"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.8 }}
        >
          <motion.img
            src={heroImage}
            alt="File conversion illustration"
            className="w-full max-w-lg rounded-3xl shadow-xl"
            animate={{ rotate: [0, 5, -5, 0] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-16 relative z-10">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Why Choose Convertly?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <FeatureCard
            icon="M4 22h14a2 2 0 0 0 2-2V7.5L14.5 2H6a2 2 0 0 0-2 2v20Z"
            title="PDF Compression"
            desc="Reduce PDF file size for easier sharing without losing quality."
            color="indigo"
          />
          <FeatureCard
            icon="M3 3h18v18H3z M3 12h18 M12 3v18"
            title="File Conversion"
            desc="Convert Word, Excel, PowerPoint, and PDFs quickly and accurately."
            color="blue"
          />
          <FeatureCard
            icon="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6 M15 3h6v6 M10 14L21 3"
            title="Easy to Use"
            desc="Drag-and-drop interface for a fast and simple workflow."
            color="green"
          />
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="bg-blue-50 py-16 px-4 relative z-10">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">What Users Say</h2>
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          <Testimonial
            name="Sarah L."
            role="Project Manager"
            comment="Convertly makes converting and compressing files so easy! Highly recommend."
          />
          <Testimonial
            name="David M."
            role="Freelancer"
            comment="Saved me hours of work. Super fast and reliable tool!"
          />
          <Testimonial
            name="Emma K."
            role="Office Admin"
            comment="Intuitive design and excellent functionality. Love using Convertly daily."
          />
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-blue-700 text-white py-16 px-4 text-center rounded-3xl mt-16 mx-4 md:mx-0 shadow-lg relative z-10">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">Boost Your Productivity Today</h2>
        <p className="mb-6">Start converting and compressing files instantly with Convertly.</p>
        <Link to="/word-to-excel">
          <button className="px-10 py-4 bg-white text-blue-700 font-bold rounded-full shadow-lg hover:bg-gray-100 transition transform hover:-translate-y-1">
            Get Started
          </button>
        </Link>
      </section>

      {/* Footer */}
      
    </div>
  );
}

// FeatureCard Component
function FeatureCard({ icon, title, desc, color }) {
  const colors = { indigo: "text-indigo-600", blue: "text-blue-600", green: "text-green-600" };
  return (
    <motion.div
      className="bg-white rounded-2xl p-6 text-center border border-gray-200 transition-all duration-300 hover:shadow-xl hover:scale-105"
      whileHover={{ scale: 1.05, boxShadow: "0 20px 30px rgba(0,0,0,0.1)" }}
    >
      <svg className={`mx-auto mb-4 ${colors[color]}`} width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d={icon} />
      </svg>
      <h3 className="text-2xl font-bold mb-2">{title}</h3>
      <p className="text-gray-600">{desc}</p>
    </motion.div>
  );
}

// Testimonial Component
function Testimonial({ name, role, comment }) {
  return (
    <motion.div
      className="bg-white rounded-2xl p-6 text-center shadow-md hover:shadow-lg transition"
      whileHover={{ scale: 1.03 }}
    >
      <p className="text-gray-700 italic mb-4">"{comment}"</p>
      <h4 className="font-bold text-gray-900">{name}</h4>
      <p className="text-sm text-gray-500">{role}</p>
    </motion.div>
  );
}