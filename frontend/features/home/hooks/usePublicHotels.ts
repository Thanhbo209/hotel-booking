"use client";

import { useEffect, useState } from "react";
import { getPublicHotels, PublicHotel } from "../services/public-hotel.service";

export const usePublicHotels = () => {
  const [hotels, setHotels] = useState<PublicHotel[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getPublicHotels()
      .then(setHotels)
      .catch((err) =>
        setError(err instanceof Error ? err.message : "Failed to load hotels"),
      )
      .finally(() => setLoading(false));
  }, []);

  return { hotels, loading, error };
};
