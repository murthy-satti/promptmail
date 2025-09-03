
import Footer from "@/components/Footer";
import "./globals.css";
import Navbar from "@/components/Navbar";
import SessionWrapper from "@/components/session";
import { Toaster } from "react-hot-toast";
import { cookies } from "next/headers";



export const metadata = {
  title: "Prompt Mail",
  description:
    "PromptMail helps you write and send professional emails using AI. Just describe your message and let Gemini-powered AI generate and send it via Gmail securely using OAuth2.",
  keywords: [
    "PromptMail",
    "AI email generator",
    "Gemini API",
    "Nodemailer",
    "Gmail OAuth2",
    "Next.js email app",
    "auto email writer",
  ],
  authors: [{ name: "Murthy Satti" }],
  creator: "PromptMail",
  icons: {
    icon: "/PM.png",
  },
  other: {
    "google-site-verification": "AqbsYPefbsWcqycr3wB7uI_wmRVDms-0Y7Q5d_Y160E",
  },
};




export default async function RootLayout({ children }) {
  const cookieStore =await cookies();
  const theme = cookieStore.get('theme')?.value || 'light';
  const isDark = theme === 'dark';

  return (
    <html lang="en" suppressHydrationWarning data-theme={theme} className={isDark ? 'dark' : ''}>
      <body
        className="bg-gradient-to-br from-red-200 via-orange-300 to-red-100 dark:bg-gray-800 dark:bg-none"
      >
        <SessionWrapper>
          <Navbar />
         <Toaster
  position="top-center"
  toastOptions={{
    // ✅ Normal / Default toast (blue)
    style: {
      background: '#dbeafe', // Tailwind blue-100
      color: '#1e3a8a',      // Tailwind blue-900
      border: '1px solid #93c5fd', // Tailwind blue-300
      fontWeight: 500,
    },
    iconTheme: {
      primary: '#3b82f6',   // Tailwind blue-500
      secondary: '#dbeafe', // Tailwind blue-100
    },

    // ✅ Success toast (green)
    success: {
      style: {
        background: '#d1fae5',
        color: '#065f46',
        border: '1px solid #6ee7b7',
        fontWeight: 500,
      },
      iconTheme: {
        primary: '#10b981',
        secondary: '#d1fae5',
      },
    },

    // ✅ Error toast (red)
    error: {
      style: {
        background: '#fee2e2',
        color: '#991b1b',
        border: '1px solid #fca5a5',
        fontWeight: 500,
      },
      iconTheme: {
        primary: '#ef4444',
        secondary: '#fee2e2',
      },
    },
  }}
/>



          {children}
        </SessionWrapper>
        {/* <Footer/> */}
      </body>
    </html>
  )
}
