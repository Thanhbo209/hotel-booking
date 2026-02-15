export type RoomStatus = "ACTIVE" | "INACTIVE";
export type RoomType = "SINGLE" | "DOUBLE" | "DELUXE" | "SUITE";

export interface RoomAmenities {
  wifi?: boolean;
  airConditioner?: boolean;
  tv?: boolean;
  minibar?: boolean;
  balcony?: boolean;
  bedType?: string;
}

export interface Room {
  _id: string;
  hotelId: string;
  name: string;
  roomType: RoomType;
  pricePerNight: number;
  capacity: number;
  totalRooms: number;
  amenities: RoomAmenities;
  images: string[];
  status: RoomStatus;
  createdAt: string;
  updatedAt: string;
}

export interface RoomFilterParams {
  status?: RoomStatus;
  roomType?: RoomType;
  minPrice?: number;
  maxPrice?: number;
  page?: number;
  limit?: number;
}

export interface CreateRoomPayload {
  hotelId: string;
  name: string;
  roomType: RoomType;
  pricePerNight: number;
  capacity: number;
  totalRooms: number;
  status: RoomStatus;
  amenities: RoomAmenities;
  images: string[];
}

// Filter state for UI
export interface RoomFilterState {
  capacity: number | null;
  roomTypes: RoomType[];
  priceRange: [number, number];
  amenities: string[];
  sortBy: "default" | "price_asc" | "price_desc" | "capacity_desc" | "popular";
  checkInDate: string;
  checkOutDate: string;
  searchQuery: string;
}
