export interface FilterState {
  city: string;
  priceRange: [number, number];
  rating: number[];
  hotelType: string[];
  amenities: string[];
  guests: number;
  rooms: number;
  checkIn: string;
  checkOut: string;
  searchQuery: string;
}
