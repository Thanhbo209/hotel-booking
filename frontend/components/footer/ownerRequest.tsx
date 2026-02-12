"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useOwnerRequest } from "@/features/users/hooks/useOwnerRequest";
import { useAuthStore } from "@/stores/auth-store";

export default function OwnerRequestButton() {
  const router = useRouter();
  const user = useAuthStore((s) => s.user);

  const { requestOwner, loading, success, error } = useOwnerRequest();

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
      return;
    }

    // ⚠️ Fallback cho role không xác định
    console.error("Unexpected user role in OwnerRequestButton:", user.role);

    // Có thể redirect về trang an toàn
    router.push("/");
    // hoặc sau này thay bằng toast/error UI
  };

  const renderLabel = () => {
    if (!user) return "Join Now!";
    if (user.role === "OWNER") return "Go to Dashboard";
    if (loading) return "Sending...";
    return "Join Now!";
  };

  return (
    <div className="flex flex-col gap-5">
      {success && <p className="text-green-600 text-sm mt-1">{success}</p>}
      {error && <p className="text-red-600 text-sm mt-1">{error}</p>}
      <Button onClick={handleClick} disabled={loading} className="text-md">
        {renderLabel()}
      </Button>
    </div>
  );
}
