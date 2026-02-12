"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Bell, Home, LogOut, Settings, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/stores/auth-store";
import { useLogout } from "@/features/auth/hooks/useLogout";
import { useHydrateAuth } from "@/features/auth/hooks/useHydrateAuth";
import Link from "next/link";

export default function OwnerNavbar() {
  useHydrateAuth();

  const user = useAuthStore((s) => s.user);
  const { logout, error } = useLogout();
  if (!user) return null;

  const initials = user.fullName
    ?.split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <header className="flex items-center justify-between px-6 py-4 border-b ">
      {/* Left */}
      <div>
        <h2 className="text-lg font-semibold">Welcome back!</h2>
        <p className="text-sm text-muted-foreground">Have a nice day 👋</p>
      </div>

      {/* Right */}
      <div className="flex items-center gap-4">
        {/* Home */}
        <Button variant="ghost" size="icon">
          <Link href="/">
            <Home className="w-5 h-5" />
          </Link>
        </Button>
        {/* Notification */}
        <Button variant="ghost" size="icon">
          <Bell className="w-5 h-5" />
        </Button>

        {/* User Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="flex items-center gap-2 px-2">
              <Avatar className="h-8 w-8">
                <AvatarImage src={user.avatarURL || ""} />
                <AvatarFallback>{initials}</AvatarFallback>
              </Avatar>

              <div className="text-left hidden md:block">
                <p className="text-sm font-medium">{user.fullName}</p>
                {user.role === "OWNER" && (
                  <p className="text-xs text-muted-foreground">Hotel Owner</p>
                )}
              </div>
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>

            <DropdownMenuItem>
              <User className="mr-2 h-4 w-4" />
              Profile
            </DropdownMenuItem>

            <DropdownMenuItem>
              <Settings className="mr-2 h-4 w-4" />
              Settings
            </DropdownMenuItem>

            <DropdownMenuSeparator />

            <DropdownMenuItem className="text-destructive" onClick={logout}>
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </DropdownMenuItem>
            {error && (
              <p className="text-destructive text-sm px-2 pb-2">{error}</p>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
