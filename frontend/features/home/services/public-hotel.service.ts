import { fetcher } from "@/lib/fetcher";

export interface PublicHotel {
  _id: string;
  name: string;
  images?: string[]; // mảng ảnh
  address?: string;
  minPrice?: number;
}

export const getPublicHotels = () => fetcher("/public/hotels");
