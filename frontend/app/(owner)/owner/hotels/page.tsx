"use client";

import HotelCard from "@/features/owner/components/hotel-card";
import CreateHotelModal from "@/features/owner/components/hotel-form";
import { useHotels } from "@/features/owner/hooks/useHotels";
import HotelCardSkeleton from "@/features/owner/components/hotels-skeleton";
import Breadcrumb from "@/components/ui/breadcrumb";

export default function HotelsPage() {
  const { hotels, loading } = useHotels();

  return (
    <div className="p-6 space-y-6">
      <Breadcrumb />
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold">My Hotels</h2>
        <CreateHotelModal />
      </div>

      {/* Loading */}
      {loading && (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <HotelCardSkeleton key={i} />
          ))}
        </div>
      )}

      {/* Empty state */}
      {!loading && hotels.length === 0 && (
        <div className="text-center py-20 text-muted-foreground">
          Bạn chưa có khách sạn nào.
        </div>
      )}

      {/* Hotel List */}
      {!loading && hotels.length > 0 && (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {hotels.map((hotel) => (
            <HotelCard
              key={hotel._id}
              hotel={hotel}
              onClick={(id) => console.log("Click hotel:", id)}
            />
          ))}
        </div>
      )}
    </div>
  );
}
