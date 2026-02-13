import { useState } from "react";
import { createHotel } from "../services/hotel.service";
import { toast } from "sonner";
import { CreateHotelPayload } from "@/types/hotel";

export const useCreateHotel = () => {
  const [loading, setLoading] = useState(false);

  const submit = async (payload: CreateHotelPayload) => {
    try {
      setLoading(true);
      await createHotel(payload);
      toast.success("Tạo hotel thành công");
    } catch (err: any) {
      console.error(err);
      toast.error(err?.message || "Tạo hotel thất bại");
    } finally {
      setLoading(false);
    }
  };

  return { submit, loading };
};
