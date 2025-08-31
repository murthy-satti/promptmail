import Link from "next/link";

export default function TemplateLibrary() {
  const templates = [
    {
      title: "Blank Email",
      description: "Send fresh AI generated emails",
      image: "/blankemail.png", // replace with actual image
      link: "/blankemail",
    },
    {
      title: "Job Application Email",
      description: "Send professional job applications to recruiters",
      image: "/jobemail.png",
      link: "/template-email",
    },
    {
      title: "Intro Email",
      description: "Make a great  impression with a introduction email",
      image: "/intro.png",
      link: "/template-email",
    },
    {
      title: "Sick Leave Email",
      description: "Politely inform your employer about your absence due to illness",
      image: "/sickemail.png",
      link: "/template-email",
    },
    {
      title: "Resignation Email",
      description: "Formally submit your resignation with grace and professionalism",
      image: "/resignation.png",
      link: "/template-email",
    },
    {
      title: "Apology Email",
      description: "Express sincere apologies in a clear and respectful manner",
      image: "/aplogy.webp",
      link: "/template-email",
    },
  ];

  return (
    <main className="bg-transparent dark:bg-[#181818] min-h-screen text-white px-2 sm:px-6 lg:px-12 py-12 mt-10">
    <h2 className="text-2xl sm:text-3xl font-bold text-center mb-5 text-gray-900 dark:text-gray-100">
      Our Email Template Library
    </h2>
  
    <div className="grid grid-cols-1 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3  gap-6 max-w-7xl mx-auto">
      {templates.map((t, idx) => (
        <div
          key={idx}
          className="rounded-xl overflow-hidden shadow-lg bg-[#F1F5FF] dark:bg-[#212121] hover:shadow-xl transition"
        >
          <img src={t.image} alt={t.title} className="h-48 w-full object-cover" />
          <div className="px-4 py-3 space-y-2">
            <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-100">{t.title}</h3>
            <p className="text-gray-700 dark:text-gray-300 text-sm">{t.description}</p>
            <Link
              href={t.link}
              className="inline-block mt-3 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-sm font-medium mb-2"
            >
              Use Template
            </Link>
          </div>
        </div>
      ))}
    </div>
  </main>
  
  );
}
