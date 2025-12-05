/**
 * Middleware for Authentication and Authorization
 * 
 * Handles:
 * - Route protection (authentication required)
 * - Role-based access control (RBAC)
 * - Redirects for unauthorized access
 * 
 * Note: Using Node.js runtime due to bcrypt dependency in auth
 */

export const runtime = 'nodejs';

import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { auth } from '@/auth';

export async function middleware(request: NextRequest) {
  const session = await auth();
  const { pathname } = request.nextUrl;

  // Public routes - allow access without authentication
  const publicRoutes = [
    '/',
    '/login',
    '/sign-up',
    '/stores',
    '/marketplace',
    '/about',
    '/contact',
    '/help',
    '/terms',
    '/privacy',
  ];
  
  const isPublicRoute = publicRoutes.some(route => 
    pathname === route || pathname.startsWith(`${route}/`)
  );

  if (isPublicRoute) {
    return NextResponse.next();
  }

  // Require authentication for protected routes
  if (!session?.user) {
    const url = request.nextUrl.clone();
    url.pathname = '/login';
    url.searchParams.set('callbackUrl', pathname);
    return NextResponse.redirect(url);
  }

  // Get user role (default to 'customer' if not set)
  // TODO: Update auth.ts to include role in session
  const userRole = (session.user as any).role || 'customer';

  // Role-based access control
  
  // Admin routes - only admins can access
  if (pathname.startsWith('/admin')) {
    if (userRole !== 'admin') {
      console.warn(`Unauthorized admin access attempt by ${session.user.email}`);
      return NextResponse.redirect(new URL('/dashboard', request.url));
    }
  }

  // Vendor dashboard routes - vendors and admins can access
  if (pathname.startsWith('/dashboard')) {
    if (!['vendor', 'admin'].includes(userRole)) {
      console.warn(`Unauthorized dashboard access attempt by ${session.user.email}`);
      return NextResponse.redirect(new URL('/', request.url));
    }
  }

  // Store editor routes - vendors and admins can access
  if (pathname.startsWith('/editor')) {
    if (!['vendor', 'admin'].includes(userRole)) {
      return NextResponse.redirect(new URL('/dashboard', request.url));
    }
  }

  // Add security headers
  const response = NextResponse.next();
  response.headers.set('X-Frame-Options', 'DENY');
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');

  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - api routes
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public files (images, etc.)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};
