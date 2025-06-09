// import { auth } from "./app/_lib/auth";

// export const middleware = auth;

import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(req) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  console.log("TOKEN:", token);
  console.log("COOKIES:", req.cookies.getAll());
  if (!token) {
    // return new NextResponse("Unauthorized", { status: 401 });
    return NextResponse.redirect(new URL("/", req.url));
  }

  return NextResponse.next();
}

// export const config = {
//   matcher: ["/properties/add", "/profile", "/properties/saved", "/messages"],
//   runtime: "nodejs",
// };
