// src/features/owner/hooks/useOwnerRequest.ts
"use client";

import { useState } from "react";
import { ownerRequestService } from "@/features/users/services/ownerRequest.service";

export const useOwnerRequest = () => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const requestOwner = async (message?: string) => {
    try {
      setLoading(true);
      setError(null);
      setSuccess(null);

      const data = await ownerRequestService.createRequest(message);

      setSuccess(data.message || "Request sent successfully");
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : "Something went wrong!";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return {
    requestOwner,
    loading,
    success,
    error,
  };
};
