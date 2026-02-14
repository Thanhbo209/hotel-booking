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

/* UPDATE */
export const updateHotel = (id: string, payload: CreateHotelPayload) => {
  return fetcher(`/owner/hotels/${id}`, {
    method: "PUT",
    body: JSON.stringify(payload),
  });
};

/* DELETE */
export const deleteHotel = (id: string) => {
  return fetcher(`/owner/hotels/${id}`, {
    method: "DELETE",
  });
};
