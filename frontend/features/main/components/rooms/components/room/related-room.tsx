import Image from "next/image";
import Link from "next/link";
import { Room } from "@/types/room";
import RoomTypeBadge from "@/features/main/components/rooms/components/room/room-type-badge";
import { AmenityIconRow } from "@/features/main/components/rooms/components/room/room-amenities";
import { PublicRoom } from "@/types/hotel";

interface Props {
  rooms: PublicRoom[];
}

function RelatedCard({ room }: { room: Room }) {
  return (
    <Link
      href={`/rooms/${room._id}`}
      className="group block border border-border hover:border-primary/30  transition-all duration-300 hover:-translate-y-1"
    >
      {/* Image */}
      <div className="relative h-44 overflow-hidden">
        <Image
          src={room.images[0]}
          alt={room.name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105 brightness-80 group-hover:brightness-100"
          sizes="(max-width: 768px) 100vw, 33vw"
        />
        <div className="absolute inset-0 bg-linear-to-t from-neutral-950/70 to-transparent" />
        <div className="absolute bottom-3 left-4">
          <RoomTypeBadge type={room.roomType} size="sm" />
        </div>
      </div>

      {/* Body */}
      <div className="p-5">
        <div className="flex justify-between items-start mb-3">
          <h3 className="font-display text-xl font-light  group-hover:text-primary/90 transition-colors leading-tight">
            {room.name}
          </h3>
          <div className="text-right shrink-0 ml-2">
            <div className="font-display text-xl text-primary font-light">
              ${room.pricePerNight}
            </div>
            <div className="text-[10px] text-muted-foreground">/night</div>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <AmenityIconRow amenities={room.amenities} />
          <span className="text-[10px] text-muted-foreground uppercase tracking-widest">
            {room.capacity} guest{room.capacity > 1 ? "s" : ""}
          </span>
        </div>

        <div className="mt-4 pt-4 border-t border-border">
          <span className="text-[10px] text-primary uppercase tracking-[0.25em] group-hover:text-primary/80 transition-colors">
            View Room →
          </span>
        </div>
      </div>
    </Link>
  );
}

export default function RelatedRooms({ rooms }: Props) {
  return (
    <div>
      <div className="mb-10">
        <p className="font-display text-lg font-light italic text-muted-foreground mb-1">
          Also available —
        </p>
        <h2 className="font-display text-3xl font-light ">
          Other Room Options
        </h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {rooms.map((room) => (
          <RelatedCard key={room._id} room={room} />
        ))}
      </div>
    </div>
  );
}
