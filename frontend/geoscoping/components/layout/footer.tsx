"use client"; // Ensure this component is a client component in Next.js

import Link from "next/link";
import { useState } from "react";

export default function Footer() {
  const [emailInput, setEmailInput] = useState("");
  const [subscribeStatus, setSubscribeStatus] = useState<
    null | "success" | "error"
  >(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate API call
    setTimeout(() => {
      if (emailInput.includes("@") && emailInput.includes(".")) {
        setSubscribeStatus("success");
        setEmailInput("");
      } else {
        setSubscribeStatus("error");
      }
    }, 500);
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <footer className="bg-[#050505] text-[#FEFFFE] relative">
      {/* Back to top button */}
      <button
        onClick={scrollToTop}
        className="absolute -top-5 right-8 bg-[#1C448E] hover:bg-[#9EA677] text-white rounded-full p-2 transform transition-all duration-300 hover:scale-110 shadow-lg"
        aria-label="Back to top"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="18"
          height="18"
          fill="currentColor"
          viewBox="0 0 16 16"
        >
          <path
            fillRule="evenodd"
            d="M8 12a.5.5 0 0 0 .5-.5V5.707l2.146 2.147a.5.5 0 0 0 .708-.708l-3-3a.5.5 0 0 0-.708 0l-3 3a.5.5 0 1 0 .708.708L7.5 5.707V11.5a.5.5 0 0 0 .5.5z"
          />
        </svg>
      </button>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4 text-[#9EA677] border-b border-[#1C448E] pb-2 inline-block">
              Geoscoping
            </h3>
            <p className="text-[#FEFFFE]/80 mb-4 text-sm">
              Worldwide natural disaster tracker. Enabling users to view and
              explore geographical events.
            </p>

            {/* Newsletter Signup */}
            <div className="mb-3">
              <h4 className="text-xs font-medium text-[#FEFFFE]/90 mb-2">
                Stay Up to Date
              </h4>
              <form onSubmit={handleSubmit} className="flex">
                <input
                  type="email"
                  value={emailInput}
                  onChange={(e) => setEmailInput(e.target.value)}
                  placeholder="Your email"
                  className="bg-[#050505] border border-[#1C448E] rounded-l px-2 py-1 text-xs w-full focus:outline-none focus:border-[#9EA677] transition-colors"
                  aria-label="Email for newsletter"
                />
                <button
                  type="submit"
                  className="bg-[#1C448E] hover:bg-[#9EA677] text-white rounded-r px-2 py-1 text-xs transition-colors"
                >
                  Subscribe
                </button>
              </form>
              {subscribeStatus === "success" && (
                <p className="text-[#9EA677] text-xs mt-1">
                  Thank you for subscribing!
                </p>
              )}
              {subscribeStatus === "error" && (
                <p className="text-red-400 text-xs mt-1">
                  Please enter a valid email.
                </p>
              )}
            </div>

            <p className="text-[#FEFFFE]/60 text-xs">
              &copy; {new Date().getFullYear()} Geoscoping
              <span className="ml-2 bg-[#1C448E] px-2 py-0.5 rounded text-[#FEFFFE] text-xs">
                Beta
              </span>
            </p>

            {/* Social Media Links */}
            <div className="flex space-x-4 mt-4">
              <a
                href="https://github.com/EthanRule/Geoscoping"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="text-[#FEFFFE]/70 hover:text-[#9EA677] transition-all transform hover:scale-110"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  fill="currentColor"
                  viewBox="0 0 16 16"
                >
                  <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z" />
                </svg>
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4 text-[#9EA677] border-b border-[#1C448E] pb-2 inline-block">
              Navigation
            </h3>
            <ul className="space-y-3 text-[#FEFFFE]/80 text-sm">
              <li>
                <Link
                  href="/events"
                  className="group hover:text-[#9EA677] transition-colors hover:pl-1 duration-200 flex items-center"
                >
                  <span className="opacity-0 group-hover:opacity-100 mr-1 transition-opacity">
                    ›
                  </span>{" "}
                  Events
                </Link>
              </li>
              <li>
                <Link
                  href="/data"
                  className="group hover:text-[#9EA677] transition-colors hover:pl-1 duration-200 flex items-center"
                >
                  <span className="opacity-0 group-hover:opacity-100 mr-1 transition-opacity">
                    ›
                  </span>{" "}
                  Data
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="group hover:text-[#9EA677] transition-colors hover:pl-1 duration-200 flex items-center"
                >
                  <span className="opacity-0 group-hover:opacity-100 mr-1 transition-opacity">
                    ›
                  </span>{" "}
                  About
                </Link>
              </li>
            </ul>
          </div>

          <div className="sm:col-span-2 md:col-span-1">
            <h3 className="text-lg font-semibold mb-4 text-[#9EA677] border-b border-[#1C448E] pb-2 inline-block">
              Resources
            </h3>
            <ul className="space-y-3 text-[#FEFFFE]/80 text-sm">
              <li>
                <Link
                  href="/sources"
                  className="group hover:text-[#9EA677] transition-colors hover:pl-1 duration-200 flex items-center"
                >
                  <span className="opacity-0 group-hover:opacity-100 mr-1 transition-opacity">
                    ›
                  </span>{" "}
                  Data Sources
                </Link>
              </li>
              <li>
                <a
                  href="https://github.com/EthanRule/Geoscoping"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group hover:text-[#9EA677] transition-colors hover:pl-1 duration-200 flex items-center"
                >
                  <span className="opacity-0 group-hover:opacity-100 mr-1 transition-opacity">
                    ›
                  </span>{" "}
                  GitHub Repository
                </a>
              </li>
              <li>
                <Link
                  href="/feedback"
                  className="group hover:text-[#9EA677] transition-colors hover:pl-1 duration-200 flex items-center"
                >
                  <span className="opacity-0 group-hover:opacity-100 mr-1 transition-opacity">
                    ›
                  </span>{" "}
                  Send Feedback
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Legal Links */}
        <div className="border-t border-[#1C448E]/30 mt-8 pt-4 text-center">
          <div className="text-[#FEFFFE]/40 text-xs mb-2 flex justify-center items-center flex-wrap gap-2">
            <span>
              Designed for end user global disaster information monitoring.
            </span>
            <span className="bg-[#1C448E]/20 px-2 py-1 rounded text-[#FEFFFE]/70 text-xs">
              Last data update: {"None"}
              {/* Last data update: {new Date().toLocaleDateString()} */}
            </span>
          </div>
          <div className="flex justify-center space-x-4 text-[#FEFFFE]/60 text-xs">
            <Link
              href="/privacy"
              className="hover:text-[#9EA677] transition-colors"
            >
              Privacy Policy
            </Link>
            <span>|</span>
            <Link
              href="/terms"
              className="hover:text-[#9EA677] transition-colors"
            >
              Terms of Use
            </Link>
            <span>|</span>
            <Link
              href="/accessibility"
              className="hover:text-[#9EA677] transition-colors"
            >
              Accessibility
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
