"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import HotelCard from "@/features/owner/components/hotel-card";
import CreateHotelModal from "@/features/owner/components/hotel-form";
import HotelCardSkeleton from "@/features/owner/components/hotels-skeleton";
import Breadcrumb from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";

import { useHotels } from "@/features/owner/hooks/useHotels";
import { useDeleteHotel } from "@/features/owner/hooks/useDeleteHotel";
import { Hotel } from "@/types/hotel";

export default function HotelsPage() {
  const router = useRouter();

  const { hotels, loading, refetch } = useHotels();
  const { remove } = useDeleteHotel();

  const [open, setOpen] = useState(false);
  const [editHotel, setEditHotel] = useState<Hotel | null>(null);

  const handleCreate = () => {
    setEditHotel(null);
    setOpen(true);
  };

  const handleEdit = (hotel: Hotel) => {
    setEditHotel(hotel);
    setOpen(true);
  };

  const handleClose = (value: boolean) => {
    setOpen(value);
    if (!value) setEditHotel(null);
  };

  return (
    <div className="p-6 space-y-6">
      <Breadcrumb />

      {/* Header */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold">My Hotels</h2>
        <Button onClick={handleCreate}>Add Hotel</Button>
      </div>

      {/* Loading */}
      {loading && (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <HotelCardSkeleton key={i} />
          ))}
        </div>
      )}

      {/* Empty */}
      {!loading && hotels.length === 0 && (
        <div className="text-center py-20 text-muted-foreground">
          No Hotel Yet.
        </div>
      )}

      {/* List */}
      {!loading && hotels.length > 0 && (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {hotels.map((hotel) => (
            <HotelCard
              key={hotel._id}
              hotel={hotel}
              onClick={(id) => router.push(`/owner/hotels/${id}`)}
              onEdit={handleEdit}
              onDelete={async (id) => {
                if (!confirm("Delete this hotel?")) return;
                const ok = await remove(id);
                if (ok) refetch();
              }}
            />
          ))}
        </div>
      )}

      <CreateHotelModal
        open={open}
        setOpen={handleClose}
        mode={editHotel ? "edit" : "create"}
        defaultValue={editHotel}
        onSuccess={() => {
          refetch();
          setOpen(false);
        }}
      />
    </div>
  );
}
