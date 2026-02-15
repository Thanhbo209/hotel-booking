import { FilterState } from "@/types/filter.types";
import {
  HOTEL_TYPES,
  AMENITIES,
  CITIES,
} from "@/features/home/components/hotels/constants/hotel-constants";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Calendar, MapPin, Star, Users } from "lucide-react";

interface FilterContentProps {
  filters: FilterState;
  setFilters: (filters: FilterState) => void;
  hasActiveFilters: boolean;
  clearFilters: () => void;
}

export function FilterContent({ filters, setFilters }: FilterContentProps) {
  return (
    <div className="space-y-6 max-sm:p-7">
      {/* Check-in Date */}
      <div className="space-y-3">
        <Label htmlFor="check-in" className="flex items-center gap-2">
          <Calendar className="w-4 h-4 text-primary" />
          Check in
        </Label>
        <Input
          id="check-in"
          type="date"
          value={filters.checkIn}
          onChange={(e) => setFilters({ ...filters, checkIn: e.target.value })}
          className="border-border"
        />
      </div>

      {/* Check-out Date */}
      <div className="space-y-3">
        <Label htmlFor="check-out" className="flex items-center gap-2">
          <Calendar className="w-4 h-4 text-primary" />
          Check out
        </Label>
        <Input
          id="check-out"
          type="date"
          value={filters.checkOut}
          onChange={(e) => setFilters({ ...filters, checkOut: e.target.value })}
          className="border-border"
        />
      </div>

      <Separator />

      {/* Location */}
      <div className="space-y-3">
        <Label className="flex items-center gap-2">
          <MapPin className="w-4 h-4 text-primary" />
          Location
        </Label>
        <Select
          value={filters.city || "all"}
          onValueChange={(value) =>
            setFilters({ ...filters, city: value === "all" ? "" : value })
          }
        >
          <SelectTrigger className="border-border">
            <SelectValue placeholder="All Locations" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Locations</SelectItem>
            {CITIES.map((city) => (
              <SelectItem key={city} value={city}>
                {city}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <Separator />

      {/* Price Range */}
      <div className="space-y-3">
        <Label className="flex items-center justify-between">
          <span className="flex items-center gap-2">Price Range</span>
          <span className="text-sm font-semibold text-primary">
            {filters.priceRange[1].toLocaleString("vi-VN")}đ
          </span>
        </Label>
        <Slider
          value={[filters.priceRange[1]]}
          onValueChange={(value) =>
            setFilters({ ...filters, priceRange: [0, value[0]] })
          }
          max={10000000}
          step={100000}
          className="py-4"
        />
        <div className="flex justify-between text-xs text-muted-foreground">
          <span>0đ</span>
          <span>10,000,000đ</span>
        </div>
      </div>

      <Separator />

      {/* Rating */}
      <div className="space-y-3">
        <Label className="flex items-center gap-2">
          <Star className="w-4 h-4 text-primary" />
          Rating
        </Label>
        <div className="flex flex-wrap gap-2">
          {[1, 2, 3, 4, 5].map((star) => (
            <Button
              key={star}
              variant={filters.rating.includes(star) ? "default" : "outline"}
              size="sm"
              onClick={() => {
                const newRating = filters.rating.includes(star)
                  ? filters.rating.filter((r) => r !== star)
                  : [...filters.rating, star];
                setFilters({ ...filters, rating: newRating });
              }}
              className={
                filters.rating.includes(star)
                  ? "bg-primary hover:bg-primary/80"
                  : "border-border"
              }
            >
              {star}⭐
            </Button>
          ))}
        </div>
      </div>

      <Separator />

      {/* Hotel Type */}
      <div className="space-y-3">
        <Label>Hotel Type</Label>
        <div className="space-y-3">
          {HOTEL_TYPES.map((type) => (
            <div key={type} className="flex items-center space-x-2">
              <Checkbox
                id={`type-${type}`}
                checked={filters.hotelType.includes(type)}
                onCheckedChange={(checked) => {
                  const newTypes = checked
                    ? [...filters.hotelType, type]
                    : filters.hotelType.filter((t) => t !== type);
                  setFilters({ ...filters, hotelType: newTypes });
                }}
              />
              <Label
                htmlFor={`type-${type}`}
                className="text-sm font-normal cursor-pointer text-muted-foreground"
              >
                {type}
              </Label>
            </div>
          ))}
        </div>
      </div>

      <Separator />

      {/* Amenities */}
      <div className="space-y-3">
        <Label>Amenities</Label>
        <div className="space-y-3">
          {AMENITIES.map((amenity) => {
            const Icon = amenity.Icon;
            return (
              <div key={amenity.id} className="flex items-center space-x-2">
                <Checkbox
                  id={`amenity-${amenity.id}`}
                  checked={filters.amenities.includes(amenity.id)}
                  onCheckedChange={(checked) => {
                    const newAmenities = checked
                      ? [...filters.amenities, amenity.id]
                      : filters.amenities.filter((a) => a !== amenity.id);
                    setFilters({ ...filters, amenities: newAmenities });
                  }}
                />
                <Label
                  htmlFor={`amenity-${amenity.id}`}
                  className="text-sm font-normal cursor-pointer flex items-center gap-2 text-muted-foreground"
                >
                  <Icon className="w-4 h-4 text-primary" />
                  {amenity.label}
                </Label>
              </div>
            );
          })}
        </div>
      </div>

      <Separator />

      {/* Guests and Rooms */}
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="guests" className="flex items-center gap-1 text-sm">
            <Users className="w-4 h-4 text-primary" />
            Person(s)
          </Label>
          <Input
            id="guests"
            type="number"
            min="1"
            value={filters.guests}
            onChange={(e) =>
              setFilters({ ...filters, guests: parseInt(e.target.value) || 1 })
            }
            className="border-border"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="rooms" className="text-sm">
            🛏️ Room(s)
          </Label>
          <Input
            id="rooms"
            type="number"
            min="1"
            value={filters.rooms}
            onChange={(e) =>
              setFilters({ ...filters, rooms: parseInt(e.target.value) || 1 })
            }
            className="border-border"
          />
        </div>
      </div>
    </div>
  );
}
