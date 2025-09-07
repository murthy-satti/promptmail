"use client";
import { useState } from "react";
import { Settings, Home, Mail, Menu, X } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b shadow-lg bg-gradient-to-r from-red-400 via-orange-300 to-red-400 border-purple-500/20 dark:bg-none dark:bg-gray-900">
      <div className="max-w-full mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo + Title */}
          <div className="flex items-center">
            <Image src="/PM.png" alt="logo" width={60} height={60} priority />
            <h1 className="ml-2 text-xl sm:text-2xl font-bold text-black dark:text-[#00F0FF]">
              PromptMail
            </h1>
          </div>

          {/* Desktop Links */}
          <nav className="hidden md:flex space-x-10 px-4">
            <Link
              href="/"
              className="flex items-center text-black text-lg font-semibold dark:text-[#00F0FF] hover:opacity-80 transition"
            >
              {/* <Home className="h-5 w-5 mr-1" /> */}
               Home
            </Link>
            <Link
              href="/about"
              className="flex items-center text-black text-lg font-semibold dark:text-[#00F0FF] hover:opacity-80 transition"
            >
              {/* <Home className="h-5 w-5 mr-1" /> */}
               About
            </Link>
            <Link
              href="/settings"
              className="flex items-center text-black text-lg font-semibold dark:text-[#00F0FF] hover:opacity-80 transition"
            >
              {/* <Settings className="h-5 w-5 mr-1" /> */}
               Settings
            </Link>
            <Link
              href="/contact"
              className="flex items-center text-black text-lg font-semibold dark:text-[#00F0FF] hover:opacity-80 transition"
            >
              {/* <Mail className="h-5 w-5 mr-1" />  */}
              Contact
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-black text-lg font-semibold dark:text-[#00F0FF]"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Dropdown */}
        {isOpen && (
          <nav className="md:hidden flex flex-col space-y-3 mt-3 pb-3 border-t border-gray-200 dark:border-gray-700">
            <Link
              href="/"
              className="flex items-center text-black text-lg font-semibold dark:text-[#00F0FF] hover:opacity-80 transition"
              onClick={() => setIsOpen(false)}
            >
              <Home className="h-5 w-5 mr-2" /> Home
            </Link>
            <Link
              href="/settings"
              className="flex items-center text-black text-lg font-semibold dark:text-[#00F0FF] hover:opacity-80 transition"
              onClick={() => setIsOpen(false)}
            >
              <Settings className="h-5 w-5 mr-2" /> Settings
            </Link>
            <Link
              href="/contact"
              className="flex items-center text-black text-lg font-semibold dark:text-[#00F0FF] hover:opacity-80 transition"
              onClick={() => setIsOpen(false)}
            >
              <Mail className="h-5 w-5 mr-2" /> Contact
            </Link>
          </nav>
        )}
      </div>
    </header>
  );
}
