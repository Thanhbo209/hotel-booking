import { fetcher } from "@/lib/fetcher";
import { AmenityKey } from "@/types/hotel-amenities.types";

export interface PublicHotel {
  _id: string;
  name: string;
  images?: string[]; // mảng ảnh
  minPrice?: number;
  city?: string;
  amenities?: AmenityKey[];
  address?: string;
  rating?: number;
}

export const getPublicHotels = () => fetcher("/public/hotels");
