"use client"; // if you're using Next.js App Router

import { useState } from "react";
import { Send } from "lucide-react";

export default function ProfessionalEmail() {
  const [to, setTo] = useState("john.doe@example.com");
  const [subject, setSubject] = useState("Quarterly Performance Review: Q2 2024 Summary");
  const [body, setBody] = useState(`Dear Team,

I hope this email finds you well.

This email provides a summary of our exceptional performance in Q2 2024. Our collective efforts have led to significant achievements across all departments.

Key highlights include:
- Exceeding revenue targets by 15%
- Successful launch of "Project Phoenix"
- 20% growth in customer engagement

We will delve deeper into these metrics during our upcoming all-hands meeting. Your hard work and dedication are truly appreciated.

Best regards,

[Your Name]
Head of Operations`);

  const [loading, setLoading] = useState(false);

  // Send Email Function
  const handleSendEmail = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/sendemail", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ to, subject, body }),
      });

      const data = await res.json();
      if (res.ok) {
        alert("✅ Email sent successfully!");
      } else {
        alert("❌ Failed to send email: " + data.error);
      }
    } catch (error) {
      alert("⚠️ Something went wrong: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-transparent dark:bg-[#181818] text-gray-900 dark:text-gray-100 flex justify-center items-center px-2 sm:px-6 md:px-8 py-8 mt-10 md:mt-16">
      <div className="w-full max-w-lg sm:max-w-xl md:max-w-2xl lg:max-w-3xl xl:max-w-4xl bg-[#F1F5FF] dark:bg-[#212121] p-2 sm:p-3 md:p-10 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-center mb-4 text-gray-800 dark:text-gray-100">
          Professional Email Template
        </h2>

        {/* To */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
            To:
          </label>
          <input
            type="email"
            value={to}
            onChange={(e) => setTo(e.target.value)}
            className="w-full p-2 sm:p-2.5 rounded-lg bg-gray-50 dark:bg-[#181818] border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-sm sm:text-base"
          />
        </div>

        {/* Subject */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
            Subject:
          </label>
          <input
            type="text"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            className="w-full p-2 sm:p-2.5 rounded-lg bg-gray-50 dark:bg-[#181818] border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-sm sm:text-base"
          />
        </div>

        {/* Body */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
            Body:
          </label>
          <textarea
            rows="10"
            value={body}
            onChange={(e) => setBody(e.target.value)}
            className="w-full p-2.5 sm:p-3 rounded-lg bg-gray-50 dark:bg-[#181818] border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-sm sm:text-base"
          />
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-3 sm:gap-0 mt-6">
          <button className="w-full sm:w-auto px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg text-sm sm:text-base font-medium flex items-center justify-center gap-2 transition">
            📎 Attach Files
          </button>
          <button
            onClick={handleSendEmail}
            disabled={loading}
            className="w-full sm:w-auto px-5 sm:px-6 py-2 bg-green-600 hover:bg-green-700 disabled:bg-green-400 text-white rounded-lg text-sm sm:text-base font-medium flex items-center justify-center gap-2 transition"
          >
            <Send className="h-4 w-4 text-white" />
            {loading ? "Sending..." : "Send Email"}
          </button>
        </div>
      </div>
    </main>
  );
}
