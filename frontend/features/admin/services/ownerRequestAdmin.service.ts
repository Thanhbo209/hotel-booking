// src/features/ownerRequests/services/ownerRequestAdmin.service.ts
import { fetcher } from "@/lib/fetcher";

export const ownerRequestAdminService = {
  getAll: () =>
    fetcher("/admin/owner-requests", {
      method: "GET",
    }),

  approve: (id: string) =>
    fetcher(`/admin/owner-requests/${id}/approve`, {
      method: "PATCH",
    }),

  reject: (id: string) =>
    fetcher(`/admin/owner-requests/${id}/reject`, {
      method: "PATCH",
    }),
};
