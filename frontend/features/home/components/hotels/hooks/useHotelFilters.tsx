import { useMemo, useState } from "react";
import { PublicHotel } from "@/features/home/services/public-hotel.service";
import { FilterState, INITIAL_FILTERS } from "@/types/filter.types";

export function useHotelFilters(hotels: PublicHotel[]) {
  const [filters, setFilters] = useState<FilterState>(INITIAL_FILTERS);

  const filteredHotels = useMemo(() => {
    return hotels.filter((hotel) => {
      // 🔍 Search
      if (
        filters.searchQuery &&
        !hotel.name.toLowerCase().includes(filters.searchQuery.toLowerCase())
      ) {
        return false;
      }

      // 📍 City
      if (filters.city && hotel.city !== filters.city) {
        return false;
      }

      // ⭐ Rating (>=) – an toàn với rating = 0 | undefined
      if (filters.rating.length) {
        const rating = hotel.rating ?? 0;
        if (!filters.rating.some((r) => rating >= r)) {
          return false;
        }
      }

      // 💰 Price – chỉ filter khi hotel có price
      const [min, max] = filters.priceRange;
      if (hotel.minPrice != null) {
        if (hotel.minPrice < min || hotel.minPrice > max) {
          return false;
        }
      }

      if (filters.amenities.length) {
        const hasAll = filters.amenities.every((key) =>
          hotel.amenities.includes(key),
        );

        if (!hasAll) return false;
      }

      return true;
    });
  }, [hotels, filters]);

  const clearFilters = () => setFilters(INITIAL_FILTERS);

  const hasActiveFilters =
    Boolean(filters.city) ||
    Boolean(filters.searchQuery) ||
    filters.rating.length > 0 ||
    filters.amenities.length > 0;

  return {
    filters,
    setFilters,
    filteredHotels,
    clearFilters,
    hasActiveFilters,
  };
}
