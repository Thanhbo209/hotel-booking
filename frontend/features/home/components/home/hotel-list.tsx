"use client";

import Image from "next/image";
import { usePublicHotels } from "@/features/home/hooks/usePublicHotels";

export const HotelList = () => {
  const { hotels, loading, error } = usePublicHotels();

  if (loading) return <p className="mt-8">Loading hotels...</p>;
  if (error) return <p className="mt-8 text-red-500">{error}</p>;

  if (hotels.length === 0) {
    return (
      <p className="mt-8 text-muted-foreground">No hotels available yet.</p>
    );
  }

  return (
    <div className="w-full max-w-6xl mt-12">
      <h2 className="text-2xl font-semibold mb-6">Available Hotels</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {hotels.map((hotel) => {
          const imageSrc =
            Array.isArray(hotel.images) && hotel.images.length > 0
              ? hotel.images[0]
              : "https://images.unsplash.com/photo-1445019980597-93fa8acb246c?q=80&w=1174&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

          return (
            <div
              key={hotel._id}
              className="rounded-xl  overflow-hidden  shadow-sm hover:shadow-md transition"
            >
              {/* Image */}
              <div className="relative h-48 w-full">
                <Image
                  src={imageSrc}
                  alt={hotel.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>

              {/* Content */}
              <div className="p-4 space-y-1">
                <h3 className="font-semibold text-lg">{hotel.name}</h3>

                {hotel.address && (
                  <p className="text-sm text-muted-foreground truncate">
                    {hotel.address}
                  </p>
                )}

                {hotel.minPrice && (
                  <p className="pt-2 font-medium text-primary">
                    From {hotel.minPrice.toLocaleString()}₫ / night
                  </p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
