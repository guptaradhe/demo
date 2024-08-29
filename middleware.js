import { NextResponse } from "next/server";

export async function middleware(request) {
  const authToken = request.cookies.get("authToken")?.value;

  const loggedInUserNotAccessPath =
    request.nextUrl.pathname === "/login" ||
    request.nextUrl.pathname === "/sign-up" ||
    request.nextUrl.pathname === "/";

  if (loggedInUserNotAccessPath && authToken) {
    return NextResponse.redirect(new URL("/user-details", request.nextUrl));
  }

  if (!loggedInUserNotAccessPath && !authToken) {
    return NextResponse.redirect(new URL("/login", request.nextUrl));
  }
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/", "/user-details"],
};
