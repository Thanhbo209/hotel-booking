"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useOwnerRequest } from "@/features/owner/hooks/useOwnerRequest";
import { useAuthStore } from "@/stores/auth-store";

export default function OwnerRequestButton() {
  const router = useRouter();
  const user = useAuthStore((s) => s.user);

  const { requestOwner, loading } = useOwnerRequest();

  const handleClick = async () => {
    // Chưa login
    if (!user) {
      router.push("/login");
      return;
    }

    // OWNER → dashboard
    if (user.role === "OWNER") {
      router.push("/owner/dashboard");
      return;
    }

    // USER → gửi request
    if (user.role === "USER") {
      await requestOwner("Request to become hotel owner");
    }
  };

  const renderLabel = () => {
    if (!user) return "Join Now!";
    if (user.role === "OWNER") return "Go to Dashboard";
    if (loading) return "Sending...";
    return "Join Now!";
  };

  return (
    <Button onClick={handleClick} disabled={loading} className="text-md">
      {renderLabel()}
    </Button>
  );
}
