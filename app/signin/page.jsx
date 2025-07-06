'use client';
import { signIn } from 'next-auth/react';
import Image from 'next/image';

const handleSignin = async () => {
  await signIn('google', { callbackUrl: '/' });
};

export default function SignInBtn() {
  return (
    <div className="min-h-screen flex items-center justify-center  px-4">
      <div className="max-w-md w-full bg-white dark:bg-gray-800 p-8 rounded-xl shadow-md text-center space-y-6">
        <div>
          <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">Sign in to PromptMail</h2>
          <p className="text-sm text-gray-600 dark:text-gray-300">
            Please sign in with your Google account. You'll be asked to enter your email and password,
            and accept the required permissions.
          </p>
        </div>

        <button
          onClick={handleSignin}
          className="flex items-center justify-center space-x-3 w-full px-6 py-3 bg-white shadow-md border border-gray-300 rounded-lg hover:shadow-lg hover:bg-gray-200 transition"
        >
          <Image
            src="/google.png"
            alt="Google Logo"
            width={30}
            height={30}
          />
          <span className="text-sm font-medium text-gray-800">Sign in with Google</span>
        </button>

        <div className="mt-4 bg-yellow-50 border border-yellow-400 p-4 rounded-md text-left text-sm text-yellow-700 dark:bg-yellow-900 dark:border-yellow-600 dark:text-yellow-100">
          <strong>Note:</strong> This app is not published publicly. Only test users added by the admin can sign in and use the website.
          <br />
          If you want to test or use the app, please contact the admin.
          <br />
          Read our{" "}
          <a
            href="/privacypolicy"
            className="underline font-medium hover:text-yellow-800 dark:hover:text-yellow-300 transition-colors"
          >
            Privacy Policy 
          </a>
           <span> to know more about the website.</span> 
        </div>


        <a
          href="https://wa.me/919121723149"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block text-sm font-medium text-green-600 hover:underline"
        >
          📞 Contact Admin on WhatsApp
        </a>
      </div>
    </div>
  );
}
