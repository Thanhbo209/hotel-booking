// src/features/auth/hooks/useHydrateAuth.ts
"use client";

import { useEffect } from "react";
import { useAuthStore } from "@/stores/auth-store";
import { getMe } from "@/features/auth/services/auth.service";

export const useHydrateAuth = () => {
  const setUser = useAuthStore((s) => s.setUser);
  const clearAuth = useAuthStore((s) => s.clearAuth);

  useEffect(() => {
    const hydrate = async () => {
      try {
        const user = await getMe();
        setUser(user);
      } catch {
        clearAuth();
      }
    };

    hydrate();
  }, []);
};
