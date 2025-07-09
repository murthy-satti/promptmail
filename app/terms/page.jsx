export const metadata = {
  description: "Read the terms and conditions for using PromptMail, including user responsibilities, limitations, and service terms.",
};

export default function TermsAndConditions() {
  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8 mt-15">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-2">
          <h2 className="text-3xl sm:text-5xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 dark:from-purple-400 dark:to-blue-400 bg-clip-text text-transparent mb-4">
            Terms and Conditions
          </h2>
          <p className="text-gray-900 font-semibold dark:text-purple-400 text-md md:text:lg max-w-2xl mx-auto">
            Please read these terms carefully before using PromptMail.
          </p>
        </div>

        {/* Content Box */}
        <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm shadow-xl rounded-3xl p-6 sm:p-8 lg:p-10 border border-gray-200 dark:border-gray-700 space-y-8">

          {/* Section 1 */}
          <section>
            <h2 className="text-2xl font-bold mb-3 text-gray-800 dark:text-gray-100">1. Acceptance of Terms</h2>
            <p className="text-gray-800 dark:text-gray-300 text-sm">
              By accessing or using PromptMail, you agree to comply with and be bound by these Terms. If you disagree with any part, please do not use the service.
            </p>
          </section>

          {/* Section 2 */}
          <section>
            <h2 className="text-2xl font-bold mb-3 text-gray-800 dark:text-gray-100">2. User Responsibilities</h2>
            <ul className="list-disc pl-5 space-y-2 text-gray-800 dark:text-gray-300 text-sm">
              <li>You are responsible for any content sent via the platform.</li>
              <li>Do not use PromptMail for spam, harassment, or illegal activities.</li>
              <li>You must provide accurate profile and email data.</li>
            </ul>
          </section>

          {/* Section 3 */}
          <section>
            <h2 className="text-2xl font-bold mb-3 text-gray-800 dark:text-gray-100">3. Service Availability</h2>
            <p className="text-gray-800 dark:text-gray-300 text-sm">
              We aim to ensure uninterrupted service but cannot guarantee uptime. Features may be added, removed, or changed without notice.
            </p>
          </section>

          {/* Section 4 */}
          <section>
            <h2 className="text-2xl font-bold mb-3 text-gray-800 dark:text-gray-100">4. Intellectual Property</h2>
            <p className="text-gray-800 dark:text-gray-300 text-sm">
              PromptMail and its content are protected by intellectual property laws. You may not reuse, copy, or distribute any part without written permission.
            </p>
          </section>

          {/* Section 5 */}
          <section>
            <h2 className="text-2xl font-bold mb-3 text-gray-800 dark:text-gray-100">5. Third-Party Services</h2>
            <p className="text-gray-800 dark:text-gray-300 text-sm">
              We integrate with services like Google OAuth and Gemini API. Their terms apply separately and are not controlled by PromptMail.
            </p>
          </section>

          {/* Section 6 */}
          <section>
            <h2 className="text-2xl font-bold mb-3 text-gray-800 dark:text-gray-100">6. Termination</h2>
            <p className="text-gray-800 dark:text-gray-300 text-sm">
              We reserve the right to suspend or terminate access to PromptMail at any time for violations of these Terms or misuse of the platform.
            </p>
          </section>

          {/* Section 7 */}
          <section>
            <h2 className="text-2xl font-bold mb-3 text-gray-800 dark:text-gray-100">7. Contact</h2>
            <p className="text-gray-800 dark:text-gray-300 text-sm">
              For any questions about these Terms, contact:
              <br />
              <strong>Murthy Satti</strong><br />
              <a href="mailto:murthysatti321@gmail.com" className="underline hover:text-purple-900 dark:hover:text-purple-300 transition-colors">
                murthysatti321@gmail.com
              </a>
            </p>
          </section>

          {/* Footer */}
          <footer className="text-sm text-gray-900 dark:text-gray-200">
            Last updated: July 9, 2025 • Subject to change without prior notice
          </footer>
        </div>
      </div>
    </div>
  );
}
