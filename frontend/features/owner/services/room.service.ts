import { fetcher } from "@/lib/fetcher";
import {
  Room,
  RoomFilterParams,
  CreateRoomPayload,
  RoomStatus,
} from "@/types/room";

/**
 * GET rooms by hotel
 * GET /hotels/:hotelId/rooms
 */
export const getRoomsByHotel = (
  hotelId: string,
  params: RoomFilterParams,
): Promise<{ rooms: Room[]; total: number }> => {
  const query = new URLSearchParams(
    Object.entries(params)
      .filter(([, v]) => v !== undefined)
      .map(([k, v]) => [k, String(v)]),
  );

  return fetcher(`/owner/hotels/${hotelId}/rooms?${query.toString()}`);
};

/**
 * CREATE room
 * POST /rooms
 */
export const createRoom = (payload: CreateRoomPayload): Promise<Room> => {
  return fetcher("/owner/rooms", {
    method: "POST",
    body: JSON.stringify(payload),
  });
};

/**
 * UPDATE room
 * PUT /rooms/:id
 */
export const updateRoom = (
  roomId: string,
  payload: Partial<Omit<Room, "_id" | "hotelId">>,
): Promise<Room> => {
  return fetcher(`/owner/rooms/${roomId}`, {
    method: "PUT",
    body: JSON.stringify(payload),
  });
};

/**
 * TOGGLE room status
 * PATCH /rooms/:id/status
 */
export const toggleRoomStatus = (
  roomId: string,
  status: RoomStatus,
): Promise<Room> => {
  return fetcher(`/owner/rooms/${roomId}/status`, {
    method: "PATCH",
    body: JSON.stringify({ status }),
  });
};
