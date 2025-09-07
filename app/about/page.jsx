
import Image from "next/image";

export default function AboutPage() {
  return (
    <main className="min-h-screen  text-gray-800 dark:text-gray-200 py-16 px-2 md:px-4 xl:px-6">
      <div className="max-w-7xl mx-auto space-y-6 md:space-y-12">
        
        {/* Hero Section */}
        <section className="text-center space-y-3 md:space-y-6 mt-2 md:mt-4">
        
          <h1 className="text-3xl sm:text-5xl font-semisemibold text-black dark:text-[#00F0FF]">
            About PromptMail
          </h1>
          <p className="text-lg max-w-2xl mx-auto text-gray-900 dark:text-gray-300 text-left md:text-center">
            PromptMail is your AI-powered assistant for creating professional, 
            personalized emails in seconds. Whether it’s job applications, 
            introductions, or formal requests — we’ve got you covered.
          </p>
        </section>

        {/* Mission Section */}
        <section className="grid md:grid-cols-2 gap-10 items-center">
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold text-black dark:text-[#00F0FF]">
              Our Mission
            </h2>
            <p className="leading-relaxed text-gray-700 dark:text-gray-300">
              At PromptMail, we believe emails should be simple, smart, 
              and stress-free. Our mission is to empower professionals, 
              students, and job seekers to communicate with confidence 
              through AI-generated templates and personalization.
            </p>
          </div>
          <Image
            src="/about.webp"
            alt="Mission"
            width={500}
            height={350}
            className="rounded-xl shadow-lg"
          />
        </section>

        {/* Features Section */}
        <section className="space-y-6">
          <h2 className="text-2xl font-semibold text-center text-black dark:text-[#00F0FF]">
            Why Choose PromptMail?
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-2 md:gap-4 xl:gap-6">
            {[
              { title: "AI-Powered", desc: "Leverages AI to craft professional, context-aware emails." },
              { title: "Customizable", desc: "Easily personalize tone, content, and format for your needs." },
              { title: "Time-Saving", desc: "Generate ready-to-send emails in seconds." },
              { title: "Professional Templates", desc: "Choose from curated templates for various scenarios." },
              { title: "Dark/Light Mode", desc: "Comfortable reading experience anytime." },
              { title: "Attachments Support", desc: "Send files with your emails seamlessly." },
            ].map((f, i) => (
              <div
                key={i}
                className="p-6 rounded-xl shadow-md bg-[#F1F5FF] dark:bg-gray-900 border border-gray-200 dark:border-gray-700 hover:shadow-lg transition"
              >
                <h3 className="text-lg font-semisemibold mb-2">{f.title}</h3>
                <p className="text-sm text-gray-900 dark:text-gray-400">{f.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Contact CTA */}
        <section className="text-center space-y-4">
          <h2 className="text-2xl font-semibold text-black dark:text-[#00F0FF]">
            Get in Touch
          </h2>
          <p className="text-gray-700 dark:text-gray-300">
            Have questions, feedback, or suggestions? We’d love to hear from you.
          </p>
          <a
            href="/contact"
            className="inline-block mt-3 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition"
          >
            Contact Us
          </a>
        </section>
      </div>
    </main>
  );
}
