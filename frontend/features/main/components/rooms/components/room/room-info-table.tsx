import { PublicRoom } from "@/types/hotel";

interface Props {
  room: PublicRoom;
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between items-center py-3.5 px-5 border-b border-border last:border-0">
      <span className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
        {label}
      </span>
      <span className="text-sm  font-medium tabular-nums">{value}</span>
    </div>
  );
}

export default function RoomInfoTable({ room }: Props) {
  const fmt = (date: string) =>
    new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });

  const rows: { label: string; value: string }[] = [
    { label: "Room Type", value: room.roomType },
    {
      label: "Bed Type",
      value: `${room.amenities.bedType ?? "Standard"} Size`,
    },
    {
      label: "Max Capacity",
      value: `${room.capacity} Guest${room.capacity > 1 ? "s" : ""}`,
    },
    { label: "Total Units", value: `${room.totalRooms} Rooms` },
    { label: "Status", value: room.status },
    { label: "Listed On", value: fmt(room.createdAt) },
    { label: "Last Updated", value: fmt(room.updatedAt) },
  ];

  return (
    <div>
      <h2 className="font-display text-2xl font-light tracking-wide  mb-6">
        Room Details
      </h2>
      <div className="border border-border rounded-sm overflow-hidden">
        {rows.map((r) => (
          <Row key={r.label} {...r} />
        ))}
      </div>
    </div>
  );
}
