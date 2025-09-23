"use client";

import { useState, useEffect, use } from "react";
import { useSession } from "next-auth/react";
import NotFound from "../not-found";
import toast from "react-hot-toast";
import { Send } from "lucide-react";

export default function TemplatePage({ params }) {
   const { slug } = use(params); // no await
  const { data: session } = useSession();
  const [template, setTemplate] = useState(null);
  const [notFound, setNotFound] = useState(false);

  const [to, setTo] = useState("");
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!session?.user?.email) return;

    const fetchUser = async () => {
      try {
        const res = await fetch(
          `/api/combinedRoute?email=${session.user.email}`,
          { cache: "no-store" }
        );
        if (!res.ok) throw new Error("Failed to fetch user");
        const data = await res.json();

        const user = data?.user;
        if (!user || !user.templates) {
          setNotFound(true);
          return;
        }

        const foundTemplate = user.templates.find((t) => t.slug === slug);
        if (!foundTemplate) {
          setNotFound(true);
          return;
        }

        setTemplate(foundTemplate);
        setSubject(foundTemplate.subject || "");
        setBody(foundTemplate.body || "");
      } catch (err) {
        console.error(err);
        setNotFound(true);
      }
    };

    fetchUser();
  }, [session, slug]);

  if (notFound) return <NotFound />;
  if (!template) return <p>Loading...</p>;

  const handleSendEmail = async () => {
    if (!to || !subject || !body) {
      toast.error("Please fill all fields before sending.");
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
        toast.success(`Email sent successfully to ${to}`, { icon: "✅" });
        setTo("");
        setSubject(template.subject || "");
        setBody(template.body || "");
        setFiles([]);
      } else {
        toast.error(`Failed: ${data.error || "Unknown error"}`, { icon: "❌" });
      }
    } catch (err) {
      toast.error(`Error: ${err.message}`, { icon: "‼️" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen flex justify-center items-center mt-18 md:mt-10">
      <div className="w-full max-w-4xl bg-[#F1F5FF] dark:bg-gray-900 p-1 md:p-6 sm:rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 space-y-6">
        <h2 className="text-xl sm:text-2xl font-bold text-center text-gray-800 dark:text-gray-100">
          {template.title}
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
            Body:
          </label>
          <textarea
            placeholder="Your email content..."
            value={body}
            onChange={(e) => setBody(e.target.value)}
            rows={14}
            className="w-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 dark:text-gray-100 dark:placeholder-gray-400 p-2 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
          />
        </div>

        {/* Files & Send */}
        <div className="flex items-start justify-between flex-wrap gap-4">
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
                onChange={(e) => setFiles((prev) => [...prev, ...Array.from(e.target.files)])}
                className="hidden"
              />
            </label>

            {files.length > 0 && (
              <ul className="mt-2 list-disc list-inside text-sm text-gray-700 dark:text-gray-300">
                {files.map((file, index) => (
                  <li key={index}>{file.name}</li>
                ))}
              </ul>
            )}
          </div>

          <div className="flex justify-end">
            <button
              onClick={handleSendEmail}
              disabled={loading}
              className={`bg-gradient-to-r from-green-600 to-emerald-600 text-white px-6 py-3 rounded-lg flex items-center justify-center space-x-2 font-medium transition-all duration-200
                ${loading ? "opacity-50 cursor-not-allowed" : "hover:from-green-700 hover:to-emerald-700"}`}
            >
              <Send className="h-4 w-4" />
              <span>{loading ? "Sending..." : "Send Email"}</span>
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
