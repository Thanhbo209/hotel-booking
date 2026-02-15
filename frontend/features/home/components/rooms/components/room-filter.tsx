import { RoomFilterState, RoomType } from "@/types/room";
import {
  ROOM_TYPES,
  ROOM_AMENITIES,
  SORT_OPTIONS,
  CAPACITY_OPTIONS,
} from "@/features/home/components/rooms/constants/room.constants";
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
import { Checkbox } from "@/components/ui/checkbox";
import {
  Calendar,
  Users,
  DollarSign,
  ArrowUpDown,
  Search,
  Bath,
  Bed,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface RoomFiltersProps {
  filters: RoomFilterState;
  setFilters: (filters: RoomFilterState) => void;
}

export function RoomFilters({ filters, setFilters }: RoomFiltersProps) {
  return (
    <div className="space-y-6">
      {/* Search Bar */}
      <div className="space-y-3">
        <Label className="text-base font-semibold flex items-center gap-2">
          <Search className="w-4 h-4 text-primary" />
          Search Rooms
        </Label>
        <Input
          type="text"
          placeholder="Search by room name..."
          value={filters.searchQuery}
          onChange={(e) =>
            setFilters({ ...filters, searchQuery: e.target.value })
          }
          className="border-border"
        />
      </div>
      <Separator />
      {/* Sort By */}
      <div className="space-y-3">
        <Label className="text-base font-semibold flex items-center gap-2">
          <ArrowUpDown className="w-4 h-4" />
          Sort By
        </Label>
        <Select
          value={filters.sortBy}
          onValueChange={(value) =>
            setFilters({
              ...filters,
              sortBy: value as RoomFilterState["sortBy"],
            })
          }
        >
          <SelectTrigger className="border-border">
            <SelectValue placeholder="Default" />
          </SelectTrigger>

          <SelectContent>
            <SelectItem value="default">Default</SelectItem>

            {SORT_OPTIONS.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <Separator />

      {/* Check-in/Check-out */}
      <div className="space-y-3">
        <Label className="text-base font-semibold flex items-center gap-2">
          <Calendar className="w-4 h-4 text-primary" />
          Check Dates
        </Label>
        <div className="space-y-2">
          <Input
            type="date"
            value={filters.checkInDate}
            onChange={(e) =>
              setFilters({ ...filters, checkInDate: e.target.value })
            }
            className="border-border"
            placeholder="Check-in"
          />
          <Input
            type="date"
            value={filters.checkOutDate}
            onChange={(e) =>
              setFilters({ ...filters, checkOutDate: e.target.value })
            }
            className="border-border"
            placeholder="Check-out"
          />
        </div>
      </div>

      <Separator />

      {/* Number of Guests */}
      <div className="space-y-3">
        <Label className="text-base font-semibold flex items-center gap-2">
          <Users className="w-4 h-4" />
          Number of Guests
        </Label>
        <div className="flex flex-wrap gap-2">
          {CAPACITY_OPTIONS.map((capacity) => (
            <Badge
              key={capacity}
              variant={filters.capacity === capacity ? "default" : "outline"}
              className={`cursor-pointer transition-all ${
                filters.capacity === capacity
                  ? "bg-primary text-primary-foreground"
                  : "hover:bg-primary/10"
              }`}
              onClick={() =>
                setFilters({
                  ...filters,
                  capacity: filters.capacity === capacity ? null : capacity,
                })
              }
            >
              {capacity}+ {capacity === 1 ? "guest" : "guests"}
            </Badge>
          ))}
        </div>
      </div>

      <Separator />

      {/* Room Type */}
      <div className="space-y-3">
        <Label className="text-base font-semibold">
          <Bed size={20} /> Room Type
        </Label>
        <div className="space-y-2">
          {ROOM_TYPES.map((type) => (
            <div key={type.value} className="flex items-center space-x-2">
              <Checkbox
                id={`room-type-${type.value}`}
                checked={filters.roomTypes.includes(type.value as RoomType)}
                onCheckedChange={(checked) => {
                  const newTypes = checked
                    ? [...filters.roomTypes, type.value as RoomType]
                    : filters.roomTypes.filter((t) => t !== type.value);
                  setFilters({ ...filters, roomTypes: newTypes });
                }}
              />
              <Label
                htmlFor={`room-type-${type.value}`}
                className="text-sm font-normal cursor-pointer text-muted-foreground flex items-center gap-2"
              >
                {type.label}
              </Label>
            </div>
          ))}
        </div>
      </div>

      <Separator />

      {/* Price Range */}
      <div className="space-y-3">
        <Label className="text-base font-semibold flex items-center justify-between">
          <span className="flex items-center gap-2">
            <DollarSign size={20} className="w-4 h-4" />
            Price Range
          </span>
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

      {/* Amenities */}
      <div className="space-y-3">
        <Label className="text-base font-semibold">
          <Bath size={20} /> Room Amenities
        </Label>
        <div className="space-y-2">
          {ROOM_AMENITIES.map((amenity) => {
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
    </div>
  );
}
