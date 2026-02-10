"use client";

import Link from "next/link";

export default function Navbar({ user }: { user: any }) {
  return (
    <nav className="flex gap-4">
      <Link href="/">Home</Link>

      {user?.role === "USER" && (
        <>
          <Link href="/bookings">My Bookings</Link>
          <Link href="/profile">Profile</Link>
        </>
      )}

      {(user?.role === "OWNER" || user?.role === "ADMIN") && (
        <Link
          href={user.role === "ADMIN" ? "/admin/dashboard" : "/owner/dashboard"}
        >
          Dashboard
        </Link>
      )}

      {!user && (
        <>
          <Link href="/login">Login</Link>
          <Link href="/register">Register</Link>
        </>
      )}
    </nav>
  );
}
