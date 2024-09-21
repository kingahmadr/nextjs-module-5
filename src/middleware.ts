import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
// import { cookies } from "next/headers";
import { match } from "path-to-regexp";
// import jwt from "jsonwebtoken";
import { AuthorizationForMiddleware } from "./app/lib/AuthorizationForMiddleware";

// This function can be marked `async` if using `await` inside
const protectedRoutes = ["/checkout"];
const validPaths = [
  "/",
  "/products/:productsID",
  "/products/",
  "/login",
  "/register",
  "/checkout",
  "/fetch",
];
// const publicRoutes = ["/login", "/signup", "/"];
const isValidPath = (path: string) => {
  return validPaths.some((route) => {
    const matcher = match(route, { decode: decodeURIComponent });
    return matcher(path);
  });
};
export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const url = request.nextUrl;
  //   const isPublicRoutes = publicRoutes.includes(path)
  const isProtectedRoutes = protectedRoutes.includes(path);
  // const cookieStore = cookies();
  // const token = cookieStore.get("token");

  // const decodedToken = jwt.decode(token?.value || " ");

  // console.log("token", token?.value);
  // console.log("decodedToken", decodedToken);

  // if (decodedToken) {
  //   console.log("user", decodedToken.user);
  //   const authorized = await Authorization();
  //   console.log("authorized log from middleware", authorized);
  // }

  const authorized = await AuthorizationForMiddleware();
  console.log("authorized from middleware", authorized);
  if (authorized) {
    console.log("authorized from middleware: ", authorized);
    console.log("Authorized");
  } else {
    console.log("authorized from middleware: ", authorized);
    console.log("Didn't Authorize");
  }

  if (isProtectedRoutes && !authorized) {
    return NextResponse.redirect(new URL("/login", request.nextUrl));
  }

  if (!isValidPath(url.pathname) && !url.pathname.startsWith("/api")) {
    // Redirect to custom 404 page for invalid paths
    return NextResponse.rewrite(new URL("/not-found", request.url));
  }
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|.*\\.png$).*)",
    "/products/:path*",
  ],
};
