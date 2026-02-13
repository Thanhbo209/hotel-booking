import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  MapPin,
  Star,
  Utensils,
  Waves,
  Dumbbell,
  Sparkles,
  Car,
  Wine,
} from "lucide-react";

interface Hotel {
  _id: string;
  name: string;
  description?: string;
  address: string;
  city?: string;
  rating: number;
  amenities?: {
    restaurant?: boolean;
    swimmingPool?: boolean;
    gym?: boolean;
    spa?: boolean;
    parking?: boolean;
    bar?: boolean;
  };
  createdAt?: string;
  updatedAt?: string;
}

interface HotelCardProps {
  hotel: Hotel;
  onClick?: (hotelId: string) => void;
}

const amenityConfig = {
  restaurant: { icon: Utensils, label: "Restaurant" },
  swimmingPool: { icon: Waves, label: "Pool" },
  gym: { icon: Dumbbell, label: "Gym" },
  spa: { icon: Sparkles, label: "Spa" },
  parking: { icon: Car, label: "Parking" },
  bar: { icon: Wine, label: "Bar" },
};

export default function HotelCard({ hotel, onClick }: HotelCardProps) {
  if (!hotel) {
    return null;
  }

  const activeAmenities = Object.entries(hotel.amenities || {})
    .filter(([_, value]) => value === true)
    .map(([key]) => key as keyof typeof amenityConfig);

  return (
    <Card
      className="hover:shadow-lg bg=card transition-shadow cursor-pointer"
      onClick={() => onClick?.(hotel._id)}
    >
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

        {activeAmenities.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {activeAmenities.map((amenityKey) => {
              const amenity = amenityConfig[amenityKey];
              const Icon = amenity.icon;

              return (
                <Badge key={amenityKey} variant="secondary" className="gap-1">
                  <Icon className="w-3 h-3" />
                  {amenity.label}
                </Badge>
              );
            })}
          </div>
        )}

        {activeAmenities.length === 0 && (
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
