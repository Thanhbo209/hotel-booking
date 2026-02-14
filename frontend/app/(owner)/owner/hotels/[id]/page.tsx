"use client";

import { useParams } from "next/navigation";
import { useState } from "react";

import { useRooms } from "@/features/owner/hooks/useRooms";
import RoomCard from "@/features/owner/components/room-card";
import RoomFilter from "@/features/owner/components/room-filter";

import {
  createRoom,
  toggleRoomStatus,
  updateRoom,
} from "@/features/owner/services/room.service";

import { Room, CreateRoomPayload } from "@/types/room";
import { Button } from "@/components/ui/button";
import Breadcrumb from "@/components/ui/breadcrumb";
import { Plus } from "lucide-react";
import CreateRoomModal from "@/features/owner/components/room-modal";

export default function HotelDetailPage() {
  const { id: hotelId } = useParams<{ id: string }>();

  const {
    rooms = [],
    loading,
    filters,
    setFilters,
    refetch,
  } = useRooms(hotelId);

  const [open, setOpen] = useState(false);
  const [editingRoom, setEditingRoom] = useState<Room | null>(null);

  const handleCloseModal = () => {
    setOpen(false);
    setEditingRoom(null);
  };

  const handleSubmit = async (payload: CreateRoomPayload) => {
    try {
      if (editingRoom) {
        await updateRoom(editingRoom._id, payload);
      } else {
        await createRoom({
          ...payload,
          hotelId,
        });
      }

      handleCloseModal();
      refetch();
    } catch (error) {
      console.error("Save room failed:", error);
    }
  };

  return (
    <div className="p-6 space-y-6">
      <Breadcrumb />

      {/* Header */}
      <div className="flex items-center justify-between gap-4">
        <RoomFilter filters={filters} setFilters={setFilters} />

        <Button onClick={() => setOpen(true)} className="gap-2">
          <Plus className="w-4 h-4" />
          Create Room
        </Button>
      </div>

      {/* Content */}
      {loading ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="h-48 rounded-lg bg-muted animate-pulse" />
          ))}
        </div>
      ) : rooms.length === 0 ? (
        <div className="text-center py-20 text-muted-foreground">
          No rooms found. Create your first room.
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {rooms.map((room) => (
            <RoomCard
              key={room._id}
              room={room}
              onEdit={(room) => {
                setEditingRoom(room);
                setOpen(true);
              }}
              onToggleStatus={async (roomId, status) => {
                try {
                  await toggleRoomStatus(roomId, status);
                  refetch();
                } catch (err) {
                  console.error("Toggle status failed:", err);
                }
              }}
            />
          ))}
        </div>
      )}

      {/* Modal */}
      <CreateRoomModal
        open={open}
        initialData={editingRoom ?? undefined}
        onClose={handleCloseModal}
        onSubmit={handleSubmit}
      />
    </div>
  );
}
