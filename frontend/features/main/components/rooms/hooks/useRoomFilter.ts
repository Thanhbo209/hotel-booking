import { useState, useMemo } from "react";
import { Room, RoomFilterState } from "@/types/room";
import { PublicRoom } from "@/types/hotel";

const INITIAL_FILTERS: RoomFilterState = {
  capacity: null,
  roomTypes: [],
  priceRange: [0, 10000000],
  amenities: [],
  sortBy: "default",
  checkInDate: "",
  checkOutDate: "",
  searchQuery: "",
};

export function useRoomFilters(rooms: PublicRoom[]) {
  const [filters, setFilters] = useState<RoomFilterState>(INITIAL_FILTERS);

  // Filter and sort rooms
  const filteredRooms = useMemo(() => {
    let result = rooms.filter((room) => {
      // Only show active rooms
      if (room.status !== "ACTIVE") return false;

      // Search by room name
      if (
        filters.searchQuery &&
        !room.name.toLowerCase().includes(filters.searchQuery.toLowerCase())
      ) {
        return false;
      }

      // Filter by capacity
      if (filters.capacity && room.capacity < filters.capacity) {
        return false;
      }

      // Filter by room type
      if (
        filters.roomTypes.length > 0 &&
        !filters.roomTypes.includes(room.roomType)
      ) {
        return false;
      }

      // Filter by price range
      if (
        room.pricePerNight < filters.priceRange[0] ||
        room.pricePerNight > filters.priceRange[1]
      ) {
        return false;
      }

      // Filter by amenities
      if (filters.amenities.length > 0) {
        const hasAllAmenities = filters.amenities.every((amenity) => {
          return (
            room.amenities[amenity as keyof typeof room.amenities] === true
          );
        });
        if (!hasAllAmenities) return false;
      }

      return true;
    });

    // Apply sorting
    if (filters.sortBy) {
      result = [...result].sort((a, b) => {
        switch (filters.sortBy) {
          case "price_asc":
            return a.pricePerNight - b.pricePerNight;
          case "price_desc":
            return b.pricePerNight - a.pricePerNight;
          case "capacity_desc":
            return b.capacity - a.capacity;
          case "popular":
            // Mock popularity - in real app, use booking count or rating
            return 0;
          default:
            return 0;
        }
      });
    }

    return result;
  }, [rooms, filters]);

  // Clear all filters
  const clearFilters = () => {
    setFilters(INITIAL_FILTERS);
  };

  // Check if any filters are active
  const hasActiveFilters =
    filters.capacity !== null ||
    filters.roomTypes.length > 0 ||
    filters.amenities.length > 0 ||
    filters.priceRange[0] !== 0 ||
    filters.priceRange[1] !== 10000000 ||
    filters.sortBy !== "default" ||
    filters.searchQuery !== "";

  return {
    filters,
    setFilters,
    filteredRooms,
    clearFilters,
    hasActiveFilters,
  };
}
