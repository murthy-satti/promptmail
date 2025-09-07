// app/privacy/page.jsx
export const metadata = {
    description: "Read the privacy policy for PromptMail, detailing data collection, usage, and user security.",
};

export default function PrivacyPolicy() {
    return (
        <div className="min-h-screen  py-8 px-4 sm:px-6 lg:px-8 mt-15">
            <div className="max-w-4xl mx-auto">
                {/* Header Section */}
                <div className="text-center mb-4">
                    <h2 className="text-2xl sm:text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 dark:from-purple-400 dark:to-blue-400 bg-clip-text text-transparent mb-4">
                        Privacy Policy
                    </h2>
                    <p className="text-gray-900 font-semibold dark:text-purple-400 text-md md:text-lg max-w-2xl mx-auto">
                        Your privacy is important to us. This policy explains how we collect, use, and protect your information.
                    </p>
                </div>

               {/* Main Content */}
              <div className="bg-white/80 dark:bg-[#202020] shadow-xl rounded-3xl p-6 sm:p-8 lg:p-10 border border-gray-200 dark:border-gray-700">


                    {/* Section 1 */}
                    <article className="mb-8">
                        <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-gray-100 flex items-center">
                            1. Information We Collect
                        </h2>
                        <div className="grid gap-4 sm:grid-cols-1 lg:grid-cols-2">
                            <div className="bg-green-50 dark:bg-[#333333] rounded-xl p-4 border border-gray-400 dark:border-gray-200">
                                <h3 className="font-semibold text-gray-800 dark:text-gray-100 mb-2">Account Information</h3>
                                <ul className="text-gray-900 dark:text-gray-200 space-y-1 text-sm">
                                    <li>• Name, email, and profile picture via Google OAuth2</li>
                                    <li>• Skills, experience, and phone number for personalization</li>
                                </ul>
                            </div>
                            <div className="bg-green-50 dark:bg-[#333333] rounded-xl p-4 border border-gray-400 dark:border-gray-200">
                                <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">Email Data</h3>
                                <ul className="text-gray-900 dark:text-gray-200 space-y-1 text-sm">
                                    <li>• Recipient email addresses</li>
                                    <li>• Subject lines and message content</li>
                                    <li>• Uploaded files (temporary)</li>
                                </ul>
                            </div>
                        </div>
                        <div className="mt-4 bg-gray-200 dark:bg-[#282828] rounded-xl p-4 border border-gray-400 dark:border-gray-200">
                            <p className="text-sm text-gray-900 dark:text-gray-100">
                                <strong>Note:</strong> Access tokens are used temporarily and never stored in our database.
                            </p>
                        </div>
                    </article>

                    {/* article 2 */}
                    <article className="mb-8">
                        <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-gray-100 flex items-center">
                            2. How We Use Your Data
                        </h2>
                        <div className="p-6 bg-green-50 dark:bg-[#333333] rounded-xl border border-gray-400 dark:border-gray-200 space-y-3">
                            <p className="text-gray-900 dark:text-gray-300">
                                Generate AI-powered email content using Gemini API for personalized communication.
                            </p>
                            <p className="text-gray-700 dark:text-gray-300">
                                Send emails from your Gmail account using secure Nodemailer + OAuth2 integration.
                            </p>
                            <p className="text-gray-700 dark:text-gray-300">
                                Personalize and streamline your email experience based on your profile.
                            </p>
                        </div>
                    </article>



                    {/* article 3 */}
                    <article className="mb-8">
                        <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-gray-100 flex items-center">
                            3. Data Sharing & Third Parties
                        </h2>
                        <div className="bg-red-50 dark:bg-red-900/10 rounded-xl p-6 border border-gray-400 dark:border-gray-200">
                            <div className="flex items-center mb-3">
                                <div className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center mr-3">
                                    <span className="text-white text-xs font-bold">!</span>
                                </div>
                                <h3 className="font-bold text-red-800 dark:text-red-300">We Never Sell Your Data</h3>
                            </div>
                            <p className="text-red-700 dark:text-red-300 mb-3">
                                We <strong>never</strong> sell, rent, or share your personal data with third parties for marketing purposes.
                            </p>
                            <p className="text-sm text-red-700 dark:text-red-200">
                                Google services are subject to their own{" "}
                                <a
                                    href="https://policies.google.com/privacy"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="underline hover:text-red-900 dark:hover:text-red-100 transition-colors"
                                >
                                    Privacy Policy
                                </a>
                                . We only use Google APIs for authentication and email sending.
                            </p>

                        </div>
                    </article>

                    {/* article 4 */}
                    <article className="mb-8">
                        <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-gray-100 flex items-center">
                            4. File Uploads & Storage
                        </h2>
                        <div className="bg-green-50 dark:bg-[#333333] rounded-xl p-6 border border-gray-400 dark:border-gray-200">
                            <div className="flex items-center mb-3">

                                <h3 className="font-bold text-gray-900 dark:text-gray-100">Temporary File Processing</h3>
                            </div>
                            <p className="text-gray-900 dark:text-gray-100 mb-2">
                                Files are only used for the current email session and are <strong>never stored permanently</strong>.
                            </p>
                            <p className="text-sm text-gray-900 dark:text-gray-100">
                                All uploaded files are automatically deleted after email processing for maximum security.
                            </p>
                        </div>
                    </article>

                    {/* article 5 */}
                    <article className="mb-8">
                        <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-gray-100 flex items-center">
                            5. Data Security & Protection
                        </h2>
                        <div className="grid gap-4 sm:grid-cols-1 lg:grid-cols-2">
                            <div className="bg-green-50 dark:bg-[#333333] rounded-xl p-4 border border-gray-400 dark:border-gray-200">
                                <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-2 flex items-center">
                                    <span className="mr-2">🔒</span>
                                    Encryption
                                </h3>
                                <p className="text-gray-900 dark:text-gray-100 text-sm">
                                    All data transmission uses HTTPS encryption to protect your information in transit.
                                </p>
                            </div>
                            <div className="bg-green-50 dark:bg-[#333333] rounded-xl p-4 border border-gray-400 dark:border-gray-200">
                                <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-2 flex items-center">
                                    <span className="mr-2">🔐</span>
                                    Authentication
                                </h3>
                                <p className="text-gray-900 dark:text-gray-100 text-sm">
                                    Secure session handling via NextAuth and Google OAuth2 protocols.
                                </p>
                            </div>
                        </div>
                    </article>

                    {/* article 6 */}
                    <article className="mb-8">
                        <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-gray-100 flex items-center">
                            6. Data Retention & Deletion
                        </h2>
                        <div className="bg-green-50 dark:bg-[#333333] rounded-xl p-6 border border-gray-400 dark:border-gray-200">
                            <div className="space-y-3">
                                <div className="flex items-start">
                                    <p className="text-gray-900 dark:text-gray-100">
                                        <strong>Profile Data:</strong> Stored securely until you delete your account
                                    </p>
                                </div>
                                <div className="flex items-start">
                                    <p className="text-gray-900 dark:text-gray-100">
                                        <strong>Email Content:</strong> Not stored permanently; used only for generation
                                    </p>
                                </div>
                                <div className="flex items-start">
                                    <p className="text-gray-900 dark:text-gray-100">
                                        <strong>Files:</strong> Automatically deleted after each session
                                    </p>
                                </div>
                            </div>
                        </div>
                    </article>

                    {/* article 7 */}
                    <article className="mb-8">
                        <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-gray-100 flex items-center">
                            7. Test User Notice
                        </h2>
                        <div className="bg-green-50 dark:bg-[#333333] rounded-xl p-6 border border-gray-400 dark:border-gray-200">
                            <div className="flex items-center mb-3">
                                <h3 className="font-bold text-gray-900 dark:text-gray-100">Beta Testing Phase</h3>
                            </div>
                            <p className="text-gray-900 dark:text-gray-100 mb-2">
                                PromptMail is currently in beta testing. Only approved test users can access the application.
                            </p>
                            <p className="text-sm text-gray-900 dark:text-gray-100">
                                Contact the administrator for access approval and testing participation.
                            </p>
                        </div>
                    </article>

                  
                    {/* Contact article */}
                    <article className="mb-8">
                        <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-gray-100 flex items-center">
                            Contact Us
                        </h2>
                        <div className="bg-green-50 dark:bg-[#333333] rounded-xl p-6 border border-gray-400 dark:border-gray-200">
                            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                                <div>
                                    <h3 className="font-bold text-gray-900 dark:text-gray-100 mb-2">Questions about this policy?</h3>
                                    <p className="text-gray-900 dark:text-gray-100 mb-4 sm:mb-0">
                                        <strong>Murthy Satti</strong><br />
                                        <span className="inline-flex items-center mt-1">
                                            <span className="mr-2">📧</span>
                                            <a href="mailto:murthysatti321@gmail.com" className="underline hover:text-purple-900 dark:hover:text-purple-200 transition-colors">
                                                murthysatti321@gmail.com
                                            </a>
                                        </span>
                                    </p>
                                </div>
                                <div className="flex-shrink-0">
                                    <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white text-2xl">
                                        👋
                                    </div>
                                </div>
                            </div>
                        </div>
                    </article>

                    {/* Footer */}
                    <footer className="text-sm text-gray-900 dark:text-gray-200">
                        Last updated: July 6, 2025 • This policy may be updated periodically
                    </footer>
                </div>
            </div>
        </div>
    );
}