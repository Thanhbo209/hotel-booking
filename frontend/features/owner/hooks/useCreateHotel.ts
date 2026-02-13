import { useState } from "react";
import { createHotel } from "../services/hotel.service";
import { toast } from "sonner";
import { CreateHotelPayload } from "@/types/hotel";

export const useCreateHotel = () => {
  const [loading, setLoading] = useState(false);

  const submit = async (payload: CreateHotelPayload) => {
    try {
      setLoading(true);
      const result = await createHotel(payload);
      toast.success("Create hotel successfully");
      return result;
    } catch (err: any) {
      console.error(err);
      toast.error(err?.message || "Failed to create hotel");
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { submit, loading };
};
