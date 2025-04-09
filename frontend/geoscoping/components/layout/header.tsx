"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";

export default function Header() {
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [visible, setVisible] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.scrollY;
      setVisible(prevScrollPos > currentScrollPos || currentScrollPos < 10);
      setPrevScrollPos(currentScrollPos);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [prevScrollPos]);

  // Close mobile menu when changing pages
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  return (
    <header
      className={`
        bg-[#050505] text-[#FEFFFE] fixed w-full z-50 transition-transform duration-300
        ${visible ? "translate-y-0" : "-translate-y-full shadow-lg"}
      `}
    >
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <Link href="/" className="text-2xl font-bold text-[#FEFFFE]">
            Geoscoping
          </Link>
          <span className="text-xs bg-[#1C448E] px-2 py-1 rounded text-[#FEFFFE]">
            Beta
          </span>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:block">
          <ul className="flex space-x-6">
            <li>
              <Link
                href="/events"
                className={`transition-colors ${
                  pathname === "/events"
                    ? "text-[#9EA677] font-medium border-b-2 border-[#9EA677]"
                    : "hover:text-[#9EA677]"
                }`}
              >
                Events
              </Link>
            </li>
            <li>
              <Link
                href="/data"
                className={`transition-colors ${
                  pathname === "/data"
                    ? "text-[#9EA677] font-medium border-b-2 border-[#9EA677]"
                    : "hover:text-[#9EA677]"
                }`}
              >
                Data
              </Link>
            </li>
            <li>
              <Link
                href="/about"
                className={`transition-colors ${
                  pathname === "/about"
                    ? "text-[#9EA677] font-medium border-b-2 border-[#9EA677]"
                    : "hover:text-[#9EA677]"
                }`}
              >
                About
              </Link>
            </li>
          </ul>
        </nav>

        {/* Mobile Hamburger Button */}
        <button
          className="md:hidden flex flex-col space-y-1.5 p-2"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          <span
            className={`block w-6 h-0.5 bg-[#FEFFFE] transition-transform duration-300 ease-in-out ${
              mobileMenuOpen ? "rotate-45 translate-y-2" : ""
            }`}
          ></span>
          <span
            className={`block w-6 h-0.5 bg-[#FEFFFE] transition-opacity duration-300 ease-in-out ${
              mobileMenuOpen ? "opacity-0" : "opacity-100"
            }`}
          ></span>
          <span
            className={`block w-6 h-0.5 bg-[#FEFFFE] transition-transform duration-300 ease-in-out ${
              mobileMenuOpen ? "-rotate-45 -translate-y-2" : ""
            }`}
          ></span>
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          mobileMenuOpen
            ? "max-h-60 opacity-100 border-t border-gray-800"
            : "max-h-0 opacity-0"
        }`}
      >
        <nav className="container mx-auto px-4 py-2">
          <ul className="flex flex-col space-y-4 pb-4">
            <li>
              <Link
                href="/events"
                className={`block py-2 transition-colors ${
                  pathname === "/events"
                    ? "text-[#9EA677] font-medium border-l-4 pl-2 border-[#9EA677]"
                    : "hover:text-[#9EA677]"
                }`}
              >
                Events
              </Link>
            </li>
            <li>
              <Link
                href="/data"
                className={`block py-2 transition-colors ${
                  pathname === "/data"
                    ? "text-[#9EA677] font-medium border-l-4 pl-2 border-[#9EA677]"
                    : "hover:text-[#9EA677]"
                }`}
              >
                Data
              </Link>
            </li>
            <li>
              <Link
                href="/about"
                className={`block py-2 transition-colors ${
                  pathname === "/about"
                    ? "text-[#9EA677] font-medium border-l-4 pl-2 border-[#9EA677]"
                    : "hover:text-[#9EA677]"
                }`}
              >
                About
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
