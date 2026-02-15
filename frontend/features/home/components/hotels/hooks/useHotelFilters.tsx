import { useState, useMemo } from "react";
import { PublicHotel } from "@/features/home/services/public-hotel.service";
import { FilterState } from "@/types/filter.types";

const INITIAL_FILTERS: FilterState = {
  city: "",
  priceRange: [0, 10000000],
  rating: [],
  hotelType: [],
  amenities: [],
  guests: 2,
  rooms: 1,
  checkIn: "",
  checkOut: "",
  searchQuery: "",
};

export function useHotelFilters(hotels: PublicHotel[]) {
  const [filters, setFilters] = useState<FilterState>(INITIAL_FILTERS);

  // Filter hotels based on current filters
  const filteredHotels = useMemo(() => {
    return hotels.filter((hotel) => {
      // Search by name
      if (
        filters.searchQuery &&
        !hotel.name.toLowerCase().includes(filters.searchQuery.toLowerCase())
      ) {
        return false;
      }

      // Filter by city
      if (filters.city && hotel.city !== filters.city) {
        return false;
      }

      // Filter by rating
      if (filters.rating.length > 0 && hotel.rating) {
        if (!filters.rating.includes(Math.floor(hotel.rating))) {
          return false;
        }
      }

      // TODO: Add logic for price, hotel type, amenities filtering when data is available

      return true;
    });
  }, [hotels, filters]);

  // Clear all filters
  const clearFilters = () => {
    setFilters(INITIAL_FILTERS);
  };

  // Check if any filters are active
  const hasActiveFilters =
    filters.city ||
    filters.rating.length > 0 ||
    filters.hotelType.length > 0 ||
    filters.amenities.length > 0 ||
    filters.searchQuery;

  return {
    filters,
    setFilters,
    filteredHotels,
    clearFilters,
    hasActiveFilters,
  };
}
