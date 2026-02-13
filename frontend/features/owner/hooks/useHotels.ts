import { useEffect, useState } from "react";
import { getMyHotels } from "../services/hotel.service";
import { Hotel } from "@/types/hotel";
export const useHotels = () => {
  const [hotels, setHotels] = useState<Hotel[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchHotels = async () => {
    try {
      setLoading(true);
      const data = await getMyHotels();
      setHotels(data);
    } catch (err) {
      console.error("Fetch hotels error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHotels();
  }, []);

  return {
    hotels,
    loading,
    refetch: fetchHotels,
  };
};
