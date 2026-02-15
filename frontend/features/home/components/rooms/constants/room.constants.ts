import { Wifi, Wind, Tv, Wine, DoorOpen } from "lucide-react";

export const ROOM_TYPES = [
  { value: "SINGLE", label: "Single Room" },
  { value: "DOUBLE", label: "Double Room" },
  { value: "DELUXE", label: "Deluxe Room" },
  { value: "SUITE", label: "Suite" },
] as const;

export const ROOM_AMENITIES = [
  { id: "wifi", label: "Wifi", Icon: Wifi },
  { id: "balcony", label: "Balcony", Icon: DoorOpen },
  { id: "airConditioner", label: "Air Conditioner", Icon: Wind },
  { id: "minibar", label: "Minibar", Icon: Wine },
  { id: "tv", label: "TV", Icon: Tv },
] as const;

export const SORT_OPTIONS = [
  { value: "price_asc", label: "Price: Low to High" },
  { value: "price_desc", label: "Price: High to Low" },
  { value: "capacity_desc", label: "Larger Rooms" },
  { value: "popular", label: "Most Popular" },
] as const;

export const CAPACITY_OPTIONS = [1, 2, 3, 4, 5, 6] as const;
