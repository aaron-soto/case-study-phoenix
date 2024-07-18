import { NextRequest, NextResponse } from "next/server";

// Middleware function
export async function middleware(request: NextRequest) {
  // This middleware currently does nothing

  // // Example: Redirecting based on path
  // if (request.nextUrl.pathname.startsWith('/old-path')) {
  //   return NextResponse.redirect(new URL('/new-path', request.url));
  // }

  // // Example: Setting headers
  // const response = NextResponse.next();
  // response.headers.set('X-Custom-Header', 'my-custom-value');
  // return response;

  // // Example: Conditional logic based on request properties
  // if (request.method === 'POST') {
  //   return NextResponse.json({ message: 'POST requests are handled here' });
  // }

  return NextResponse.next();
}

// Config for the middleware
export const config = {
  matcher: [
    /*
     * Match all request paths for now. Customize this if needed.
     * Examples:
     * '/api/:path*' for all API routes
     * '/dashboard/:path*' for all dashboard routes
     */
    "/:path*",
  ],
};
