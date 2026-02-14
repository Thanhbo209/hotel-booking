export interface Hotel {
  _id: string;
  name: string;
  description?: string;
  address: string;
  city?: string;
  rating: number;
  images?: string[];

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
  available: boolean;
  images: string[];
}
