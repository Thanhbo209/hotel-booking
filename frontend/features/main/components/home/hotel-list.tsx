"use client";

import Image from "next/image";
import { usePublicHotels } from "@/features/main/hooks/usePublicHotels";
import { MapPin, Star } from "lucide-react";

export const HotelList = () => {
  const { hotels, loading, error } = usePublicHotels();

  if (loading) {
    return (
      <div className="w-full max-w-7xl mx-auto mt-12 px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, idx) => (
            <div key={idx} className="animate-pulse">
              <div className="aspect-4/3 bg-muted rounded-2xl mb-4" />
              <div className="h-6 bg-muted rounded w-3/4 mb-2" />
              <div className="h-4 bg-muted rounded w-1/2" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full max-w-7xl mx-auto mt-12 px-4">
        <div className="text-center py-12  rounded-2xl">
          <p className="text-red-600 font-medium">{error}</p>
        </div>
      </div>
    );
  }

  if (hotels.length === 0) {
    return (
      <div className="w-full max-w-7xl mx-auto mt-12 px-4">
        <div className="text-center py-16  rounded-2xl">
          <div className="w-24 h-24 mx-auto mb-4  rounded-full flex items-center justify-center"></div>
          <p className=" text-lg">No hotels available yet.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-7xl mx-auto mt-12 px-4">
      <div className="mb-8">
        <h2 className="text-3xl font-bold mb-2">Featured Hotels</h2>
        <p className="text-muted-foreground">Discover amazing places to stay</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {hotels.map((hotel) => {
          const fallbackImage =
            "https://images.unsplash.com/photo-1445019980597-93fa8acb246c?q=80&w=1174&auto=format&fit=crop";

          const validImages = Array.isArray(hotel.images)
            ? hotel.images.filter(
                (img) => typeof img === "string" && img.trim() !== "",
              )
            : [];

          const images = validImages.length > 0 ? validImages : [fallbackImage];

          const mainImage = images[0];

          const hasMultipleImages = images.length > 1;

          return (
            <div
              key={hotel._id}
              className="group relative rounded-2xl overflow-hidden  shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer"
            >
              {/* Image Grid */}
              <div className="relative h-80">
                {hasMultipleImages ? (
                  <div className="flex h-full gap-1">
                    {/* Main Image - Left Side */}
                    <div className="relative flex-1">
                      <Image
                        src={mainImage}
                        alt={hotel.name}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                        sizes="(max-width: 768px) 100vw, 50vw"
                      />
                    </div>

                    {/* Small Images - Right Side */}
                    <div className="flex flex-col gap-1 w-1/2">
                      {images.slice(1, 3).map((img, idx) => (
                        <div key={idx} className="relative flex-1">
                          <Image
                            src={img}
                            alt={`${hotel.name} - ${idx + 2}`}
                            fill
                            className="object-cover group-hover:scale-110 transition-transform duration-500"
                            sizes="(max-width: 768px) 50vw, 25vw"
                          />
                        </div>
                      ))}

                      {/* Show more indicator if there are more than 3 images */}
                      {images.length > 3 && (
                        <div className="absolute bottom-2 right-2 px-3 py-1.5  backdrop-blur-sm rounded-lg text-sm font-semibold ">
                          +{images.length - 3}
                        </div>
                      )}
                    </div>
                  </div>
                ) : (
                  // Single Image Layout
                  <Image
                    src={mainImage}
                    alt={hotel.name}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                )}

                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/20 to-transparent" />

                {/* Rating Badge */}
                {hotel.rating != null && hotel.rating > 0 && (
                  <div className="absolute top-4 right-4">
                    <div className="flex items-center gap-1.5 px-3 py-1.5 bg-white/95 backdrop-blur-sm rounded-full shadow-lg">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm font-bold text-gray-900">
                        {hotel.rating.toFixed(1)}
                      </span>
                    </div>
                  </div>
                )}

                {/* Hotel Info Overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-5 text-white">
                  <h3 className="text-2xl font-bold mb-2 line-clamp-1">
                    {hotel.name}
                  </h3>

                  {hotel.city && (
                    <div className="flex items-center gap-2 text-sm text-white/90 mb-1">
                      <MapPin className="w-4 h-4" />
                      <span className="line-clamp-1">{hotel.city}</span>
                    </div>
                  )}

                  {hotel.address && (
                    <p className="text-sm text-white/80 line-clamp-1">
                      {hotel.address}
                    </p>
                  )}
                </div>
              </div>

              {/* Hover Effect */}
              <div className="absolute inset-0 bg-blue-600/0 group-hover:bg-blue-600/10 transition-colors duration-300 pointer-events-none" />
            </div>
          );
        })}
      </div>
    </div>
  );
};
