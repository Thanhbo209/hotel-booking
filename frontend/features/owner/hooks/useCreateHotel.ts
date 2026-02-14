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
    } catch (error: unknown) {
      console.error(error);

      let message = "Failed to create hotel";

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
