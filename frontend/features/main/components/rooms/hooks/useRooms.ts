import { useEffect, useState } from "react";
import { PublicRoom } from "@/types/hotel";
import { getPublicRooms, GetRoomsParams } from "../services/room.service";

export const useRooms = (params?: GetRoomsParams) => {
  const [rooms, setRooms] = useState<PublicRoom[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();

    const fetchRooms = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const data = await getPublicRooms(params, controller.signal);

        if (!controller.signal.aborted) {
          setRooms(data);
        }
      } catch (err: any) {
        if (controller.signal.aborted || err?.name === "AbortError") {
          return;
        }

        setError(err instanceof Error ? err.message : "Failed to load rooms");
      } finally {
        if (!controller.signal.aborted) {
          setIsLoading(false);
        }
      }
    };

    fetchRooms();

    return () => {
      controller.abort();
    };
  }, [JSON.stringify(params)]);

  return {
    rooms,
    isLoading,
    error,
  };
};
