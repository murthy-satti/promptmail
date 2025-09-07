import Link from "next/link";

// Server Component
export default async function TemplateLibrary() {
  // Fetch templates from API (server-side)
  const res = await fetch(`${process.env.NEXTAUTH_URL}/api/templates`, {
    cache: "no-store",
  });
  const data = await res.json();
  let fetchedTemplates = data.templates || [];
    // ✅ Sort alphabetically by title
  fetchedTemplates = fetchedTemplates.sort((a, b) =>
    a.title.localeCompare(b.title)
  );

  // Static Blank Email
  const blankEmail = {
    title: "Blank Email",
    // description: "Send fresh AI generated emails",
    image: "/blankemail.png",
    href: "/blankemail",
  };

  // Local templates (excluding blank email)
  const templates = [
    { image: "/aplogy.webp" },
    { image: "/jobemail.png" },
    
    { image: "/jobemail.png" },
    { image: "/intro.png" },
    
    { image: "/jobemail.png" },
    { image: "/resignation.png" },

    
    { image: "/sickemail.png" },
  ];

  return (
    <main className=" min-h-screen text-white px-2 sm:px-6 lg:px-6 py-12 mt-10 xl:mt-0">

      <section className="min-h-screen flex flex-col items-center justify-center">


        <article className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-6 gap-6 max-w-full mx-auto">
          {/* Render Blank Email first */}
          <div className="rounded-xl overflow-hidden shadow-lg bg-[#F1F5FF] dark:bg-gray-900 hover:shadow-xl transition ">
            <img
              src={blankEmail.image || "/blankemail.png"}
              alt={blankEmail.title}
              className="h-25 md:h-30 lg:h-35 w-full object-cover  lg:mb-3"
            />
            <div className="p-2">
              <h3 className="font-semibold text-sm md:text-base xl:text-lg text-gray-900 dark:text-gray-100">
                {blankEmail.title}
              </h3>
              <Link
                href={blankEmail.href}
                className="inline-block mt-3 px-2 md:px-4 py-1 md:py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-sm font-medium text-white"
              >
                Use Template
              </Link>
            </div>

          </div>

          {/* Render fetched templates */}
          {fetchedTemplates.map((t, idx) => (
            <div
              key={t._id}
              className="rounded-xl overflow-hidden shadow-lg bg-[#F1F5FF] dark:bg-gray-900 hover:shadow-xl transition"
            >
              <img
                src={templates[idx]?.image || "/blankemail.png"}
                alt={t.title}
                className="h-25 md:h-30 lg:h-35 w-full object-cover  xl:mb-3"
              />
              <div className="p-2">
                <h3 className="font-semibold text-sm md:text-base xl:text-lg text-gray-900 dark:text-gray-100 whitespace-nowrap">{t.title}</h3>
                {/* <p className="text-gray-700 dark:text-gray-300 text-sm">{templates[idx]?.description}</p> */}
                <Link
                  href={`/${t.slug}`}
                  className="inline-block mt-3 px-2 md:px-4 py-1 md:py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-sm font-medium"
                >
                  Use Template
                </Link>
              </div>

            </div>
          ))}
        </article>

        <article className="w-full text-center px-6 py-8 bg-transparent">
          <h2 className="text-2xl md:text-3xl xl:text-4xl font-bold text-gray-800 mb-4 dark:text-gray-100">
            Your trusted online email sending platform, loved by users
          </h2>
          <p className="leading-relaxed ">
            <span className="block font-medium text-blue-700  text-base md:text-lg xl:text-2xl dark:text-blue-400">
              PromptMail is your simple solution for sending emails easily.
            </span>
            <span className="block mt-2 text-sm md:text-lg xl:text-base text-gray-600 dark:text-gray-200">
              Access all the templates to send enhanced emails easily, straight from your email account, with 100% security.
            </span>
          </p>
        </article>
      </section>



      <section className="w-full px-1 md:px-3 lg:px-6 py-3 md:py-5 lg:py-12 ">
        <div className="max-w-7xl mx-auto ">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-gray-100 text-center mb-3 md:mb-5 lg:mb-8">
            How PromptMail Works
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2 md:gap-4 lg:gap-6 mb-8">
            <div className="text-center p-6 rounded-lg bg-blue-50 dark:bg-gray-900">
              <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-1 md:mb-3">1</div>
              <h3 className="font-semibold text-gray-800 dark:text-gray-100 mb-2">Pick a template</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Start with pre-filled professional templates designed for common email needs.
              </p>
            </div>

            <div className="text-center p-6 rounded-lg bg-green-50 dark:bg-gray-900">
              <div className="text-3xl font-bold text-green-600 dark:text-green-400 mb-3">2</div>
              <h3 className="font-semibold text-gray-800 dark:text-gray-100 mb-2">Edit details</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Update recipient, subject, or content as needed before sending.
              </p>
            </div>

            <div className="text-center p-6 rounded-lg bg-purple-50 dark:bg-gray-900">
              <div className="text-3xl font-bold text-purple-600 dark:text-purple-400 mb-3">3</div>
              <h3 className="font-semibold text-gray-800 dark:text-gray-100 mb-2">Blank Email (Optional)</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Want fully AI-generated personalized emails? Choose the <strong>Blank Email</strong> option.
              </p>
            </div>

            <div className="text-center p-6 rounded-lg bg-orange-50 dark:bg-gray-900">
              <div className="text-3xl font-bold text-orange-600 dark:text-orange-400 mb-3">4</div>
              <h3 className="font-semibold text-gray-800 dark:text-gray-100 mb-2">Send instantly</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Review your draft and click send - your email is delivered.
              </p>
            </div>
          </div>

          <div className="space-y-4 text-center ">
            <div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-700 rounded-lg">
              <p className="text-yellow-800 dark:text-yellow-200 text-sm font-light">
                <strong className="font-semibold"> Note: </strong> Make sure the recipient’s email address is correct before sending. This website doesnt check the "To" email address
              </p>
            </div>

            <div className="p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-700 rounded-lg">
              <p className="text-blue-800 dark:text-blue-200 text-sm">
                <strong>Tip:</strong> Update your profile details for smarter personalization when using AI-generated emails.
              </p>
            </div>
          </div>
        </div>
      </section>


    </main>
  );
}
