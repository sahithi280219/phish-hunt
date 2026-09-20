import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtVerify } from 'jose';

const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || 'default_secret_change_me'
);

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  
  // Protect /admin routes (except login)
  if (path.startsWith('/admin') && !path.startsWith('/admin/login')) {
    const token = request.cookies.get('admin_token')?.value;
    
    if (!token) {
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }
    
    try {
      await jwtVerify(token, JWT_SECRET);
      return NextResponse.next();
    } catch (error) {
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }
  }

  // Protect admin API routes (except login)
  if (path.startsWith('/api/admin') && !path.startsWith('/api/admin/login')) {
      const token = request.cookies.get('admin_token')?.value;
      if (!token) {
          return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
      }
      try {
          await jwtVerify(token, JWT_SECRET);
          return NextResponse.next();
      } catch (error) {
          return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
      }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*', '/api/admin/:path*'],
};
