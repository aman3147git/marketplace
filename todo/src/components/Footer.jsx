import React from 'react';
import { FaInstagram, FaXTwitter, FaFacebookF } from "react-icons/fa6";

const Footer = () => {
  return (
    
    <footer className="bg-[#111111] text-white py-8">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 px-6 md:px-12">
        
        
        <div>
          <h2 className="text-xl font-semibold mb-3">About Us</h2>
          <p className="text-sm opacity-90">
            We connect buyers and sellers, making shopping easy and accessible for everyone. 
            At <span className="font-bold text-blue-400">MarketPlace</span>, our mission is to create a trusted and efficient 
            online marketplace where users can find high-quality products at the best prices.
            We support small businesses and local sellers. Join us in building a community-driven marketplace!
          </p>
        </div>

        
        <div>
          <h2 className="text-xl font-semibold mb-3">Quick Links</h2>
          <ul className="space-y-2">
            <li><a href="/about" className="hover:underline">About Us</a></li>
            <li><a href="/shop" className="hover:underline">Shop</a></li>
            <li><a href="/contact" className="hover:underline">Contact</a></li>
            <li><a href="/privacy" className="hover:underline">Privacy Policy</a></li>
          </ul>
        </div>

        
        <div>
          <h2 className="text-xl font-semibold mb-3">Contact Us</h2>
          <p className="text-sm opacity-90">Email: amanc3147@gmail.com</p>
          <p className="text-sm opacity-90">Phone: +91 9721361262</p>
          <div className="flex gap-4 mt-4">
            <a href="https://instagram.com" className="text-2xl hover:text-gray-300 text-purple-600"><FaInstagram /></a>
            <a href="https://twitter.com" className="text-2xl hover:text-gray-300 text-purple-600"><FaXTwitter /></a>
            <a href="https://facebook.com" className="text-2xl hover:text-gray-300 text-purple-600"><FaFacebookF /></a>
          </div>
        </div>

      </div>

      
      <div className="text-center text-sm opacity-80 mt-6 border-t border-white/20 pt-4">
        © {new Date().getFullYear()} MarketPlace. All rights reserved.
      </div>
    </footer>
    
  );
}

export default Footer;
