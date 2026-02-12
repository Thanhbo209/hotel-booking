// config/adminLinks.tsx
import {
  LayoutDashboard,
  Users,
  Building2,
  FileText,
  DollarSign,
  MessageSquare,
  HelpCircle,
  Settings,
  Inbox,
} from "lucide-react";

export const ADMIN_SIDEBAR_LINKS = [
  {
    label: "Dashboard",
    path: "/admin/dashboard",
    icon: LayoutDashboard,
  },
  {
    label: "Users",
    path: "/admin/users",
    icon: Users,
  },
  {
    label: "Owner Request",
    path: "/admin/request",
    icon: Inbox,
  },
  {
    label: "Hotel Owners",
    path: "/admin/hotel-owners",
    icon: Building2,
  },
  {
    label: "Booking Details",
    path: "/admin/bookings",
    icon: FileText,
  },
  {
    label: "Refund",
    path: "/admin/refund",
    icon: DollarSign,
  },
  {
    label: "Message",
    path: "/admin/message",
    icon: MessageSquare,
    position: "bottom" as const,
  },
  {
    label: "Help",
    path: "/admin/help",
    icon: HelpCircle,
    position: "bottom" as const,
  },
  {
    label: "Setting",
    path: "/admin/settings",
    icon: Settings,
    position: "bottom" as const,
  },
];
