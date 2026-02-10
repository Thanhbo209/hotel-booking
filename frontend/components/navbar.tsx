import Link from "next/link";

export default function Navbar({ user }: { user: any | null }) {
  return (
    <nav className="flex gap-4 p-4 border-b">
      <Link href="/">Home</Link>

      {/* USER */}
      {user?.role === "USER" && (
        <>
          <Link href="/bookings">My Bookings</Link>
          <Link href="/profile">Profile</Link>
        </>
      )}

      {/* OWNER / ADMIN */}
      {(user?.role === "OWNER" || user?.role === "ADMIN") && (
        <Link
          href={user.role === "ADMIN" ? "/admin/dashboard" : "/owner/dashboard"}
        >
          Dashboard
        </Link>
      )}

      {/* NOT LOGIN */}
      {!user && (
        <div className="ml-auto flex gap-3">
          <Link href="/login">Login</Link>
          <Link href="/register">Register</Link>
        </div>
      )}
    </nav>
  );
}
