import {
  Wifi,
  Car,
  Dumbbell,
  Dog,
  UtensilsCrossed,
  Waves,
  Sparkles,
} from "lucide-react";

export const HOTEL_TYPES = ["Hotel", "Resort", "Homestay", "Villa"] as const;

export const AMENITIES = [
  { id: "wifi", label: "Wifi", Icon: Wifi },
  { id: "pool", label: "Bể bơi", Icon: Waves },
  { id: "parking", label: "Bãi đỗ xe", Icon: Car },
  { id: "gym", label: "Gym", Icon: Dumbbell },
  { id: "pet", label: "Pet-friendly", Icon: Dog },
  { id: "restaurant", label: "Nhà hàng", Icon: UtensilsCrossed },
  { id: "spa", label: "Spa", Icon: Sparkles },
] as const;

export const CITIES = [
  "Hà Nội",
  "TP. Hồ Chí Minh",
  "Đà Nẵng",
  "Nha Trang",
  "Phú Quốc",
  "Hội An",
  "Đà Lạt",
  "Vũng Tàu",
] as const;
