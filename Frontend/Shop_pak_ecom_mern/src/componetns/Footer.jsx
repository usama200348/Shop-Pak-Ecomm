import React from "react";
import { Link } from "react-router-dom";
import {FaFacebookF, FaInstagram,FaTwitter,FaLinkedinIn} from 'react-icons/fa'
import DummyImage from "../assets/dummyimages.jpg";
import siteLogo from "../assets/logo.png";

const Footer = () => {
  return (
  <footer className="bg-gray-900 mt-8 text-white">
  <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-3 gap-8">

    {/* Logo */}
    <div>
      <img src={siteLogo} className="w-28 mb-3" alt="ShopPak" />
      <p className="text-sm text-gray-500">
        Shop Smart. Pay Less.
      </p>
    </div>

    {/* Links */}
    <div>
      <h2 className="font-bold text-gray-300 hover:text-green-500 text-lg mb-4">Quick Links</h2>

      <ul className="space-y-2  -400 text-lg mb-4">
        <li><Link to="/" className="text-gray-300 hover:text-green-500">Home</Link></li>
        <li><Link to="/products" className="text-gray-300 hover:text-green-500">Products</Link></li>
        <li><Link to="/categories" className="text-gray-300 hover:text-green-500">Categories</Link></li>
        <li><Link to="/contact" className="text-gray-300 hover:text-green-500">Contact</Link></li>
      </ul>
    </div>

    {/* Social */}
    <div>
      <h2 className="font-bold text-lg text-gray-300 hover:text-green-500 mb-4">Follow Us</h2>

      <div className="flex gap-4 text-3xl">

<div className="flex items-center gap-5 text-3xl">

  <a href="#" className="text-[#1877F2] hover:scale-110 duration-300">
    <FaFacebookF />
  </a>

  <a href="#" className="text-[#E4405F] hover:scale-110 duration-300">
    <FaInstagram />
  </a>

  <a href="#" className="text-[#1DA1F2] hover:scale-110 duration-300">
    <FaTwitter />
  </a>

  <a href="#" className="text-[#0A66C2] hover:scale-110 duration-300">
    <FaLinkedinIn />
  </a>

      </div>
      </div>
    </div>

  </div>

  <div className="bg-gray-950 text-gray-400 py-4 text-center border-t border-gray-800">
    © 2026 Shop-Pak. All Rights Reserved.
  </div>
</footer>
  );
};

export default Footer;