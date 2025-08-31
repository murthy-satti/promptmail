import Link from "next/link";

// Server Component
export default async function TemplateLibrary() {
  // Fetch templates from API (server-side)
  const res = await fetch(`${process.env.NEXTAUTH_URL}/api/templates`, {
    cache: "no-store",
  });
  const data = await res.json();
  const fetchedTemplates = data.templates || [];

  // Static Blank Email
  const blankEmail = {
    title: "Blank Email",
    description: "Send fresh AI generated emails",
    image: "/blankemail.png",
    href: "/blankemail",
  };

  // Local templates (excluding blank email)
  const templates = [
    { description: "Send professional job applications to recruiters", image: "/jobemail.png" },
    { description: "Make a great impression with an introduction email", image: "/intro.png" },
    { description: "Politely inform your employer about your absence due to illness", image: "/sickemail.png" },
    { description: "Formally submit your resignation with professionalism", image: "/resignation.png" },
    { description: "Express sincere apologies clearly and respectfully", image: "/aplogy.webp" },
  ];

  return (
    <main className="bg-transparent dark:bg-[#212121] min-h-screen text-white px-2 sm:px-6 lg:px-12 py-12 mt-10">
      <h2 className="text-2xl sm:text-3xl font-bold text-center mb-5 text-gray-900 dark:text-gray-100">
        Our Email Template Library
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
        {/* Render Blank Email first */}
        <div className="rounded-xl overflow-hidden shadow-lg bg-[#F1F5FF] dark:bg-[#181818] hover:shadow-xl transition p-4">
          <img
            src={blankEmail.image}
            alt={blankEmail.title}
            className="h-48 w-full object-cover rounded-lg mb-3"
          />
          <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-100">{blankEmail.title}</h3>
          <p className="text-gray-700 dark:text-gray-300 text-sm">{blankEmail.description}</p>
          <Link
            href={blankEmail.href}
            className="inline-block mt-3 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-sm font-medium"
          >
            Use Template
          </Link>
        </div>

        {/* Render fetched templates */}
        {fetchedTemplates.map((t, idx) => (
          <div
            key={t._id}
            className="rounded-xl overflow-hidden shadow-lg bg-[#F1F5FF] dark:bg-[#181818] hover:shadow-xl transition p-4"
          >
            <img
              src={templates[idx]?.image || "/blankemail.png"}
              alt={t.title}
              className="h-48 w-full object-cover rounded-lg mb-3"
            />
            <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-100">{t.title}</h3>
            <p className="text-gray-700 dark:text-gray-300 text-sm">{templates[idx]?.description}</p>
            <Link
              href={`/${t.slug}`}
              className="inline-block mt-3 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-sm font-medium"
            >
              Use Template
            </Link>
          </div>
        ))}
      </div>
    </main>
  );
}
