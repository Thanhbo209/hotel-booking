import { useState } from "react";
import { toast } from "sonner";
import { deleteHotel } from "../services/hotel.service";

export const useDeleteHotel = () => {
  const [loading, setLoading] = useState(false);

  const remove = async (id: string) => {
    try {
      setLoading(true);
      await deleteHotel(id);
      toast.success("Hotel deleted successfully");
      return true;
    } catch (error: unknown) {
      let message = "Failed to delete hotel";

      if (error instanceof Error) {
        message = error.message;
      }

      toast.error(message);
      return false;
    } finally {
      setLoading(false);
    }
  };

  return { remove, loading };
};
