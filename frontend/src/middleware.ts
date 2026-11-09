import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Retrieve auth token and role from cookies
  const token = request.cookies.get('motho_token')?.value;
  const role = request.cookies.get('motho_role')?.value;

  const isAuthenticated = Boolean(token);

  // 1. If visiting /login or /register while already authenticated, redirect to appropriate portal
  if (pathname === '/login' || pathname === '/register') {
    if (isAuthenticated) {
      if (role === 'admin') {
        return NextResponse.redirect(new URL('/admin', request.url));
      }
      if (role === 'owner') {
        return NextResponse.redirect(new URL('/owner', request.url));
      }
      return NextResponse.redirect(new URL('/dashboard', request.url));
    }
    return NextResponse.next();
  }

  // 2. Protected Admin Routes (/admin and sub-routes)
  if (pathname.startsWith('/admin')) {
    if (!isAuthenticated) {
      const loginUrl = new URL('/login', request.url);
      loginUrl.searchParams.set('redirect', pathname);
      return NextResponse.redirect(loginUrl);
    }

    // Role check: Only 'admin' allowed
    if (role !== 'admin') {
      const dashboardUrl = new URL('/dashboard', request.url);
      dashboardUrl.searchParams.set('denied', 'admin');
      return NextResponse.redirect(dashboardUrl);
    }

    return NextResponse.next();
  }

  // 3. Protected Owner Routes (/owner and sub-routes)
  if (pathname.startsWith('/owner')) {
    if (!isAuthenticated) {
      const loginUrl = new URL('/login', request.url);
      loginUrl.searchParams.set('redirect', pathname);
      return NextResponse.redirect(loginUrl);
    }

    // Role check: 'owner' and 'admin' allowed
    if (role !== 'owner' && role !== 'admin') {
      const dashboardUrl = new URL('/dashboard', request.url);
      dashboardUrl.searchParams.set('denied', 'owner');
      return NextResponse.redirect(dashboardUrl);
    }

    return NextResponse.next();
  }

  // 4. Protected Customer Dashboard Routes (/dashboard and sub-routes)
  if (pathname.startsWith('/dashboard')) {
    if (!isAuthenticated) {
      const loginUrl = new URL('/login', request.url);
      loginUrl.searchParams.set('redirect', pathname);
      return NextResponse.redirect(loginUrl);
    }

    return NextResponse.next();
  }

  // All other routes are public (/, /about, /contact, /motorcycles, /search, etc.)
  return NextResponse.next();
}

export const config = {
  matcher: [
    '/dashboard/:path*',
    '/owner/:path*',
    '/admin/:path*',
    '/login',
    '/register',
  ],
};
