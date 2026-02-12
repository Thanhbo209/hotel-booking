// config/ownerLinks.tsx
import {
  LayoutDashboard,
  Building2,
  FileText,
  MessageSquare,
  HelpCircle,
  Settings,
  DollarSign,
} from "lucide-react";

export const OWNER_SIDEBAR_LINKS = [
  {
    label: "Dashboard",
    path: "/owner/dashboard",
    icon: LayoutDashboard,
  },
  {
    label: "My Hotels",
    path: "/owner/hotels",
    icon: Building2,
  },
  {
    label: "Bookings",
    path: "/owner/bookings",
    icon: FileText,
  },
  {
    label: "Refund",
    path: "/owner/refund",
    icon: DollarSign,
  },
  {
    label: "Message",
    path: "/owner/message",
    icon: MessageSquare,
    position: "bottom" as const,
  },
  {
    label: "Help",
    path: "/owner/help",
    icon: HelpCircle,
    position: "bottom" as const,
  },
  {
    label: "Settings",
    path: "/owner/settings",
    icon: Settings,
    position: "bottom" as const,
  },
];
