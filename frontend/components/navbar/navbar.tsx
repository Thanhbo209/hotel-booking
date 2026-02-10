"use client";

import Link from "next/link";
import { User, Menu, X, LogOut, LayoutDashboard, BookOpen } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { useLogout } from "@/features/auth/hooks/useLogout";
import { UserType } from "@/types/user";
import { ModeToggle } from "@/components/mode-toggle";
import NavLinks from "@/components/navbar/nav-links";
import clsx from "clsx";

export default function Navbar({ user }: { user?: UserType | null }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { logout, error } = useLogout();
  const [isShrink, setIsShrink] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const lastScrollY = useRef(0);
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY.current && currentScrollY > 80) {
        // scroll xuống
        setIsShrink(true);
      } else {
        // scroll lên
        setIsShrink(false);
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav
      className={clsx(
        "fixed top-0 left-0 w-full z-50 border-b border-border bg-background transition-all duration-300",
        isShrink ? "h-14" : "h-20",
      )}
    >
      <div className="max-w-7xl mx-auto px-4 h-full flex items-center  justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <span className="text-3xl font-bold">
            Hotel<span className="text-primary">Hub</span>
          </span>
        </Link>

        {/* Desktop auth */}
        <div className="hidden md:flex items-center gap-15 relative">
          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-8">
            <NavLinks />
          </div>
          {!user ? (
            <>
              <Link
                href="/login"
                className="bg-primary text-md px-6  py-1 rounded-md hover:bg-primary/80"
              >
                Login
              </Link>
              <ModeToggle />
            </>
          ) : (
            <>
              {/* User icon */}
              <Button
                onClick={() => setIsDropdownOpen((v) => !v)}
                className="w-10 h-10 rounded-full bg-muted-foreground/10 flex items-center justify-center hover:bg-muted/80"
              >
                <User className="w-5 h-5 text-foreground" />
              </Button>

              {/* Dropdown */}
              {isDropdownOpen && (
                <div
                  ref={dropdownRef}
                  className="absolute right-0 top-12 w-48 rounded-xl border shadow-lg p-2 z-50"
                >
                  <div className="text-sm text-start p-2">
                    Welcome,{" "}
                    <span className="font-bold text-primary">
                      {user.fullName}
                    </span>
                  </div>
                  {user.role === "USER" && (
                    <Link href="/bookings" className="dropdown-item">
                      <BookOpen className="w-4 h-4" />
                      My Bookings
                    </Link>
                  )}

                  {(user.role === "OWNER" || user.role === "ADMIN") && (
                    <Link
                      href={
                        user.role === "ADMIN"
                          ? "/admin/dashboard"
                          : "/owner/dashboard"
                      }
                      className="dropdown-item"
                    >
                      <LayoutDashboard className="w-4 h-4" />
                      Dashboard
                    </Link>
                  )}

                  <Link href="/profile" className="dropdown-item">
                    <User className="w-4 h-4" />
                    Profile
                  </Link>
                  {error && <p className="text-destructive text-sm">{error}</p>}
                  <Button
                    variant={"outline"}
                    onClick={logout}
                    className="dropdown-item w-full text-destructive"
                  >
                    <LogOut className="w-4 h-4" />
                    Logout
                  </Button>
                </div>
              )}
            </>
          )}
        </div>

        {/* Mobile button */}
        <Button
          variant="ghost"
          className="md:hidden"
          onClick={() => setIsMenuOpen((v) => !v)}
        >
          {isMenuOpen ? <X /> : <Menu />}
        </Button>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden flex bg-background flex-col border-t px-4  py-10 space-y-8">
          <NavLinks onClick={() => setIsMenuOpen(false)} />
          <ModeToggle />

          {!user ? (
            <>
              <Link
                href="/login"
                className="bg-primary px-5 py-2 rounded-md text-center hover:bg-primary/80"
              >
                Login
              </Link>
            </>
          ) : (
            <>
              {user.role === "USER" && (
                <Link href="/bookings">My Bookings</Link>
              )}
              {(user.role === "OWNER" || user.role === "ADMIN") && (
                <Link
                  href={
                    user.role === "ADMIN"
                      ? "/admin/dashboard"
                      : "/owner/dashboard"
                  }
                >
                  Dashboard
                </Link>
              )}
              <Link href="/profile">Profile</Link>
              <Button
                onClick={logout}
                variant={"outline"}
                className="text-destructive"
              >
                Logout
              </Button>
            </>
          )}
        </div>
      )}
    </nav>
  );
}
