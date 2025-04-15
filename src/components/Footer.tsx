
import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-100 dark:bg-[#161b22] py-8 mt-12 dark:border-t dark:border-[#30363d]">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between">
          <div className="mb-6 md:mb-0">
            <h3 className="text-lg font-semibold mb-2 dark:text-[#c9d1d9]">LightBulb Direct</h3>
            <p className="text-sm text-gray-600 dark:text-[#8b949e] max-w-xs">
              Your trusted source for high-quality lighting solutions for home and business.
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
            <div className="mb-6 md:mb-0">
              <h4 className="font-medium mb-2 dark:text-[#c9d1d9]">Quick Links</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <a href="#" className="text-gray-600 hover:text-primary dark:text-[#8b949e] dark:hover:text-[#58a6ff]">Home</a>
                </li>
                <li>
                  <a href="#" className="text-gray-600 hover:text-primary dark:text-[#8b949e] dark:hover:text-[#58a6ff]">Products</a>
                </li>
                <li>
                  <a href="#" className="text-gray-600 hover:text-primary dark:text-[#8b949e] dark:hover:text-[#58a6ff]">About Us</a>
                </li>
                <li>
                  <a href="#" className="text-gray-600 hover:text-primary dark:text-[#8b949e] dark:hover:text-[#58a6ff]">Contact</a>
                </li>
              </ul>
            </div>
            <div className="mb-6 md:mb-0">
              <h4 className="font-medium mb-2 dark:text-[#c9d1d9]">Customer Service</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <a href="#" className="text-gray-600 hover:text-primary dark:text-[#8b949e] dark:hover:text-[#58a6ff]">FAQs</a>
                </li>
                <li>
                  <a href="#" className="text-gray-600 hover:text-primary dark:text-[#8b949e] dark:hover:text-[#58a6ff]">Shipping</a>
                </li>
                <li>
                  <a href="#" className="text-gray-600 hover:text-primary dark:text-[#8b949e] dark:hover:text-[#58a6ff]">Returns</a>
                </li>
                <li>
                  <a href="#" className="text-gray-600 hover:text-primary dark:text-[#8b949e] dark:hover:text-[#58a6ff]">Track Order</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-200 dark:border-[#30363d] mt-8 pt-6 text-sm text-gray-600 dark:text-[#8b949e] text-center">
          <p>© {new Date().getFullYear()} LightBulb Direct. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
