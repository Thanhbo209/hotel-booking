import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const accessToken = req.cookies.get("accessToken")?.value;

  const isAuthPage = pathname.startsWith("/login");

  // =====================
  // ❌ CHƯA LOGIN
  // =====================
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

  // =====================
  // ✅ ĐÃ LOGIN → LẤY USER
  // =====================
  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/users/me`, {
    headers: {
      cookie: req.headers.get("cookie") || "",
    },
  });

  if (!res.ok) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  const user = await res.json();

  // =====================
  // 🚫 ĐÃ LOGIN MÀ CỐ VÀO /login
  // =====================
  if (isAuthPage) {
    if (user.role === "ADMIN") {
      return NextResponse.redirect(new URL("/admin/dashboard", req.url));
    }

    if (user.role === "OWNER") {
      return NextResponse.redirect(new URL("/owner/dashboard", req.url));
    }

    return NextResponse.redirect(new URL("/", req.url));
  }

  // =====================
  // 🔐 ADMIN
  // =====================
  if (pathname.startsWith("/admin") && user.role !== "ADMIN") {
    return NextResponse.redirect(new URL("/", req.url));
  }

  // =====================
  // 🔐 OWNER
  // =====================
  if (
    pathname.startsWith("/owner") &&
    !["OWNER", "ADMIN"].includes(user.role)
  ) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/login",
    "/admin/:path*",
    "/owner/:path*",
    "/bookings",
    "/profile",
  ],
};
