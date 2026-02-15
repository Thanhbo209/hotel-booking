import { fetcher } from "@/lib/fetcher";
import { PublicRoom } from "@/types/hotel";

export interface GetRoomsParams {
  hotelId?: string;
  minPrice?: number;
  maxPrice?: number;
  capacity?: number;
  roomType?: string;
}

export const getPublicRooms = async (
  params?: GetRoomsParams,
  signal?: AbortSignal,
): Promise<PublicRoom[]> => {
  const query = new URLSearchParams();

  if (params?.hotelId) query.append("hotelId", params.hotelId);
  if (params?.minPrice) query.append("minPrice", params.minPrice.toString());
  if (params?.maxPrice) query.append("maxPrice", params.maxPrice.toString());
  if (params?.capacity) query.append("capacity", params.capacity.toString());
  if (params?.roomType) query.append("roomType", params.roomType);

  const queryString = query.toString();
  const url = `/public/rooms${queryString ? `?${queryString}` : ""}`;

  const res = await fetcher(url, {
    method: "GET",
    signal,
  });

  return res.rooms ?? res;
};
