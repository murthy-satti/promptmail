"use client";
import { useState } from "react";
import { Send } from "lucide-react";
import toast from 'react-hot-toast';

export default function ProfessionalEmail({ initialSubject, initialBody, templateTitle }) {
  const [to, setTo] = useState("");
  const [subject, setSubject] = useState(initialSubject || "");
  const [body, setBody] = useState(initialBody || "");
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSendEmail = async () => {
    if (!to || !subject || !body) {
      alert("Please fill all fields before sending.");
      return;
    }
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("to", to);
      formData.append("subject", subject);
      formData.append("body", body);
      files.forEach((file) => formData.append("files", file));

      const res = await fetch("/api/sendmail", { method: "POST", body: formData });
      const data = await res.json();
      if (res.ok) {
        toast.success(`Email sent successfully to ${to}`,{icon : "✅"});
        setTo(""); setSubject(""); setBody(""); setFiles([]);
      } else {
        toast.error(`Failed: ${data.error || "Unknown error"}`,{icon : "❌"});
      }
    } catch (err) {
      toast.error(`Error: ${err.message}`,{icon : "‼️"});
    } finally { setLoading(false); }
  };

  return (
    <main className="min-h-screen flex justify-center items-start md:p-8">
      <div className="w-full max-w-4xl bg-[#F1F5FF] dark:bg-gray-900 p-2 md:p-6 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 space-y-6">
        <h2 className="text-xl sm:text-2xl font-bold text-center text-gray-800 dark:text-gray-100">
          {templateTitle || "Professional Email Template"}
        </h2>

        {/* To */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-900 dark:text-gray-300 mb-1">
            To:
          </label>
          <input
            type="email"
            placeholder="recipient@example.com"
            value={to}
            onChange={(e) => setTo(e.target.value)}
            className="w-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 dark:text-gray-100 dark:placeholder-gray-400 p-2 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          />
        </div>

        {/* Subject */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-900 dark:text-gray-300 mb-1">
            Subject:
          </label>
          <input
            type="text"
            placeholder="Email subject"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            className="w-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 dark:text-gray-100 dark:placeholder-gray-400 p-2 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          />
        </div>




        {/* Body */}
        <div>
          <label className="block text-sm font-medium text-gray-900 dark:text-gray-300 mb-2">
            Body :
          </label>
          <textarea
            placeholder="Your email content will appear here..."
            value={body}
            onChange={(e) => setBody(e.target.value)}
            rows={18} // Default for mobile
            className="w-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 dark:text-gray-100 dark:placeholder-gray-400 p-2 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none md:rows-10"
          />
        </div>



        {/* Files */}
        {/* Attach Files & Send */}
        <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-4 block">
          Attach Files :
        </label>

        <div className="flex items-start justify-between flex-wrap gap-4">
          {/* 📎 Choose Files */}
          <div>
            <label
              htmlFor="file-upload"
              className="cursor-pointer px-4 py-2 border border-dashed border-purple-400 rounded-lg text-purple-600 dark:text-purple-300 bg-purple-50 dark:bg-gray-800 hover:bg-purple-100 dark:hover:bg-gray-700 text-sm transition-all"
            >
              📎 Choose Files
              <input
                id="file-upload"
                type="file"
                multiple
                onChange={(e) => setFiles(prev => [...prev, ...Array.from(e.target.files)])}
                className="hidden"
              />
            </label>

            {/* Selected files list */}
            {files.length > 0 && (
              <ul className="mt-2 list-disc list-inside text-sm text-gray-700 dark:text-gray-300">
                {files.map((file, index) => (
                  <li key={index}>{file.name}</li>
                ))}
              </ul>
            )}
          </div>

          {/* 📤 Send Email */}
          {/* 📤 Send Email */}
          <div className="flex justify-end">
            <button
              onClick={handleSendEmail}
              disabled={loading} // use `loading` here
              className={`bg-gradient-to-r from-green-600 to-emerald-600 text-white px-6 py-3 rounded-lg flex items-center justify-center space-x-2 font-medium transition-all duration-200
      ${loading ? 'opacity-50 cursor-not-allowed' : 'hover:from-green-700 hover:to-emerald-700'}`}
            >
              <Send className="h-4 w-4" />
              <span>{loading ? 'Sending...' : 'Send Email'}</span>
            </button>
          </div>

        </div>

      </div>
    </main>

  );
}
