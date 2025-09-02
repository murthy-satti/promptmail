'use client'

import React, { useState, useEffect } from 'react';
import {
  User,
  ChevronDown,
  FileText,
  LogOut,
  Settings,
  X, Sun, Moon
} from 'lucide-react';
import Link from 'next/link';
import { signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { useSession } from "next-auth/react";


const SettingsPage = () => {
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [termsDropdownOpen, setTermsDropdownOpen] = useState(false);
  const [signOutModalOpen, setSignOutModalOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const router = useRouter();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phoneNumber: '',
    skills: '',
    experience: '',
  })

  const { data: session } = useSession();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch(`/api/users?email=${session?.user?.email}`);
        const data = await res.json();

        if (res.ok && data.success) {
          setFormData({
            name: data.user.name || '',
            email: data.user.email || '',
            phoneNumber: data.user.phoneNumber || '',
            skills: data.user.skills?.join(', ') || '',
            experience: data.user.experience || '',
          });
        }
      } catch (err) {
        console.error('Failed to fetch user:', err);
      }
    };

    if (session?.user?.email) fetchUser();
  }, [session]);

  //theme toggle
  const toggleTheme = async () => {
    const next = isDarkMode ? 'light' : 'dark';
    // Apply theme to document
    document.documentElement.setAttribute('data-theme', next);
    document.documentElement.classList.toggle('dark', next === 'dark');
    setIsDarkMode(next === 'dark');
  };

  //edit req
  const handleChange = (field) => (e) => {
    setFormData({ ...formData, [field]: e.target.value });
  };

  const handleUpdate = async () => {
    try {
      const res = await fetch('/api/users', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          skills: formData.skills.split(',').map(s => s.trim()),
        }),
      });

      const data = await res.json();
      if (res.ok) {
      toast.success("Profile updated successfully", {
  icon: "✅",
});

      } else {
        toast.error(`update failed bacause of ${data.message}`, {
  icon: "❌",
})
      }
    } catch (err) {
      toast.error("Failed to update user data", {
  icon: "❌",
})
      console.error('Update error:', err);
    }
  };

  const handleSignOut = async () => {
    setSignOutModalOpen(false);
    await signOut({ redirect: false });
    router.push('/signin');
  };

  return (
    <main className="min-h-screen transition-colors mt-18 duration-200">
      <div className="max-w-4xl mx-auto p-4 sm:p-6">

        {/* Header */}
        <div className="mb-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex flex-col items-center sm:items-start text-center sm:text-left">
            <h1 className="text-2xl sm:text-3xl font-bold flex items-center gap-2 text-black dark:text-white">
              <Settings className="w-6 h-6 sm:w-8 sm:h-8" />
              Settings
            </h1>
            <p className="mt-2 text-gray-700 dark:text-gray-200 text-sm sm:text-base">
              Manage your account settings and preferences
            </p>
          </div>

          <nav>
            <Link
              href="/"
              className="inline-block bg-gradient-to-r from-blue-600 to-teal-600 dark:from-blue-800 dark:to-teal-700 
    text-white px-4 py-2 rounded-lg text-sm font-medium hover:from-purple-700 hover:to-pink-700 dark:hover:from-purple-800 dark:hover:to-pink-800 transition self-start sm:self-auto"
            >
              Go to Home
            </Link>
          </nav>
        </div>

        {/* Settings Content */}
        <div className="grid gap-4 ">

         

          {/* Profile Section */}
          <section
            className="p-4 sm:p-6 rounded-xl border bg-white border-gray-200 dark:bg-gray-900 dark:border-gray-700 shadow-sm dark:shadow-gray-900/20"

          >
            <header className="flex items-center justify-between">
              <div className="flex items-center gap-3 flex-1">
                <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg">
                  <User className="w-5 h-5 text-green-600 dark:text-green-400" />
                </div>
                <div className="flex-1 min-w-0">
                  <h2 id="profile-section" className="font-semibold text-gray-900 dark:text-gray-100 text-sm sm:text-base">Profile Information</h2>
                  <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300">
                    View and edit your profile details
                  </p>
                </div>
              </div>
              <button
                onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                className="cursor-pointer flex items-center gap-2 px-3 sm:px-4 py-2 rounded-lg transition-all duration-200 hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100 ml-2"
                aria-expanded={profileDropdownOpen}
                aria-controls="profile-form"
              >
                <span className="text-xs sm:text-sm font-medium hidden sm:inline ">View Profile</span>
                <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${profileDropdownOpen ? 'rotate-180' : ''}`} />
              </button>
            </header>

            {profileDropdownOpen && (
              <form
                id="profile-form"
                className="mt-4 p-3 sm:p-4 rounded-lg bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700"
                onSubmit={(e) => e.preventDefault()}
              >
                <div className="space-y-4">
                  {/* Full Name */}
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
                    <label
                      htmlFor="name"
                      className="text-sm font-medium text-gray-800 dark:text-gray-200 sm:w-26"
                    >
                      Full Name:
                    </label>
                    <input
                      id="name"
                      type="text"
                      placeholder="eg: John Doe"
                      value={formData.name}
                      onChange={handleChange('name')}
                      className="flex-1 p-2 border border-purple-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 dark:bg-gray-900 dark:text-white text-sm"
                    />
                  </div>

                  {/* Email */}
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
                    <label
                      htmlFor="email"
                      className="text-sm font-medium text-gray-800 dark:text-gray-200 sm:w-26"
                    >
                      Email:
                    </label>
                    <input
                      id="email"
                      type="email"
                      placeholder="eg: john@example.com"
                      value={formData.email}
                      readOnly
                      className="flex-1 p-2 bg-[#d3dbe8] border border-purple-300 rounded-lg focus:outline-none  dark:bg-[#444d5c] dark:text-white text-sm"
                    />
                  </div>

                  {/* Phone Number */}
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
                    <label
                      htmlFor="phone"
                      className="text-sm font-medium text-gray-800 dark:text-gray-200 sm:w-26"
                    >
                      Phone Number:
                    </label>
                    <input
                      id="phone"
                      type="tel"
                      placeholder="eg: +91-9898989898"
                      value={formData.phoneNumber}
                      onChange={handleChange('phoneNumber')}
                      className="flex-1 p-2 border border-purple-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 dark:bg-gray-900 dark:text-white text-sm"
                    />
                  </div>

                  {/* Skills */}
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
                    <label
                      htmlFor="skills"
                      className="text-sm font-medium text-gray-800 dark:text-gray-200 sm:w-26"
                    >
                      Skills:
                    </label>
                    <input
                      id="skills"
                      type="text"
                      placeholder="eg: React, Node.js, MongoDB"
                      value={formData.skills}
                      onChange={handleChange('skills')}
                      className="flex-1 p-2 border border-purple-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 dark:bg-gray-900 dark:text-white text-sm"
                    />
                  </div>

                  {/* Experience */}
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
                    <label
                      htmlFor="experience"
                      className="text-sm font-medium text-gray-800 dark:text-gray-200 sm:w-26"
                    >
                      Experience:
                    </label>
                    <input
                      id="experience"
                      type="text"
                      placeholder="eg: 2 years as a full stack developer"
                      value={formData.experience}
                      onChange={handleChange('experience')}
                      className="flex-1 p-2 border border-purple-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 dark:bg-gray-900 dark:text-white text-sm"
                    />
                  </div>

                  {/* Update Button */}
                  <footer className="flex justify-end pt-2 gap-5">
                    <button
                      type="button"
                      onClick={handleUpdate}
                      className="text-sm text-black font-semibold bg-green-400 py-2 px-4 sm:px-5 rounded-lg hover:text-white hover:bg-green-500 cursor-pointer"
                    >
                      Update
                    </button>
                  </footer>
                </div>
              </form>
            )}
          </section>

          {/* Terms and Conditions Section */}
          <section
            className="p-4 sm:p-6 rounded-xl border bg-white border-gray-200 dark:bg-gray-900 dark:border-gray-700 shadow-sm dark:shadow-gray-900/20"

          >
            <header className="flex items-center justify-between">
              <div className="flex items-center gap-3 flex-1">
                <div className="p-2 bg-indigo-100 dark:bg-indigo-900/30 rounded-lg">
                  <FileText className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                </div>
                <div className="flex-1 min-w-0">
                  <h2 id="terms-section" className="font-semibold text-gray-900 dark:text-gray-100 text-sm sm:text-base">Terms and Conditions</h2>
                  <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300">
                    Review our terms of service and privacy policy
                  </p>
                </div>
              </div>
              <button
                onClick={() => setTermsDropdownOpen(!termsDropdownOpen)}
                className="flex items-center gap-2 px-3 sm:px-4 py-2 rounded-lg transition-all duration-200 hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100 ml-2 cursor-pointer"
                aria-expanded={termsDropdownOpen}
                aria-controls="terms-content"
              >
                <span className="text-xs sm:text-sm font-medium hidden sm:inline">View Terms</span>
                <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${termsDropdownOpen ? 'rotate-180' : ''}`} />
              </button>
            </header>

            {termsDropdownOpen && (
              <div
                id="terms-content"
                className="mt-4 p-3 sm:p-4 rounded-lg dark:border-gray-700"
              >
                <div className="space-y-3 sm:space-y-4">
                  <article className="p-3 sm:p-4 rounded-lg bg-white dark:bg-gray-900 border border-gray-500 dark:border-gray-400">
                    <h3 className="font-medium text-gray-900 dark:text-gray-100 mb-2 text-sm sm:text-base">Terms of Service</h3>
                    <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                      By accessing or using PromptMail, you agree to comply with and be bound by these terms. You must not misuse our platform or attempt unauthorized access.
                      <Link
                        href="/terms"
                        className="underline text-purple-600 dark:text-purple-300 hover:text-purple-800 dark:hover:text-purple-200 transition-colors"
                      >
                        Learn more
                      </Link>
                    </p>

                  </article>
                  <article className="p-3 sm:p-4 rounded-lg bg-white dark:bg-gray-900 border border-gray-500 dark:border-gray-400">
                    <h3 className="font-medium text-gray-900 dark:text-gray-100 mb-2 text-sm sm:text-base">Privacy Policy</h3>
                    <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                      We collect only the necessary information to personalize your experience and never share it with third parties without consent. All data is stored securely, and you can request its removal anytime.{" "}
                      <Link
                        href="/privacypolicy"
                        className="underline text-purple-600 dark:text-purple-300 hover:text-purple-800 dark:hover:text-purple-200 transition-colors"
                      >
                        Learn more
                      </Link>
                      .
                    </p>
                  </article>

                  <article className="p-3 sm:p-4 rounded-lg bg-white dark:bg-gray-900 border border-gray-500 dark:border-gray-400">
                    <h3 className="font-medium text-gray-900 dark:text-gray-100 mb-2 text-sm sm:text-base">Cookie Policy</h3>
                    <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                      We use cookies to analyze traffic, remember preferences, and improve our service. By using PromptMail, you consent to our use of cookies in accordance with this policy.
                    </p>
                  </article>
                </div>
              </div>
            )}
          </section>

           {/* Theme Toggle Section */}

          <section className="p-6 rounded-lg border bg-white border-gray-200 dark:bg-gray-900 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
                  <Sun className="w-5 h-5 text-orange-800 dark:hidden" />
                  <Moon className="w-5 h-5 text-white hidden dark:inline" />
                </div>
                <div>
                  <h2 className="font-semibold text-gray-900 dark:text-white">Theme</h2>
                  <p className="text-xs md:text-sm text-gray-600 dark:text-gray-300">
                    Switch between light and dark mode
                  </p>
                </div>
              </div>
              <button
                onClick={toggleTheme}
                aria-label="Toggle theme"
                className="relative w-12 h-6 rounded-full transition-colors duration-200 bg-gray-300 dark:bg-blue-600 cursor-pointer"
              >
                <div
                  className="absolute w-5 h-5 bg-white rounded-full top-0.5 transition-transform duration-200 translate-x-0.5 dark:translate-x-6"
                />
              </button>

            </div>
          </section>

          {/* Sign Out Section */}
          <section
            className="p-4 sm:p-6 rounded-xl border bg-white border-gray-200 dark:bg-gray-900 dark:border-gray-700 shadow-sm dark:shadow-gray-900/20"

          >
            <header className="flex items-center justify-between">
              <div className="flex items-center gap-3 flex-1">
                <div className="p-2 bg-red-100 dark:bg-red-900/30 rounded-lg">
                  <LogOut className="w-5 h-5 text-red-600 dark:text-red-400" />
                </div>
                <div className="flex-1 min-w-0">
                  <h2 id="signout-section" className="font-semibold text-gray-900 dark:text-gray-100 text-sm sm:text-base">Sign Out</h2>
                  <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300">
                    Sign out of your account
                  </p>
                </div>
              </div>
              <button
                onClick={() => setSignOutModalOpen(true)}
                className="px-3 sm:px-4 py-2 bg-red-600 hover:bg-red-700 dark:bg-red-600 dark:hover:bg-red-700 text-white rounded-lg transition-colors duration-200 font-medium shadow-sm text-sm ml-2 cursor-pointer"
              >
                Sign Out
              </button>

            </header>
          </section>
        </div>

        {/* Sign Out Confirmation Modal */}
        {signOutModalOpen && (
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50"
            role="dialog"
            aria-modal="true"

          >
            <div className="rounded-xl p-4 sm:p-6 max-w-md w-full bg-white dark:bg-gray-900 shadow-2xl border border-gray-200 dark:border-gray-700">
              <header className="flex items-center justify-between mb-4">
                <h3 id="modal-title" className="text-base sm:text-lg font-semibold text-gray-900 dark:text-gray-100">Confirm Sign Out</h3>
                <button
                  onClick={() => setSignOutModalOpen(false)}
                  className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200 cursor-pointer"
                  aria-label="Close modal"
                >
                  <X className="w-5 h-5 text-gray-500 dark:text-gray-400 " />
                </button>
              </header>
              <main>
                <p className="mb-6 text-gray-600 dark:text-gray-300 text-sm sm:text-base">
                  Are you sure you want to sign out? You'll need to sign in again to access your account.
                </p>
              </main>
              <footer className="flex gap-3">
                <button
                  onClick={() => setSignOutModalOpen(false)}
                  className="cursor-pointer flex-1 px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300 transition-colors duration-200 font-medium text-sm"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSignOut}
                  className="cursor-pointer flex-1 px-4 py-2 bg-red-500 hover:bg-red-600 dark:bg-red-600 dark:hover:bg-red-700 text-white rounded-lg transition-colors duration-200 font-medium shadow-sm text-sm"
                >
                  Sign Out
                </button>
              </footer>
            </div>
          </div>
        )}
      </div>
    </main>
  );
};

export default SettingsPage;