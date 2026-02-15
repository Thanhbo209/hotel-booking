import { fetcher } from "@/lib/fetcher";
import { Room } from "@/types/room";

export interface GetRoomsParams {
  hotelId?: string;
  minPrice?: number;
  maxPrice?: number;
  capacity?: number;
  roomType?: string;
}

export const getPublicRooms = async (
  params?: GetRoomsParams,
): Promise<Room[]> => {
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
  });

  // backend đang trả: { rooms, total }
  return res.rooms ?? res;
};
