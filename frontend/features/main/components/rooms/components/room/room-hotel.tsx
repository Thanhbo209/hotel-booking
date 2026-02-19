"use client";

import { MapPin, Building2 } from "lucide-react";

interface HotelInfo {
  _id: string;
  name: string;
  address: string;
  city?: string;
}

interface Props {
  hotel: HotelInfo;
}

export default function RoomHotel({ hotel }: Props) {
  if (!hotel) return null;

  return (
    <div className="rounded-2xl border p-5 shadow-sm">
      <div className="flex items-center gap-2 mb-4">
        <Building2 className="w-5 h-5 text-primary" />
        <h3 className="text-lg font-semibold">Hotel Information</h3>
      </div>

      <div className="text-xl font-bold text-foreground mb-2">{hotel.name}</div>

      <div className="flex items-start gap-2 text-muted-foreground">
        <MapPin className="w-4 h-4 mt-1 shrink-0" />
        <div>
          <div>{hotel.address ?? "Updating..."}</div>
          <div className="text-sm">{hotel.city ?? ""}</div>
        </div>
      </div>
    </div>
  );
}
