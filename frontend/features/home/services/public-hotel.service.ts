import { fetcher } from "@/lib/fetcher";

export interface PublicHotel {
  _id: string;
  name: string;
  images?: string[]; // mảng ảnh
  minPrice?: number;
  city?: string;
  amenities?: {
    restaurant?: boolean;
    swimmingPool?: boolean;
    gym?: boolean;
    spa?: boolean;
    parking?: boolean;
    bar?: boolean;
  };
  address?: string;
  rating?: number;
}

export const getPublicHotels = () => fetcher("/public/hotels");
