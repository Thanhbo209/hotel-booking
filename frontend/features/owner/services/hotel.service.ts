import { fetcher } from "@/lib/fetcher";
import { CreateHotelPayload } from "@/types/hotel";

export const createHotel = (payload: CreateHotelPayload) => {
  return fetcher("/owner/hotels", {
    method: "POST",
    body: JSON.stringify(payload),
  });
};

export const getMyHotels = async () => {
  return fetcher("/owner/hotels", {
    method: "GET",
  });
};
