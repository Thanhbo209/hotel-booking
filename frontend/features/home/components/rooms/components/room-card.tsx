"use client";

import { Room, RoomAmenities } from "@/types/room";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Users,
  Wifi,
  Wind,
  Tv,
  Wine,
  DoorOpen,
  ChevronLeft,
  ChevronRight,
  Bed,
} from "lucide-react";
import { useState } from "react";

interface RoomCardProps {
  room: Room;
  checkInDate?: string;
  checkOutDate?: string;
}

export function RoomCard({ room, checkInDate, checkOutDate }: RoomCardProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const images =
    room.images.length > 0 ? room.images : ["/placeholder-room.jpg"];

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const getRoomTypeLabel = () => {
    switch (room.roomType) {
      case "SINGLE":
        return "Single Room";
      case "DOUBLE":
        return "Double Room";
      case "DELUXE":
        return "Deluxe Room";
      case "SUITE":
        return "Suite";
      default:
        return room.roomType;
    }
  };

  const amenitiesList = [
    { key: "wifi" as keyof RoomAmenities, icon: Wifi, label: "Wifi" },
    { key: "airConditioner" as keyof RoomAmenities, icon: Wind, label: "AC" },
    { key: "tv" as keyof RoomAmenities, icon: Tv, label: "TV" },
    { key: "minibar" as keyof RoomAmenities, icon: Wine, label: "Minibar" },
    { key: "balcony" as keyof RoomAmenities, icon: DoorOpen, label: "Balcony" },
  ].filter((amenity) => room.amenities[amenity.key] === true);

  return (
    <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 border-border group">
      {/* Image Slider */}
      <div className="relative h-64 overflow-hidden ">
        <img
          src={images[currentImageIndex]}
          alt={`${room.name} - Image ${currentImageIndex + 1}`}
          className="w-full h-full object-cover transition-transform duration-500"
        />

        {/* Image Navigation */}
        {images.length > 1 && (
          <>
            <Button
              onClick={prevImage}
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
              aria-label="Previous image"
            >
              <ChevronLeft className="w-5 h-5" />
            </Button>
            <Button
              onClick={nextImage}
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
              aria-label="Next image"
            >
              <ChevronRight className="w-5 h-5" />
            </Button>

            {/* Image Indicators */}
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
              {images.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    index === currentImageIndex ? " w-6" : ""
                  }`}
                  aria-label={`Go to image ${index + 1}`}
                />
              ))}
            </div>
          </>
        )}

        {/* Room Type Badge */}
        <Badge className="absolute top-3 left-3 bg-primary text-primary-foreground">
          {getRoomTypeLabel()}
        </Badge>

        {/* Available Rooms */}
        {room.totalRooms > 0 && (
          <Badge variant="secondary" className="absolute top-3 right-3">
            {room.totalRooms} rooms available
          </Badge>
        )}
      </div>

      <CardContent className="p-6">
        {/* Room Name & Capacity */}
        <div className="flex items-start justify-between mb-3">
          <div>
            <h3 className="font-semibold text-xl  mb-1 group-hover:text-primary transition-colors">
              {room.name}
            </h3>
            <p className="text-sm text-muted-foreground">
              {room.hotelId.name} · {room.hotelId.city}
            </p>
            <div className="flex items-center gap-1.5 text-muted-foreground">
              <Users className="w-4 h-4" />
              <span className="text-sm">Up to {room.capacity} guests</span>
            </div>
          </div>
        </div>

        {/* Bed Type */}
        {room.amenities.bedType && (
          <div className="flex items-center gap-1.5 text-muted-foreground mb-3">
            <Bed className="w-4 h-4" />
            <span className="text-sm">Bed: {room.amenities.bedType}</span>
          </div>
        )}

        {/* Amenities */}
        {amenitiesList.length > 0 && (
          <div className="mb-4">
            <div className="flex flex-wrap gap-2">
              {amenitiesList.map((amenity) => {
                const Icon = amenity.icon;
                return (
                  <Badge
                    key={amenity.key}
                    variant="outline"
                    className="text-xs border-primary/20 text-muted-foreground"
                  >
                    <Icon className="w-3 h-3 mr-1 text-primary" />
                    {amenity.label}
                  </Badge>
                );
              })}
            </div>
          </div>
        )}

        <Separator className="my-4" />

        {/* Price & Booking */}
        <div className="flex items-end justify-between">
          <div>
            <p className="text-xs text-muted-foreground mb-0.5">
              Price per night
            </p>
            <p className="text-2xl font-bold text-primary/80">
              ${room.pricePerNight.toLocaleString("en-US")}
            </p>
            {checkInDate && checkOutDate && (
              <p className="text-xs text-muted-foreground mt-1">
                {checkInDate} → {checkOutDate}
              </p>
            )}
          </div>
          <Button size="lg" className="shadow-md shadow-primary/20">
            Book Now
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
