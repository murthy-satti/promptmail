import { getToken } from 'next-auth/jwt';
import { NextResponse } from 'next/server';

const protectedRoutes = ['/', '/settings'];

export async function middleware(req) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });


  const isProtected = protectedRoutes.includes(req.nextUrl.pathname);

  if (isProtected && !token) {
    return NextResponse.redirect(new URL('/signin', req.url));
  }

  return NextResponse.next();
}

// Only run on these paths
export const config = {
  matcher: ['/', '/settings'],
};
