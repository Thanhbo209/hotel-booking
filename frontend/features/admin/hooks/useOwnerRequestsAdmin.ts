// src/features/ownerRequests/hooks/useOwnerRequestsAdmin.ts
"use client";

import { useEffect, useState } from "react";
import { ownerRequestAdminService } from "../services/ownerRequestAdmin.service";

export interface OwnerRequest {
  _id: string;
  user: {
    name: string;
    email: string;
  };
  message?: string;
  status: "PENDING" | "APPROVED" | "REJECTED";
  createdAt: string;
}

export const useOwnerRequestsAdmin = () => {
  const [data, setData] = useState<OwnerRequest[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchRequests = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await ownerRequestAdminService.getAll();
      setData(res);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load requests");
    } finally {
      setLoading(false);
    }
  };

  const approve = async (id: string) => {
    await ownerRequestAdminService.approve(id);
    fetchRequests();
  };

  const reject = async (id: string) => {
    await ownerRequestAdminService.reject(id);
    fetchRequests();
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  return {
    data,
    loading,
    error,
    approve,
    reject,
  };
};
