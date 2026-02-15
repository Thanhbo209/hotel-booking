import { AmenityKey } from "@/types/hotel-amenities.types";

export interface FilterState {
  city: string;
  priceRange: [number, number];
  rating: number[];
  amenities: AmenityKey[];
  searchQuery: string;
}

export const INITIAL_FILTERS: FilterState = {
  city: "",
  priceRange: [0, 10_000_000],
  rating: [],
  amenities: [],
  searchQuery: "",
};
