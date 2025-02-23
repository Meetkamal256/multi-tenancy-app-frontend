import { NextRequest, NextResponse } from "next/server";

const protectedRoutes = ["/admin", "/tenants", "/analytics"];

export function middleware(request: NextRequest) {
  const token = request.cookies.get("token")?.value || null;
  
  if (
    protectedRoutes.some((route) =>
      request.nextUrl.pathname.startsWith(route)
    ) &&
    !token
  ) {
    return NextResponse.redirect(new URL("/login", request.url));
  }
  
  if (request.nextUrl.pathname === "/login" && token) {
    return NextResponse.redirect(new URL("/admin", request.url));
  }
  
  return NextResponse.next();
}

// Run the middleware on specific routes
export const config = {
  matcher: ["/admin/:path*", "/tenants/:path*", "/analytics/:path*", "/login"],
};
