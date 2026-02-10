import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  const accessToken = req.cookies.get("accessToken")?.value;

  // Chưa login
  if (!accessToken) {
    if (
      pathname.startsWith("/admin") ||
      pathname.startsWith("/owner") ||
      pathname.startsWith("/bookings") ||
      pathname.startsWith("/profile")
    ) {
      return NextResponse.redirect(new URL("/login", req.url));
    }

    return NextResponse.next();
  }

  // Có token → gọi backend lấy user
  const res = await fetch(`${process.env.BACKEND_URL}/users/me`, {
    headers: {
      cookie: req.headers.get("cookie") || "",
    },
  });

  if (!res.ok) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  const user = await res.json();

  // 🔐 ADMIN
  if (pathname.startsWith("/admin") && user.role !== "ADMIN") {
    return NextResponse.redirect(new URL("/", req.url));
  }

  // 🔐 OWNER
  if (
    pathname.startsWith("/owner") &&
    !["OWNER", "ADMIN"].includes(user.role)
  ) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  // USER cố vào dashboard
  if (
    user.role === "USER" &&
    (pathname.startsWith("/admin") || pathname.startsWith("/owner"))
  ) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/owner/:path*", "/bookings", "/profile"],
};
