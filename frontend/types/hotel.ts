import { Room } from "@/types/room";

export interface Hotel {
  _id: string;
  name: string;
  description?: string;
  address: string;
  city?: string;
  rating: number;
  images?: string[];
  minPrice?: number;
  amenities?: Amenities;

  createdAt?: string;
  updatedAt?: string;
}

export interface Amenities {
  restaurant: boolean;
  swimmingPool: boolean;
  gym: boolean;
  spa: boolean;
  parking: boolean;
  bar?: boolean;
}

export interface CreateHotelPayload {
  name: string;
  address: string;
  city: string;
  description?: string;
  amenities: Amenities;
  images: string[];
}

export const EMPTY_AMENITIES: Amenities = {
  restaurant: false,
  swimmingPool: false,
  gym: false,
  spa: false,
  parking: false,
  bar: false,
};

export interface PopulatedHotel {
  _id: string;
  name: string;
  city?: string;
  address?: string;
}
export type PublicRoom = Omit<Room, "hotelId"> & {
  hotelId: PopulatedHotel;
};
