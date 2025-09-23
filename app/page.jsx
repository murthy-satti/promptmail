import AddNewTemplate from "@/components/addNewTemplate";
import Link from "next/link";
import { getServerSession } from "next-auth/next";
import { authOptions } from "./api/auth/[...nextauth]/route"; // adjust path
import Image from "next/image";

export default async function TemplateLibraryServer() {
  // Get session on server
  const session = await getServerSession(authOptions);
  const email = session?.user?.email;


  // Fetch user data
  const res = await fetch(`${process.env.NEXTAUTH_URL}/api/combinedRoute?email=${email}`);
  const userData = await res.json();
  // console.log(userData);
  

  const blankEmail = { title: "Generate Ai Email", image: "/blankemail.png", href: "/blankemail" };

  const howItWorks = [
    {
      num: 1,
      title: "Choose or Add a Template",
      text: "Select a pre-filled template, a Blank Email for AI-generated content, or add your own custom template.",
      color: "blue"
    },
    {
      num: 2,
      title: "Edit Details",
      text: "Update recipient, subject, or content as needed before sending.",
      color: "green"
    },
    {
      num: 3,
      title: "Preview & Personalize",
      text: "Review the email and personalize content to make it perfect for your recipient.",
      color: "purple"
    },
    {
      num: 4,
      title: "Send Instantly",
      text: "Click send and your email will be delivered immediately with full security.",
      color: "red"
    },
  ]

  return (
    <main className="min-h-screen text-gray-900 dark:text-gray-100 px-1 md:px-8 lg:px-16 py-12 space-y-30 mt-10">

      {/* Templates Grid */}
      <section className="flex flex-col items-center ">
        <article className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-2 md:gap-4 max-w-full mx-auto">

          {/* Blank Email Card */}
          <div className="rounded-xl overflow-hidden shadow-lg bg-white dark:bg-gray-900 hover:shadow-2xl transition-transform transform hover:scale-105">
            <Image
              src={blankEmail.image}
              alt={blankEmail.title}
              width={500}    // adjust based on your design
              height={200}   // adjust based on your design
              className="h-25 md:h-40 w-full object-cover"
            />

            <div className="p-2 md:p-3 flex flex-col items-center">
              <h3 className="font-semibold text-sm md:text-lg text-gray-800 dark:text-gray-100">{blankEmail.title}</h3>
              <Link href={blankEmail.href} className="mt-2 md:mt-3 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-sm font-medium text-white">
                Use Template
              </Link>
            </div>
          </div>

          {/* User Templates */}
          {userData?.user?.templates?.length > 0 &&
            userData.user.templates.map((t, idx) => (
              <div key={idx} className="rounded-xl overflow-hidden shadow-lg bg-white dark:bg-gray-900 hover:shadow-2xl transition-transform transform hover:scale-105">
                <Image
                  src={t.image || "/blankemail.png"}
                  alt={t.title}
                  width={500}   // adjust based on your design
                  height={200}  // adjust based on your design
                  className="h-25 md:h-40 w-full object-cover"
                />
                <div className="p-2 md:p-3 flex flex-col items-center">
                  <h3 className="font-semibold text-sm md:text-lg text-gray-800 dark:text-gray-100 truncate">{t.title}</h3>
                  <Link href={`/${t.slug}`} className="mt-2 md:mt-3 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-sm font-medium text-white">
                    Use Template
                  </Link>
                </div>
              </div>
            ))}

          {/* Add New Template */}
          <AddNewTemplate email={email} />
        </article>
      </section>

      {/* Marketing Section */}
      <section className="text-center max-w-4xl mx-auto space-y-6">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-gray-100">
          Your trusted online email sending platform
        </h2>
        <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300">
          <span className="block font-medium text-blue-600 dark:text-blue-400">PromptMail is your simple solution for sending emails easily.</span>
          <span className="block mt-2">Access all the templates to send enhanced emails securely, straight from your email account.</span>
        </p>
      </section>

      {/* How PromptMail Works */}
      <section className="max-w-7xl mx-auto space-y-8">
        <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-800 dark:text-gray-100">How PromptMail Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {howItWorks.map((step) => (
            <div key={step.num} className={`text-center p-6 rounded-xl bg-${step.color}-50 dark:bg-gray-900 shadow`}>
              <div className={`text-3xl font-bold text-${step.color}-600 dark:text-${step.color}-400 mb-2`}>{step.num}</div>
              <h3 className="font-semibold text-gray-800 dark:text-gray-100 mb-2">{step.title}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">{step.text}</p>
            </div>
          ))}
        </div>

        {/* Notes */}
        <div className="space-y-4 text-center max-w-3xl mx-auto">
          <div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-700 rounded-lg">
            <p className="text-yellow-800 dark:text-yellow-200 text-sm font-light">
              <strong>Note:</strong> Make sure the recipient’s email address is correct before sending. This website doesn’t validate the "To" field.
            </p>
          </div>
          <div className="p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-700 rounded-lg">
            <p className="text-blue-800 dark:text-blue-200 text-sm">
              <strong>Tip:</strong> Update your profile details for smarter personalization when using AI-generated emails.
            </p>
          </div>
        </div>
      </section>

    </main>

  );
}
