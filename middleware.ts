import { NextRequest, NextResponse } from "next/server";
import { getLoggedInUser } from "./lib/appwrite";

const protectedPaths = ["/account"];
const publicPaths = ["/", "/signin", "/signup"];

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  const user = await getLoggedInUser();

  if (protectedPaths.includes(path) && !user) {
    return NextResponse.redirect(new URL("/signin", request.url));
  }

  if (publicPaths.includes(path) && user) {
    return NextResponse.redirect(new URL("/account", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/account", "/signin", "/signup", "/"],
};
