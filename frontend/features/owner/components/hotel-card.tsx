import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  MapPin,
  Star,
  Utensils,
  Waves,
  Dumbbell,
  Sparkles,
  Car,
  Wine,
  Pencil,
  Trash2,
} from "lucide-react";
import { Hotel } from "@/types/hotel";

interface HotelCardProps {
  hotel: Hotel;
  onClick?: (hotelId: string) => void;
  onEdit?: (hotel: Hotel) => void;
  onDelete?: (hotelId: string) => void;
}

const amenityConfig = {
  restaurant: { icon: Utensils, label: "Restaurant" },
  swimmingPool: { icon: Waves, label: "Pool" },
  gym: { icon: Dumbbell, label: "Gym" },
  spa: { icon: Sparkles, label: "Spa" },
  parking: { icon: Car, label: "Parking" },
  bar: { icon: Wine, label: "Bar" },
};

export default function HotelCard({
  hotel,
  onClick,
  onEdit,
  onDelete,
}: HotelCardProps) {
  if (!hotel) return null;

  const activeAmenities = Object.entries(hotel.amenities || {})
    .filter(([_, value]) => value === true)
    .map(([key]) => key as keyof typeof amenityConfig);

  return (
    <Card
      className="hover:shadow-lg bg-card transition-shadow cursor-pointer relative"
      onClick={() => onClick?.(hotel._id)}
    >
      {/* ACTION BUTTONS */}
      <div className="absolute bottom-3 right-3 flex gap-2 z-10">
        {onEdit && (
          <Button
            size="icon"
            variant="secondary"
            onClick={(e) => {
              e.stopPropagation();
              onEdit(hotel);
            }}
          >
            <Pencil className="w-4 h-4" />
          </Button>
        )}

        {onDelete && (
          <Button
            size="icon"
            variant="destructive"
            onClick={(e) => {
              e.stopPropagation();
              onDelete(hotel._id);
            }}
          >
            <Trash2 className="w-4 h-4" />
          </Button>
        )}
      </div>

      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="text-xl">{hotel.name}</CardTitle>
            <CardDescription className="flex items-center gap-1 mt-2">
              <MapPin className="w-4 h-4" />
              {hotel.city && <span>{hotel.city}, </span>}
              <span className="text-xs">{hotel.address}</span>
            </CardDescription>
          </div>

          {hotel.rating > 0 && (
            <div className="flex items-center gap-1 bg-primary text-primary-foreground px-2 py-1 rounded-md">
              <Star className="w-4 h-4 fill-current" />
              <span className="font-semibold">{hotel.rating.toFixed(1)}</span>
            </div>
          )}
        </div>
      </CardHeader>

      <CardContent>
        {hotel.description && (
          <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
            {hotel.description}
          </p>
        )}

        {activeAmenities.length > 0 ? (
          <div className="flex flex-wrap gap-2">
            {activeAmenities.map((key) => {
              const amenity = amenityConfig[key];
              const Icon = amenity.icon;

              return (
                <Badge key={key} variant="secondary" className="gap-1">
                  <Icon className="w-3 h-3" />
                  {amenity.label}
                </Badge>
              );
            })}
          </div>
        ) : (
          <p className="text-xs text-muted-foreground italic">
            No amenities listed
          </p>
        )}
      </CardContent>

      <CardFooter className="text-xs text-muted-foreground">
        {hotel.createdAt && (
          <span>Added {new Date(hotel.createdAt).toLocaleDateString()}</span>
        )}
      </CardFooter>
    </Card>
  );
}
