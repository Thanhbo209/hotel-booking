"use client";

import { useMemo } from "react";
import { useRooms } from "@/features/main/components/rooms/hooks/useRooms";
import { useRoomFilters } from "@/features/main/components/rooms/hooks/useRoomFilter";

import RoomsLayout from "@/features/main/components/rooms/components/room-layout";
import {
  RoomsLoading,
  RoomsError,
} from "@/features/main/components/rooms/components/room-state";

const RoomsPage = () => {
  const { rooms, isLoading, error } = useRooms();

  const { filters, setFilters, filteredRooms, clearFilters, hasActiveFilters } =
    useRoomFilters(rooms);

  const stats = useMemo(
    () => ({
      total: filteredRooms.length,
      hasActiveFilters,
    }),
    [filteredRooms.length, hasActiveFilters],
  );

  if (isLoading) return <RoomsLoading />;
  if (error) return <RoomsError message={error} />;

  return (
    <div className="min-h-screen">
      <RoomsLayout
        rooms={filteredRooms}
        filters={filters}
        stats={stats}
        clearFilters={clearFilters}
        setFilters={setFilters}
      />
    </div>
  );
};

export default RoomsPage;
