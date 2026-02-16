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
    path: "/user/dashboard",
    icon: LayoutDashboard,
  },
  {
    label: "My Bookings",
    path: "/user/hotels",
    icon: BookImageIcon,
  },
  {
    label: "Ratings",
    path: "/user/bookings",
    icon: Star,
  },
  {
    label: "Refund",
    path: "/user/refund",
    icon: DollarSign,
  },
  {
    label: "Message",
    path: "/user/message",
    icon: MessageSquare,
    position: "bottom" as const,
  },
  {
    label: "Help",
    path: "/user/help",
    icon: HelpCircle,
    position: "bottom" as const,
  },
  {
    label: "Settings",
    path: "/user/settings",
    icon: Settings,
    position: "bottom" as const,
  },
];
