// src/features/owner/services/ownerRequest.service.ts
import { fetcher } from "@/lib/fetcher";

export const ownerRequestService = {
  createRequest: (message?: string) => {
    return fetcher("/users/create-request", {
      method: "POST",
      body: JSON.stringify({ message }),
    });
  },
};
