import {  Settings } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

export default function Navbar() {
  const userEmail = "your.email@example.com";

  return (
   <header className="fixed top-0 left-0 right-0 z-50 p-2 border-b shadow-lg bg-gradient-to-r from-red-400 via-orange-300 to-red-400 border-purple-500/20 dark:bg-gray-900 dark:bg-none">
  <div className="max-w-screen mx-auto px-1 sm:px-4 lg:px-6"> 
    <div className="flex justify-between items-center h-16">

      {/* Logo + Title */}
      <div className="flex items-center ">
        {/* <Image src='/PM.png' alt='logo' width={70} height={70} priority /> */}
        <h1 className="text-xl sm:text-2xl font-bold text-[#3B0A00] dark:text-[#00F0FF]">
          PromptMail
        </h1>
      </div>

      {/* Settings */}
      <Link href="/settings" passHref>
        <div className="flex items-center space-x-2 text-[#3B0A00] dark:text-[#00F0FF] cursor-pointer hover:opacity-90 transition">
          <Settings className="h-6 w-6" />
          <span className="text-base font-medium">Settings</span>
        </div>
      </Link>

    </div>
  </div>
</header>



  );
}
