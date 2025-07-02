"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import logo from "@/assets/images/logo.png";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const isActive = (path: string) => {
    return pathname === path;
  };

  const navItems = [
    { name: "Home", path: "/" },
    { name: "How it work", path: "/how-it-works" },
    { name: "Pricing", path: "/pricing" },
    { name: "FAQ's", path: "/faq" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <nav className="bg-white border-b border-gray-100 sticky top-0 z-50 shadow-sm">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-24">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/">
              <Image
                src={logo}
                alt="Logo"
                width={82}
                height={40}
                className="w-[82px] h-[40px]"
              />
            </Link>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:block">
            <div className="ml-10 flex items-baseline space-x-8">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  href={item.path}
                  className={`px-3 py-2  transition-colors duration-200 ${
                    isActive(item.path)
                      ? "text-primary text-[16px] font-medium"
                      : "text-text-primary hover:text-gray-900 text-[16px] font-normal"
                  }`}
                >
                  {isActive(item.path) ? "• " : ""}
                  {item.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Download Button */}
          <div className="hidden lg:block">
            <button
              className="bg-black-primary text-white px-[26px] py-4 rounded-[12px] text-sm font-medium hover:bg-gray-800 transition-colors duration-200 cursor-pointer"
              onClick={() => {
                alert("Redirecting to app store...");
              }}
            >
              Download our app
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary"
            >
              <span className="sr-only">Open main menu</span>
              {!isMenuOpen ? (
                <svg
                  className="block h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              ) : (
                <svg
                  className="block h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="lg:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t border-gray-100">
            {navItems.map((item) => (
              <Link
                key={item.path}
                href={item.path}
                className={`block px-3 py-2 text-base font-medium ${
                  isActive(item.path)
                    ? "text-primary"
                    : "text-gray-600 hover:text-gray-900"
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                {isActive(item.path) ? "• " : ""}
                {item.name}
              </Link>
            ))}
            <div className="px-3 py-2">
              <button
                className="w-full bg-black text-white px-6 py-2 rounded-lg text-sm font-medium hover:bg-gray-800 transition-colors duration-200"
                onClick={() => {
                  alert("Redirecting to app store...");
                  setIsMenuOpen(false);
                }}
              >
                Download our app
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
