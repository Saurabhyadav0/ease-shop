"use client";

import React from "react";
import Link from "next/link";
import FooterTop from "./FooterTop";
import { Input } from "@/components/ui/input";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import { SVGProps } from "react";

// Dummy data for categories if not already declared elsewhere
const categoriesData = [
  { title: "All Products", href: "/products" },
  { title: "Women's Clothing", href: "/products?category=women's clothing" },
  { title: "Men's Clothing", href: "/products?category=men's clothing" },
  { title: "Electronics", href: "/products?category=electronics" },
  { title: "Jewelery", href: "/products?category=jewelery" },
];


const Footer: React.FC = () => {
 type NewType = {
  icon: React.ReactElement<SVGProps<SVGSVGElement>>;
  href: string;
  color: string;
  label: string;
};


  type SocialMediaLink = NewType;

  const socialMediaLinks: SocialMediaLink[] = [
    { icon: <FaFacebookF />, href: "https://www.facebook.com", color: "#1877F2", label: "Facebook" },
    { icon: <FaTwitter />, href: "https://www.twitter.com", color: "#1DA1F2", label: "Twitter" },
    { icon: <FaInstagram />, href: "https://www.instagram.com", color: "#E4405F", label: "Instagram" },
    { icon: <FaLinkedinIn />, href: "https://www.linkedin.com", color: "#0A66C2", label: "LinkedIn" },
  ];

  const quickLinksData = [
    { title: "Home", href: "/" },
    { title: "Shop", href: "/products" },
    { title: "About Us", href: "/" },
    { title: "Contact", href: "/support" },
    { title: "FAQ", href: "/faq" },
  ];

  return (
    <footer className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
      {/* Optional: FooterTop component */}
      <FooterTop />

      <div className="container mx-auto py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {/* Logo and social links */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-shop-primary dark:text-white">ShopEase</h2>
          <p className="text-gray-600 dark:text-gray-400 text-sm">
            Style that speaks, fashion that lasts. Dress your best with us!
          </p>
          <div className="flex gap-3">
            {socialMediaLinks.map(({ icon, href, color, label }, index) => (
              <a
                key={index}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                title={label}
                className="p-2 border border-gray-300 rounded-full transition-colors duration-300 text-gray-500 dark:text-gray-400 hover:text-white"
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.backgroundColor = color;
                  (e.currentTarget as HTMLAnchorElement).style.borderColor = color;
                  (e.currentTarget as HTMLAnchorElement).style.color = "#ffffff";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.backgroundColor = "transparent";
                  (e.currentTarget as HTMLAnchorElement).style.borderColor = "rgba(0,0,0,0.1)";
                  (e.currentTarget as HTMLAnchorElement).style.color = "rgb(107, 114, 128)";
                }}
              >
                {React.cloneElement(icon, { className: "w-4 h-4" })}
              </a>
            ))}
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="font-semibold text-darkColor dark:text-white mb-4">Quick Links</h3>
          <div className="flex flex-col gap-3">
            {quickLinksData.map((item) => (
              <Link
                key={item.title}
                href={item.href}
                className="text-gray-600 dark:text-gray-400 hover:text-darkColor dark:hover:text-white text-sm font-medium"
              >
                {item.title}
              </Link>
            ))}
          </div>
        </div>

        {/* Categories */}
        <div>
          <h3 className="font-semibold text-darkColor dark:text-white mb-4">Categories</h3>
          <div className="flex flex-col gap-3">
            {categoriesData.map((item) => (
              <Link
                key={item.title}
                href={item.href}
                className="text-gray-600 dark:text-gray-400 hover:text-darkColor dark:hover:text-white text-sm font-medium"
              >
                {item.title}
              </Link>
            ))}
          </div>
        </div>

        {/* Newsletter */}
        <div>
          <h3 className="font-semibold text-darkColor dark:text-white mb-4">Newsletter</h3>
          <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
            Subscribe to our newsletter to receive updates and exclusive offers.
          </p>
          <form className="space-y-3">
            <Input
              type="email"
              placeholder="Enter your email"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-200 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
            />
            <button
              type="submit"
              className="w-full bg-darkColor text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>

      {/* Bottom copyright line */}
      <div className="border-t border-gray-200 dark:border-gray-700 py-4 text-center text-xs text-gray-600 dark:text-gray-400">
        © {new Date().getFullYear()} ShopEase. All rights reserved. Made with ❤️ by Saurabh.
      </div>
    </footer>
  );
};

export default Footer;
