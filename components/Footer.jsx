import React from 'react';
import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="w-full  border-gray-200 dark:border-gray-700  py-4 px-4 text-center text-sm text-gray-700 dark:text-gray-300">
      <div className="flex justify-center gap-6 mb-3">
        <Link
          href="/privacypolicy"
          className="transition text-md md:text:lg hover:underline hover:text-blue-600 dark:hover:text-teal-400 font-medium"
        >
          Privacy Policy
        </Link>
        <Link
          href="/terms"
          className="transition text-md md:text:lg hover:underline hover:text-blue-600 dark:hover:text-teal-400 font-medium"
        >
          Terms of Conditions
        </Link>
      </div>
      <p className="text-xs md:text:sm text-gray-800 dark:text-gray-300">
        &copy; {new Date().getFullYear()} <span className="font-semibold">PromptMail</span>. All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;
