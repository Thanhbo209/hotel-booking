import { useState } from "react";
import { toast } from "sonner";
import { updateHotel } from "../services/hotel.service";
import { CreateHotelPayload } from "@/types/hotel";

export const useUpdateHotel = () => {
  const [loading, setLoading] = useState(false);

  const submit = async (id: string, payload: CreateHotelPayload) => {
    try {
      setLoading(true);
      const result = await updateHotel(id, payload);
      toast.success("Hotel updated successfully");
      return result;
    } catch (error: unknown) {
      let message = "Failed to update hotel";

      if (error instanceof Error) {
        message = error.message;
      }

      toast.error(message);
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { submit, loading };
};
