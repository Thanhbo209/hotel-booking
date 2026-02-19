import { fetcher } from "@/lib/fetcher";
import { PublicRoom } from "@/types/hotel";

export interface GetRoomsParams {
  hotelId?: string;
  minPrice?: number;
  maxPrice?: number;
  capacity?: number;
  roomType?: string;
}

export const getPublicRoomById = async (
  id: string,
  signal?: AbortSignal,
): Promise<PublicRoom> => {
  const res = await fetcher(`/public/rooms/${id}`, {
    method: "GET",
    signal,
  });

  return res.room || res.data || res;
};

export const getPublicRooms = async (
  params?: GetRoomsParams,
  signal?: AbortSignal,
): Promise<PublicRoom[]> => {
  const query = new URLSearchParams();

  if (params?.hotelId) query.append("hotelId", params.hotelId);
  if (params?.minPrice !== undefined)
    query.append("minPrice", params.minPrice.toString());
  if (params?.maxPrice !== undefined)
    query.append("maxPrice", params.maxPrice.toString());
  if (params?.capacity !== undefined)
    query.append("capacity", params.capacity.toString());
  if (params?.roomType) query.append("roomType", params.roomType);

  const queryString = query.toString();
  const url = `/public/rooms${queryString ? `?${queryString}` : ""}`;

  const res = await fetcher(url, {
    method: "GET",
    signal,
  });

  return res.rooms || res.data || res;
};

export const getRelatedRooms = async (
  id: string,
  signal?: AbortSignal,
): Promise<PublicRoom[]> => {
  const res = await fetcher(`/public/rooms/${id}/related`, {
    method: "GET",
    signal,
  });

  return res.rooms ?? res;
};
