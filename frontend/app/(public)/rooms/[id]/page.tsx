import Link from "next/link";
import RoomGallery from "@/features/main/components/rooms/components/room/room-gallery";
import RoomTypeBadge from "@/features/main/components/rooms/components/room/room-type-badge";
import RoomAmenitiesGrid from "@/features/main/components/rooms/components/room/room-amenities";
import RoomInfoTable from "@/features/main/components/rooms/components/room/room-info-table";
import BookingCard from "@/features/main/components/rooms/components/room/booking-card";
import RelatedRooms from "@/features/main/components/rooms/components/room/related-room";
import {
  getPublicRoomById,
  getRelatedRooms,
} from "@/features/main/components/rooms/services/room.service";
import { Room } from "@/types/room";
import { PublicRoom } from "@/types/hotel";
import RoomHotel from "@/features/main/components/rooms/components/room/room-hotel";

export default async function RoomDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const room = await getPublicRoomById(id);
  let relatedRooms: PublicRoom[] = [];

  try {
    relatedRooms = await getRelatedRooms(id);
  } catch (e) {
    console.error("Related rooms failed:", e);
  }
  return (
    <main className="min-h-screen">
      {/* ── Top nav bar ─────────────────────────────────── */}
      <header className="border-b border-border">
        <div className="max-w-7xl mx-auto px-6 py-5 flex justify-between items-center">
          <Link
            href="/rooms"
            className="flex items-center gap-2 text-[10px] uppercase tracking-[0.25em] transition-colors"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              className="w-4 h-4"
            >
              <path
                d="M19 12H5M12 5l-7 7 7 7"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            All Rooms
          </Link>

          <span className="text-[10px] text-muted-foreground uppercase tracking-[0.3em]">
            Hotel Vista Grand
          </span>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-12 space-y-16">
        {/* ── Title + Price ────────────────────────────── */}
        <div className="flex flex-wrap justify-between items-end gap-6">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <RoomTypeBadge type={room.roomType} />

              {room.status === "ACTIVE" && (
                <span className="flex items-center gap-2 text-[11px] text-emerald-400 uppercase tracking-widest">
                  <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_#34d399]" />
                  Available
                </span>
              )}
            </div>

            <h1 className="font-display text-5xl sm:text-6xl font-light leading-none">
              {room.name}
            </h1>
          </div>

          <div className="text-right">
            <p className="text-[10px] text-muted-foreground uppercase tracking-[0.2em] mb-1">
              From
            </p>
            <p className="font-display text-6xl font-light text-primary leading-none">
              ${room.pricePerNight.toLocaleString("en-US")}
            </p>
            <p className="text-[11px] text-muted-foreground tracking-widest mt-1">
              per night
            </p>
          </div>
        </div>

        {/* ── Gallery ─────────────────────────────────── */}
        <RoomGallery images={room.images} name={room.name} />

        {/* ── Thin divider ────────────────────────────── */}
        <div className="h-px bg-linear-to-r from-transparent via-neutral-800 to-transparent" />

        {/* ── Main Content Grid ───────────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-16 items-start">
          {/* Left */}
          <div className="space-y-14">
            <RoomHotel hotel={room.hotelId as HotelInfo} />
            <RoomAmenitiesGrid amenities={room.amenities} />
            <RoomInfoTable room={room} />
          </div>

          {/* Right */}
          <BookingCard room={room} />
        </div>

        {/* ── Divider ─────────────────────────────────── */}
        <div className="h-px bg-linear-to-r from-transparent via-neutral-800 to-transparent" />

        {/* ── Related Rooms (tạm mock) ───────────────── */}
        <RelatedRooms rooms={relatedRooms} />
      </div>
    </main>
  );
}
