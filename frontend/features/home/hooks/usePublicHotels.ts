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
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  return { hotels, loading, error };
};
