"use client";

import { useEffect, useState, useCallback } from "react";
import { ownerRequestAdminService } from "@/features/admin/services/ownerRequestAdmin.service";
import { toast } from "sonner";

export interface OwnerRequest {
  _id: string;
  message?: string;
  createdAt: string;
  user: {
    _id: string;
    fullName: string;
    email: string;
    avatarURL?: string;
  };
}

export default function useOwnerRequestsAdmin() {
  const [requests, setRequests] = useState<OwnerRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [actionId, setActionId] = useState<string | null>(null);

  const fetchRequests = useCallback(async () => {
    try {
      const data = await ownerRequestAdminService.getAll();
      setRequests(data);
    } catch (err: any) {
      toast.error(err.message || "Failed to fetch requests");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchRequests();
  }, [fetchRequests]);

  const approve = async (id: string) => {
    setActionId(id);
    try {
      await ownerRequestAdminService.approve(id);
      toast.success("User promoted to OWNER");
      setRequests((prev) => prev.filter((r) => r._id !== id));
    } catch (err: any) {
      toast.error(err.message);
    } finally {
      setActionId(null);
    }
  };

  const reject = async (id: string) => {
    setActionId(id);
    try {
      await ownerRequestAdminService.reject(id);
      toast.success("Request rejected");
      setRequests((prev) => prev.filter((r) => r._id !== id));
    } catch (err: any) {
      toast.error(err.message);
    } finally {
      setActionId(null);
    }
  };

  return {
    requests,
    loading,
    actionId,
    approve,
    reject,
  };
}
