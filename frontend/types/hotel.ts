export interface Hotel {
  _id: string;
  name: string;
  description?: string;
  address: string;
  city?: string;
  rating: number;
  amenities?: {
    restaurant?: boolean;
    swimmingPool?: boolean;
    gym?: boolean;
    spa?: boolean;
    parking?: boolean;
    bar?: boolean;
  };
  createdAt?: string;
  updatedAt?: string;
}
export interface Amenities {
  wifi: boolean;
  parking: boolean;
  pool: boolean;
  restaurant: boolean;
  gym: boolean;
}

export interface CreateHotelPayload {
  name: string;
  address: string;
  city: string;
  description?: string;
  amenities: Amenities;
  available: boolean;
  images: string[];
}
