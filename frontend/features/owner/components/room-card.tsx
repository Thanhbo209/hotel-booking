import { Room } from "@/types/room";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";

interface Props {
  room: Room;
  onToggleStatus: (roomId: string, nextStatus: Room["status"]) => void;
  onEdit: (room: Room) => void;
}

export default function RoomCard({ room, onToggleStatus, onEdit }: Props) {
  const coverImage =
    room.images && room.images.length > 0
      ? room.images[0]
      : "/placeholder-room.jpg";

  return (
    <Card className="overflow-hidden">
      {/* Image */}
      <div className="relative h-40 w-full">
        <img
          src={coverImage}
          alt={room.name}
          className="h-full w-full object-cover"
        />

        <Badge
          className="absolute top-2 left-2"
          variant={room.status === "ACTIVE" ? "default" : "secondary"}
        >
          {room.status}
        </Badge>
      </div>

      <CardHeader className="pb-2">
        <div className="flex items-center justify-between gap-2">
          <CardTitle className="text-lg line-clamp-1">{room.name}</CardTitle>

          <Switch
            checked={room.status === "ACTIVE"}
            onCheckedChange={(checked) =>
              onToggleStatus(room._id, checked ? "ACTIVE" : "INACTIVE")
            }
          />
        </div>

        <div className="text-sm text-muted-foreground">
          {room.roomType} • {room.capacity} person(s)
        </div>
      </CardHeader>

      <CardContent className="space-y-3">
        {/* Price */}
        <div className="font-semibold text-base">
          ${room.pricePerNight.toLocaleString()} / night
        </div>

        {/* Total rooms */}
        <div className="text-sm text-muted-foreground">
          Total rooms: <span className="font-medium">{room.totalRooms}</span>
        </div>

        {/* Amenities */}
        <div className="flex flex-wrap gap-2 text-xs">
          {room.amenities?.wifi && <Badge variant="outline">WiFi</Badge>}
          {room.amenities?.airConditioner && (
            <Badge variant="outline">AC</Badge>
          )}
          {room.amenities?.tv && <Badge variant="outline">TV</Badge>}
          {room.amenities?.minibar && <Badge variant="outline">Minibar</Badge>}
          {room.amenities?.balcony && <Badge variant="outline">Balcony</Badge>}
          {room.amenities?.bedType && (
            <Badge variant="outline">Bed: {room.amenities.bedType}</Badge>
          )}
        </div>

        {/* Actions */}
        <Button
          variant="link"
          className="p-0 h-auto text-sm"
          onClick={() => onEdit(room)}
        >
          Edit room
        </Button>
      </CardContent>
    </Card>
  );
}
