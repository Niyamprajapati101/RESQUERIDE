import React from "react";
import { Link } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
  FaYoutube,
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
  FaArrowUp,
} from "react-icons/fa";

function Footer() {
  const { theme } = useTheme();
  return (
    <footer className={`backdrop-blur-md border-t pt-16 pb-8 relative z-10 ${
      theme === 'light'
        ? 'bg-white border-gray-200 text-gray-700'
        : 'bg-black/20 border-white/10 text-gray-300'
    }`}>

      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-4 gap-10">

      
        <div>
          <h2 className={`text-2xl font-bold flex items-center gap-2 ${
            theme === 'light' ? 'text-black' : 'text-white'
          }`}>
            <span className="text-[#94d2bd]">RESQUERIDE</span >
          </h2>

          <p className={`mt-4 text-sm leading-6 ${
            theme === 'light' ? 'text-gray-600' : 'text-gray-400'
          }`}>
            Premium car rental service with the latest models and exceptional
            customer service. Drive your dream car today!
          </p>

       
          <div className="flex gap-3 mt-6">
            <div className={`border p-3 rounded-full hover:bg-[#94d2bd] cursor-pointer transition ${
              theme === 'light'
                ? 'bg-gray-100 border-gray-300'
                : 'bg-white/10 border-white/10'
            }`}>
              <FaFacebookF />
            </div>
            <div className={`border p-3 rounded-full hover:bg-[#94d2bd] cursor-pointer transition ${
              theme === 'light'
                ? 'bg-gray-100 border-gray-300'
                : 'bg-white/10 border-white/10'
            }`}>
              <FaTwitter />
            </div>
            <div className={`border p-3 rounded-full hover:bg-[#94d2bd] cursor-pointer transition ${
              theme === 'light'
                ? 'bg-gray-100 border-gray-300'
                : 'bg-white/10 border-white/10'
            }`}>
              <FaInstagram />
            </div>
            <div className={`border p-3 rounded-full hover:bg-[#94d2bd] cursor-pointer transition ${
              theme === 'light'
                ? 'bg-gray-100 border-gray-300'
                : 'bg-white/10 border-white/10'
            }`}>
              <FaLinkedinIn />
            </div>
            <div className={`border p-3 rounded-full hover:bg-[#94d2bd] cursor-pointer transition ${
              theme === 'light'
                ? 'bg-gray-100 border-gray-300'
                : 'bg-white/10 border-white/10'
            }`}>
              <FaYoutube />
            </div>
          </div>
        </div>

        <div>
          <h3 className={`text-lg font-semibold mb-4 border-b border-[#94d2bd] inline-block pb-1 ${
            theme === 'light' ? 'text-black' : 'text-white'
          }`}>
            Quick Links
          </h3>

          <ul className="space-y-3 mt-4">
            <li>
              <Link to="/" className={`hover:text-[#94d2bd] ${
                theme === 'light' ? 'text-gray-700' : ''
              }`}>• Home</Link>
            </li>
            <li>
              <Link to="/cars" className={`hover:text-[#94d2bd] ${
                theme === 'light' ? 'text-gray-700' : ''
              }`}>• Cars</Link>
            </li>
            <li>
              <Link to="/contact" className={`hover:text-[#94d2bd] ${
                theme === 'light' ? 'text-gray-700' : ''
              }`}>• Contact Us</Link>
            </li>
          </ul>
        </div>

       
        <div>
          <h3 className={`text-lg font-semibold mb-4 border-b border-[#94d2bd] inline-block pb-1 ${
            theme === 'light' ? 'text-black' : 'text-white'
          }`}>
            Contact Us
          </h3>

          <div className="space-y-3 mt-4 text-sm">

            <p className={`flex items-center gap-2 ${
              theme === 'light' ? 'text-gray-700' : ''
            }`}>
              <FaMapMarkerAlt className="text-[#94d2bd]" />
              Ahmedabad, India
            </p>

            <p className={`flex items-center gap-2 ${
              theme === 'light' ? 'text-gray-700' : ''
            }`}>
              <FaPhone className="text-[#94d2bd]" />
              +91 8299431275
            </p>

            <p className={`flex items-center gap-2 ${
              theme === 'light' ? 'text-gray-700' : ''
            }`}>
              <FaEnvelope className="text-[#94d2bd]" />
              support@cars4u.com
            </p>

            <div className="mt-4">
              <h4 className={`font-semibold ${
                theme === 'light' ? 'text-black' : 'text-white'
              }`}>Business Hours</h4>
              <p className={`text-sm mt-2 ${
                theme === 'light' ? 'text-gray-600' : 'text-gray-400'
              }`}>
                Monday - Friday: 8:00 AM - 8:00 PM
              </p>
              <p className={`text-sm ${
                theme === 'light' ? 'text-gray-600' : 'text-gray-400'
              }`}>
                Saturday: 9:00 AM - 6:00 PM
              </p>
              <p className={`text-sm ${
                theme === 'light' ? 'text-gray-600' : 'text-gray-400'
              }`}>
                Sunday: 10:00 AM - 4:00 PM
              </p>
            </div>

          </div>
        </div>

      
        <div>
          <h3 className={`text-lg font-semibold mb-4 border-b border-[#94d2bd] inline-block pb-1 ${
            theme === 'light' ? 'text-black' : 'text-white'
          }`}>
            Subscribe
          </h3>

          <p className={`text-sm mt-4 ${
            theme === 'light' ? 'text-gray-700' : ''
          }`}>
            Subscribe for special offers and updates
          </p>

          <input
            type="email"
            placeholder="Your Email Address"
            className={`w-full mt-4 px-4 py-3 rounded outline-none focus:border-[#94d2bd]/60 ${
              theme === 'light'
                ? 'bg-gray-100 border border-gray-300 text-black placeholder-gray-500'
                : 'bg-white/10 border border-white/10 text-white placeholder-white/35'
            }`}
          />

          <button className={`w-full mt-4 py-3 rounded font-semibold transition ${
            theme === 'light'
              ? 'bg-blue-600 hover:bg-blue-700 text-white'
              : 'bg-[#94d2bd] hover:bg-[#7bbda8] text-white'
          }`}>
            Subscribe Now
          </button>
        </div>
      </div>

     
      <div className={`border-t mt-10 pt-4 text-center text-sm ${
        theme === 'light'
          ? 'border-gray-300 text-gray-600'
          : 'border-white/10 text-gray-500'
      }`}>
        © 2026 RESQUERIDE. All Rights Reserved.
      </div>

  
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className={`fixed bottom-6 right-6 p-3 rounded-full shadow-lg transition ${
          theme === 'light'
            ? 'bg-blue-600 hover:bg-blue-700 text-white'
            : 'bg-[#94d2bd] hover:bg-[#7bbda8] text-white'
        }`}
      >
        <FaArrowUp />
      </button>

    </footer>
  );
}

export default Footer;


