import {
  Card,
  CardContent,
  CardDescription,
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
  ImageIcon,
} from "lucide-react";
import { Hotel } from "@/types/hotel";
import Image from "next/image";

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

  const hasImages = hotel.images && hotel.images.length > 0;
  const mainImage = hasImages ? hotel.images[0] : null;

  return (
    <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 group">
      {/* IMAGE SECTION */}
      <div className="relative h-48 bg-linear-to-br from-slate-100 to-slate-200 overflow-hidden">
        {mainImage ? (
          <>
            <Image
              src={mainImage}
              alt={hotel.name}
              width={300}
              height={300}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              onClick={() => onClick?.(hotel._id)}
            />
            {/* Image count badge */}
            {hotel.images.length > 1 && (
              <div className="absolute bottom-2 left-2 bg-black/70 text-white px-2 py-1 rounded-md text-xs flex items-center gap-1">
                <ImageIcon className="w-3 h-3" />
                <span>{hotel.images?.length} photos</span>
              </div>
            )}
          </>
        ) : (
          <div
            className="w-full h-full flex items-center justify-center cursor-pointer hover:bg-slate-300 transition-colors"
            onClick={() => onClick?.(hotel._id)}
          >
            <ImageIcon className="w-12 h-12 text-slate-400" />
          </div>
        )}

        {/* ACTION BUTTONS - Positioned on image */}
        <div className="absolute top-2 right-2 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
          {onEdit && (
            <Button
              size="icon"
              variant="secondary"
              className="h-8 w-8 bg-white/90 hover:bg-white"
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
              className="h-8 w-8"
              onClick={(e) => {
                e.stopPropagation();
                onDelete(hotel._id);
              }}
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          )}
        </div>

        {/* RATING BADGE - Positioned on image */}
        {hotel.rating > 0 && (
          <div className="absolute top-2 left-2 flex items-center gap-1 bg-amber-500 text-white px-2.5 py-1.5 rounded-lg shadow-lg">
            <Star className="w-4 h-4 fill-current" />
            <span className="font-bold text-sm">{hotel.rating.toFixed(1)}</span>
          </div>
        )}
      </div>

      {/* CONTENT SECTION */}
      <div className="cursor-pointer" onClick={() => onClick?.(hotel._id)}>
        <CardHeader className="pb-3">
          <CardTitle className="text-xl line-clamp-1 group-hover:text-primary transition-colors">
            {hotel.name}
          </CardTitle>
          <CardDescription className="flex items-start gap-1.5 mt-2">
            <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
            <span className="text-sm line-clamp-2">
              {hotel.city && <span className="font-medium">{hotel.city}</span>}
              {hotel.city && hotel.address && <span> • </span>}
              <span>{hotel.address}</span>
            </span>
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-4">
          {/* DESCRIPTION */}
          {hotel.description && (
            <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed">
              {hotel.description}
            </p>
          )}

          {/* AMENITIES */}
          <div>
            <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">
              Amenities
            </h4>
            {activeAmenities.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {activeAmenities.map((key) => {
                  const amenity = amenityConfig[key];
                  const Icon = amenity.icon;

                  return (
                    <Badge
                      key={key}
                      variant="secondary"
                      className="gap-1.5 px-2.5 py-1"
                    >
                      <Icon className="w-3.5 h-3.5" />
                      <span className="text-xs">{amenity.label}</span>
                    </Badge>
                  );
                })}
              </div>
            ) : (
              <p className="text-xs text-muted-foreground italic">
                No amenities listed
              </p>
            )}
          </div>

          {/* FOOTER INFO */}
          <div className="flex items-center justify-between pt-2 border-t">
            <div className="text-xs text-muted-foreground">
              {hotel.createdAt && (
                <span>
                  Added {new Date(hotel.createdAt).toLocaleDateString()}
                </span>
              )}
            </div>
            {hasImages && (
              <Button
                variant="ghost"
                size="sm"
                className="text-xs h-7"
                onClick={(e) => {
                  e.stopPropagation();
                  onClick?.(hotel._id);
                }}
              >
                View details →
              </Button>
            )}
          </div>
        </CardContent>
      </div>
    </Card>
  );
}
