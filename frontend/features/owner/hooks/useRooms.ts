import { useEffect, useState } from "react";
import { Room, RoomFilterParams } from "@/types/room";
import { getRoomsByHotel } from "../services/room.service";

export const useRooms = (hotelId: string) => {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);

  const [filters, setFilters] = useState<RoomFilterParams>({
    page: 1,
    limit: 6,
  });

  const fetchRooms = async () => {
    setLoading(true);
    try {
      const res = await getRoomsByHotel(hotelId, filters);
      setRooms(res.rooms);
      setTotal(res.total);
    } catch (err) {
      console.error("Fetch rooms error:", err);
      setRooms([]);
      setTotal(0);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (hotelId) fetchRooms();
  }, [hotelId, filters]);

  return {
    rooms,
    total,
    loading,
    filters,
    setFilters,
    refetch: fetchRooms,
  };
};
