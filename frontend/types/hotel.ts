export interface CreateHotelPayload {
  name: string;
  address: string;
  city: string;
  description?: string;
  amenities: {
    wifi: boolean;
    parking: boolean;
    pool: boolean;
    restaurant: boolean;
    gym: boolean;
  };
  available: boolean;
  images: string[];
}
