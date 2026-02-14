import { fetcher } from "@/lib/fetcher";

export interface PublicHotel {
  _id: string;
  name: string;
  images?: string[]; // mảng ảnh
  city?: string;
  rating?: number;
}

export const getPublicHotels = () => fetcher("/public/hotels");
