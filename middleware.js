import { getToken } from 'next-auth/jwt';
import { NextResponse } from 'next/server';

// Explicit protected routes
const protectedRoutes = ['/', '/settings','/contact'];

export async function middleware(req) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  const pathname = req.nextUrl.pathname;

  // Protect: '/' , '/settings' , and dynamic `/slug/page`
  const isProtected =
    protectedRoutes.includes(pathname) ||
    /^\/[^/]+\/page$/.test(pathname); // ✅ match /slug/page

  if (isProtected && !token) {
    return NextResponse.redirect(new URL('/signin', req.url));
  }

  return NextResponse.next();
}

// ✅ Exclude specific paths without regex groups
export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|pm-logo.png|privacy-policy|terms|signin).*)',
  ],
};
