import { useEffect, useState } from "react";
import { Room } from "@/types/room";
import { getPublicRooms, GetRoomsParams } from "../services/room.service";

export const useRooms = (params?: GetRoomsParams) => {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchRooms = async () => {
    try {
      setIsLoading(true);
      setError(null);

      const data = await getPublicRooms(params);
      setRooms(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load rooms");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchRooms();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(params)]);

  return {
    rooms,
    isLoading,
    error,
    refetch: fetchRooms,
  };
};
