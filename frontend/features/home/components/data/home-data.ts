import { Briefcase, Camera, MapPin } from "lucide-react";
export const LOCATION_BY_REGION = {
  "North Side": ["Hà Nội", "Hạ Long", "Sapa", "Ninh Bình", "Mai Châu"],
  "Central Side": ["Đà Nẵng", "Hội An", "Huế", "Quy Nhơn", "Phong Nha"],
  "South Side": ["Hồ Chí Minh", "Nha Trang", "Đà Lạt", "Phú Quốc", "Vũng Tàu"],
};

export const STATS = [
  {
    id: 1,
    value: "2500+",
    label: "Happy Users",
    icon: Briefcase,
    iconBg: "bg-orange-100",
    iconColor: "text-primary",
  },
  {
    id: 2,
    value: "200+",
    label: "Destinations",
    icon: Camera,
    iconBg: "bg-blue-100",
    iconColor: "text-blue-600",
  },
  {
    id: 3,
    value: "100+",
    label: "Cities",
    icon: MapPin,
    iconBg: "bg-purple-100",
    iconColor: "text-purple-600",
  },
];
