"use client";

import { useRouter } from "next/navigation";
import { signOut } from "@/features/auth/services/auth.service";
import { useAuthStore } from "@/stores/auth-store"; // hoặc context
import { useState } from "react";
export const useLogout = () => {
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const clearAuth = useAuthStore((s) => s.clearAuth);

  const logout = async () => {
    try {
      setError(null);
      await signOut();

      clearAuth();

      // redirect
      router.push("/login");
      router.refresh();
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Logout failed";
      setError(message);
    }
  };

  return { logout, error };
};
