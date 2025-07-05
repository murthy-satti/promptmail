
import "./globals.css";
import Navbar from "@/components/Navbar";
import SessionWrapper from "@/components/session";


export const metadata = {
  title: "Prompt Mail",
  description: "PromptMail helps you write and send professional emails using AI. Just describe your message and let Gemini-powered AI generate and send it via Gmail securely using OAuth2.",
  keywords: ["PromptMail", "AI email generator", "Gemini API", "Nodemailer", "Gmail OAuth2", "Next.js email app", "auto email writer"],
  authors: [{ name: "Murthy Satti" }],
  creator: "PromptMail",
  icons: {
    icon: "/PM.png", // ✅ place your logo as favicon.ico in /public
  },
};



export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className="bg-gradient-to-br from-red-200 via-orange-300 to-red-100 dark:bg-gray-800 dark:bg-none"
      >
        <SessionWrapper>
          <Navbar />

          {children}
        </SessionWrapper>
      </body>
    </html>
  )
}
