import { PublicHotel } from "@/features/home/services/public-hotel.service";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { MapPin, Star, Wifi, Waves } from "lucide-react";

interface HotelCardProps {
  hotel: PublicHotel;
}

export function HotelCard({ hotel }: HotelCardProps) {
  const mainImage = hotel.images?.[0] || "/placeholder-hotel.jpg";
  const mockPrice = Math.floor(Math.random() * 3000000 + 500000);

  return (
    <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 border-border group">
      <div className="relative h-56 overflow-hidden">
        <img
          src={mainImage}
          alt={hotel.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {hotel.rating && (
          <Badge className="absolute top-3 right-3 bg-primary hover:bg-white shadow-lg backdrop-blur-sm">
            <Star className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400 mr-1" />
            {hotel.rating.toFixed(1)}
          </Badge>
        )}
      </div>

      <CardContent className="p-5">
        <h3 className="font-semibold text-lg mb-2 line-clamp-1 group-hover:text-primary transition-colors">
          {hotel.name}
        </h3>

        {hotel.city && (
          <div className="flex items-center gap-1.5 text-sm mb-1">
            <MapPin className="w-4 h-4 text-primary" />
            <span className="font-medium">{hotel.city}</span>
          </div>
        )}

        {hotel.address && (
          <p className="text-sm text-muted-foreground line-clamp-1 mb-4">
            {hotel.address}
          </p>
        )}

        {/* Mock amenities */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          <Badge
            variant="secondary"
            className="text-xs bg-blue-50 text-primary border-blue-200"
          >
            <Wifi className="w-3 h-3 mr-1" />
            Wifi
          </Badge>
          <Badge
            variant="secondary"
            className="text-xs bg-blue-50 text-primary border-blue-200"
          >
            <Waves className="w-3 h-3 mr-1" />
            Bể bơi
          </Badge>
        </div>

        <Separator className="mb-4" />

        <div className="flex items-end justify-between">
          <div>
            <p className="text-xs text-muted-foreground mb-0.5">From</p>
            <p className="text-xl font-bold text-primary">
              {mockPrice.toLocaleString("vi-VN")}đ
            </p>
            <p className="text-xs text-muted-foreground">/ night</p>
          </div>
          <Button className="shadow-md shadow-blue-600/20">Book</Button>
        </div>
      </CardContent>
    </Card>
  );
}
