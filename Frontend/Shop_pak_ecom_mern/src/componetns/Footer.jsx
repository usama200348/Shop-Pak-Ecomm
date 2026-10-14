import React from "react";
import { Link } from "react-router-dom";
import { FaFacebookF, FaInstagram, FaTwitter, FaLinkedinIn } from "react-icons/fa";
import siteLogo from "../assets/logo.png";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <img src={siteLogo} className="w-28 mb-3" alt="ShopPak" />
          <p className="text-sm text-gray-400">Shop Smart. Pay Less.</p>
        </div>

        <div>
          <h2 className="font-bold text-gray-300 text-lg mb-4">Quick Links</h2>
          <ul className="space-y-2 text-lg">
            <li><Link to="/" className="text-gray-300 hover:text-green-500">Home</Link></li>
            <li><Link to="/products" className="text-gray-300 hover:text-green-500">Products</Link></li>
            <li><Link to="/categories" className="text-gray-300 hover:text-green-500">Categories</Link></li>
            <li><Link to="/contact" className="text-gray-300 hover:text-green-500">Contact</Link></li>
          </ul>
        </div>

        <div>
          <h2 className="font-bold text-lg text-gray-300 mb-4">Follow Us</h2>
          <div className="flex items-center gap-5 text-3xl">
            <a href="#" className="text-[#1877F2] hover:scale-110 duration-300" aria-label="Facebook">
              <FaFacebookF />
            </a>
            <a href="#" className="text-[#E4405F] hover:scale-110 duration-300" aria-label="Instagram">
              <FaInstagram />
            </a>
            <a href="#" className="text-[#1DA1F2] hover:scale-110 duration-300" aria-label="Twitter">
              <FaTwitter />
            </a>
            <a href="#" className="text-[#0A66C2] hover:scale-110 duration-300" aria-label="LinkedIn">
              <FaLinkedinIn />
            </a>
          </div>
        </div>
      </div>

      <div className="bg-gray-950 text-gray-400 py-4 text-center border-t border-gray-800">
        &copy; 2026 Shop-Pak. All Rights Reserved.
      </div>
    </footer>
  );
};

export default Footer;
