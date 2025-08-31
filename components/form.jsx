'use client'

import { useState, useEffect } from 'react';
import { Send, Sparkles } from 'lucide-react';
import { ToastContainer, toast } from 'react-toastify';
import { useSession } from 'next-auth/react';
import { ChevronDown } from "lucide-react";

export default function EmailComposer() {

  const [formData, setFormData] = useState({
    to: '',
    subject: '',
    body: ''
  });
  const [files, setFiles] = useState([])
  const [prompt, setPrompt] = useState('');

   const [open, setOpen] = useState(false);
   
  useEffect(() => {
    if (typeof window !== "undefined") {
      const isMobile = window.innerWidth < 640; // Tailwind's `sm`
      setOpen(!isMobile); // false on mobile, true on desktop
    }
  }, []);


  const [loading, setLoading] = useState(false);
  const [emailLoading, setEmailLoading] = useState(false)

  const [userData, setUserData] = useState()
  const { data: session } = useSession();

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const res = await fetch(`/api/users?email=${session?.user?.email}`);
        const data = await res.json();
        if (res.ok && data.success) {
          setUserData(data.user);
        }

      } catch (err) {
        console.error("Error fetching user:", err);
      }
    };

    if (session?.user?.email) fetchUserDetails();
  }, [session]);


  //send prompt and user data
  const handleGenerate = async () => {
    if (!prompt.trim()) return;
    setLoading(true);

    try {
      const res = await fetch('/api/gemini', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt,
          user: {
            name: userData?.name || '',
            phoneNumber: userData?.phoneNumber || '',
            skills: userData?.skills || '',
            experience: userData?.experience || ''
          }
        })
      });

      const data = await res.json();

      if (res.ok && data.text) {
        const toMatch = data.text.match(/To:\s*(.*)/i);
        const subjectMatch = data.text.match(/Subject:\s*(.*)/i);
        const bodyMatch = data.text.match(/Body:\s*([\s\S]*)/i);

        setFormData({
          to: toMatch?.[1]?.trim() || '',
          subject: subjectMatch?.[1]?.trim() || '',
          body: bodyMatch?.[1]?.trim() || ''
        });

        setPrompt('');
      } else {
        toast.info('Failed to generate email. Please try again.');
      }
    } catch (err) {
      console.error("Error:", err);
      toast.error(`Error: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };


  //send email function
  const handleSend = async () => {
    const { to, subject, body } = formData;

    if (!to || !subject || !body) {
      toast.info("Please fill in all fields before sending.");
      return;
    }

    setEmailLoading(true);
    const data = new FormData();
    data.append("to", to);
    data.append("subject", subject);
    data.append("body", body);
    files.forEach(file => data.append("files", file));


    try {
      const res = await fetch("/api/sendmail", {
        method: "POST",
        body: data,
      });


      const result = await res.json();
      if (res.ok) {
        toast.success(`Email sent successfully to ${to}`);
        setFormData({ to: '', subject: '', body: '' });
        setFiles([]);
      } else {
        toast.error(result?.error || "Failed to send email");
      }
    } catch (err) {
      console.error("Email send error:", err);
      toast.error(err.message || "Internal server error");
    } finally {
      setEmailLoading(false);
    }
  };




  return (
    <main className="grid grid-cols-1 lg:grid-cols-2 gap-5 mt-18 sm:mt-20 ">

       {/* Email Form */}
      <section>
        {/* Email Form */}
        <div className="bg-white/95 dark:bg-[#181818] backdrop-blur-sm shadow-xl rounded-2xl px-4 py-2 space-y-2">
          <h2 className="text-xl font-semibold text-purple-700 dark:text-purple-400 ">Compose Email</h2>
          <ToastContainer />
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">To :</label>
              <input
                type="email"
                placeholder="recipient@example.com"
                value={formData.to}
                onChange={(e) => setFormData({ ...formData, to: e.target.value })}
                className="w-full border border-gray-300 dark:border-gray-600 dark:bg-[#212121] dark:text-gray-100 dark:placeholder-gray-400 p-2 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Subject :</label>
              <input
                type="text"
                placeholder="Email subject"
                value={formData.subject}
                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                className="w-full border border-gray-300 dark:border-gray-600 dark:bg-[#212121] dark:text-gray-100 dark:placeholder-gray-400 p-2 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Compose Email :</label>
              <textarea
                placeholder="Your email content will appear here..."
                value={formData.body}
                onChange={(e) => setFormData({ ...formData, body: e.target.value })}
                rows={10}
                className="w-full border border-gray-300 dark:border-gray-600 dark:bg-[#212121] dark:text-gray-100 dark:placeholder-gray-400 p-2 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
              />
            </div>


            <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-4 block">
              Attach Files :
            </label>

            <div className="flex items-start justify-between flex-wrap gap-4">
              {/* 📎 Choose Files - Left */}
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

                {/* Show selected files */}
                {files.length > 0 && (
                  <ul className="mt-2 list-disc list-inside text-sm text-gray-700 dark:text-gray-300">
                    {files.map((file, index) => (
                      <li key={index}>{file.name}</li>
                    ))}
                  </ul>
                )}
              </div>

              {/* 📤 Send Email - Right */}
              <div className="flex justify-end">
                <button
                  onClick={handleSend}
                  disabled={emailLoading}
                  className={`bg-gradient-to-r from-green-600 to-emerald-600 text-white px-6 py-3 rounded-lg flex items-center justify-center space-x-2 font-medium transition-all duration-200
    ${emailLoading ? 'opacity-50 cursor-not-allowed' : 'hover:from-green-700 hover:to-emerald-700'}`}
                >
                  <Send className="h-4 w-4" />
                  <span>{emailLoading ? 'Sending...' : 'Send Email'}</span>
                </button>
              </div>
            </div>



          </div>
        </div>
      </section>

      {/* Prompt + Generate */}
      <section className="bg-gradient-to-br from-white/90 to-purple-50/90 dark:bg-none dark:bg-[#181818] backdrop-blur-sm shadow-xl rounded-2xl py-2 px-4">
        <div className="flex items-center space-x-2 mb-4">
          <Sparkles className="h-6 w-6 text-purple-600 dark:text-purple-400" />
          <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100">AI Assistant</h2>
        </div>
        <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
          Describe the email you want to create and let our AI generate it for you.
        </p>
        <textarea
          placeholder="Example: Write a professional follow-up email for a job interview I had yesterday..."
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          rows={3}
          className="w-full border border-gray-300 dark:border-gray-600 dark:bg-[#212121] dark:text-gray-100 dark:placeholder-gray-400 p-3 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none mb-4"
        />
        <button
          onClick={handleGenerate}
          disabled={loading || !prompt.trim()}
          className="w-full bg-gradient-to-r mb-5 from-purple-600 to-pink-600 dark:from-purple-700 dark:to-pink-700 text-white px-6 py-3 rounded-lg hover:from-purple-700 hover:to-pink-700 dark:hover:from-purple-800 dark:hover:to-pink-800 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2 transition-all duration-200"
        >
          {loading ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
              <span>Generating...</span>
            </>
          ) : (
            <>
              <Sparkles className="h-4 w-4" />
              <span>Generate Email with AI</span>
            </>
          )}
        </button>
        <p className="pt-2 text-sm text-black dark:text-gray-200">
          <strong className='text-purple-600 dark:text-purple-400'>Note:</strong> This website does not verify the "To" email address you enter. Please ensure that the recipient's address is correct before sending.
        </p>

       <div className="bg-white dark:bg-[#212121] border border-gray-200 dark:border-gray-700 rounded-2xl shadow-md p-5 mt-2">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center justify-between w-full text-left text-purple-700 dark:text-purple-400 text-xl font-semibold mb-2"
      >
        <span>How PromptMail Works</span>
        <ChevronDown className={`h-5 w-5 transition-transform ${open ? "rotate-180" : ""}`} />
      </button>

      {open && (
        <div className="space-y-3 text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
          <p><span className="font-medium text-gray-800 dark:text-gray-100">1. Describe your email:</span> Tell our AI what kind of email you want to send.</p>
          <p><span className="font-medium text-gray-800 dark:text-gray-100">2. AI generates content:</span> Our AI creates a professional email based on your description.</p>
          <p><span className="font-medium text-gray-800 dark:text-gray-100">3. Review and edit:</span> Make any changes to the generated email.</p>
          <p><span className="font-medium text-gray-800 dark:text-gray-100">4. Send:</span> Click send to deliver your email.</p>
          <p className="pt-2 text-sm text-black dark:text-gray-200">
            <strong className='text-purple-600 dark:text-purple-400'>Note:</strong> Complete your profile to get fully personalized emails tailored to you.
          </p>
        </div>
      )}
    </div>
      </section>

    
    </main>

  );
}