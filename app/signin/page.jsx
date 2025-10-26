'use client';
import { signIn } from 'next-auth/react';
import Image from 'next/image';

const handleSignin = async () => {
  await signIn('google', { callbackUrl: '/' });
};

export default function SignInBtn() {
  return (
    <div className="min-h-screen flex items-center justify-center  px-4">
      <div className="max-w-md w-full bg-white dark:bg-slate-900 p-8 rounded-xl shadow-md text-center space-y-6">
        <div>
          <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">Sign in to PromptMail</h2>
          <p className="text-sm text-gray-600 dark:text-gray-300">
            Please sign in with your Google account. You'll be asked to enter your email and password,
            and accept the required permissions.
          </p>
        </div>

        <button
          onClick={handleSignin}
          className="flex items-center justify-center space-x-3 w-full px-6 py-3 bg-white shadow-md border border-gray-300 rounded-lg hover:shadow-lg hover:bg-gray-200 transition cursor-pointer"
        >
          <Image
            src="/google.png"
            alt="Google Logo"
            width={30}
            height={30}
          />
          <span className="text-sm font-medium text-gray-800">Sign in with Google</span>
        </button>

        <div className="mt-4 bg-yellow-50 border border-yellow-400 p-4 rounded-md text-left text-sm text-yellow-700 dark:bg-[#333333] dark:border-slate-600 dark:text-slate-100">
          <strong>Note:</strong> This app is not published publicly, so you will see warning once you clicks sign-in .Ignore that and  click advanced and proceed with PromptMail inorder to complete signin.


        </div>

        <div className='text-sm text-gray-800 dark:text-gray-300'> Read our{" "}
          <a
            href="/privacypolicy"
            className="underline font-medium hover:text-yellow-800 dark:hover:text-yellow-300 transition-colors"
          >
            Privacy Policy
          </a>
          <span> to know more about the website. </span> <br />
        </div>

     
     
      <a href="https://wa.me/919121723149" target="_blank" rel="noopener noreferrer" className="flex text-sm font-medium text-gray-800 dark:text-gray-300 hover:underline whitespace-nowrap">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="24" height="24"><path fill="#25D366" d="M34.4 13.5C31.4 10.5 27.3 9 23 9 14.7 9 8 15.7 8 24c0 2.7.7 5.3 2 7.6L8 39l7.7-2c2.2 1.2 4.7 1.9 7.3 1.9 8.3 0 15-6.7 15-15 0-4.3-1.5-8.4-4.6-11.4z"/>
      <path fill="#FFF" d="M23 10.7c7.3 0 13.3 6 13.3 13.3 0 7.3-6 13.3-13.3 13.3-2.4 0-4.8-.6-6.8-1.8l-.5-.3-4.6 1.2 1.2-4.5-.3-.5c-1.3-2.1-1.9-4.5-1.9-6.9C10.2 16.7 16.2 10.7 23 10.7m0-2C15.2 8.7 9 14.9 9 22.7c0 2.8.7 5.6 2.1 8l-1.7 6.3 6.4-1.7c2.3 1.4 5 2.2 7.8 2.2 7.8 0 14.1-6.3 14.1-14.1 0-3.8-1.5-7.3-4.1-10C30.3 9.9 26.8 8.7 23 8.7z"/>
      <path fill="#FFF" d="M29.3 26.4c-.4-.2-2.3-1.1-2.7-1.2-.4-.1-.7-.2-1 .2-.3.4-1.1 1.2-1.3 1.4-.2.2-.5.3-.9.1-1.5-.6-2.7-1.7-3.5-3.1-.3-.5 0-.7.2-.9.2-.2.4-.5.6-.7.2-.2.3-.4.5-.7.2-.3.1-.5 0-.7-.1-.2-1-2.4-1.4-3.3-.4-.9-.7-.8-1-.8h-.9c-.3 0-.7.1-1 .5s-1.3 1.2-1.3 2.9 1.3 3.5 1.5 3.8c.2.3 2.6 4 6.3 5.5.9.4 1.6.6 2.2.8.9.3 1.8.2 2.5.1.8-.1 2.3-.9 2.6-1.8.3-.9.3-1.6.2-1.8-.2-.3-.3-.4-.7-.6z"/>
      </svg>
       For more info Contact Admin on WhatsApp</a>


      </div>
    </div>
  );
}
