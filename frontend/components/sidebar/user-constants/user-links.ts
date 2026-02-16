// config/ownerLinks.tsx
import {
  LayoutDashboard,
  MessageSquare,
  HelpCircle,
  Settings,
  DollarSign,
  Star,
  BookImageIcon,
} from "lucide-react";

export const USER_SIDEBAR_LINKS = [
  {
    label: "Dashboard",
    path: "/owner/dashboard",
    icon: LayoutDashboard,
  },
  {
    label: "My Bookings",
    path: "/owner/hotels",
    icon: BookImageIcon,
  },
  {
    label: "Ratings",
    path: "/owner/bookings",
    icon: Star,
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
