import { FilterState } from "@/types/filter.types";
import { CITIES } from "@/features/home/components/hotels/constants/hotel-constants";
import { AMENITIES } from "@/features/owner/components/amenities-checkbox";

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

import { MapPin, Star, Search } from "lucide-react";

interface FilterContentProps {
  filters: FilterState;
  setFilters: React.Dispatch<React.SetStateAction<FilterState>>;
  hasActiveFilters: boolean;
  clearFilters: () => void;
}

export function FilterContent({
  filters,
  setFilters,
  hasActiveFilters,
  clearFilters,
}: FilterContentProps) {
  return (
    <div className="space-y-6 max-sm:p-6">
      {/* Search */}
      <div className="space-y-2">
        <Label className="flex items-center gap-2">
          <Search className="w-4 h-4 text-primary" />
          Search
        </Label>
        <Input
          placeholder="Hotel name..."
          value={filters.searchQuery}
          onChange={(e) =>
            setFilters((prev) => ({
              ...prev,
              searchQuery: e.target.value,
            }))
          }
        />
      </div>

      <Separator />

      {/* Location */}
      <div className="space-y-2">
        <Label className="flex items-center gap-2">
          <MapPin className="w-4 h-4 text-primary" />
          Location
        </Label>
        <Select
          value={filters.city || "all"}
          onValueChange={(value) =>
            setFilters((prev) => ({
              ...prev,
              city: value === "all" ? "" : value,
            }))
          }
        >
          <SelectTrigger>
            <SelectValue placeholder="All locations" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All locations</SelectItem>
            {CITIES.map((city) => (
              <SelectItem key={city} value={city}>
                {city}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <Separator />

      {/* Price */}
      <div className="space-y-3">
        <Label className="flex justify-between">
          <span>Price range</span>
          <span className="font-semibold text-primary">
            {filters.priceRange[1].toLocaleString("vi-VN")}đ
          </span>
        </Label>

        <Slider
          value={[filters.priceRange[1]]}
          max={10_000_000}
          step={100_000}
          onValueChange={([value]) =>
            setFilters((prev) => ({
              ...prev,
              priceRange: [0, value],
            }))
          }
        />

        <div className="flex justify-between text-xs text-muted-foreground">
          <span>0đ</span>
          <span>10,000,000đ</span>
        </div>
      </div>

      <Separator />

      {/* Rating */}
      <div className="space-y-2">
        <Label className="flex items-center gap-2">
          <Star className="w-4 h-4 text-primary" />
          Rating
        </Label>

        <div className="flex flex-wrap gap-2">
          {[1, 2, 3, 4, 5].map((star) => {
            const active = filters.rating.includes(star);

            return (
              <Button
                key={star}
                size="sm"
                variant={active ? "default" : "outline"}
                onClick={() =>
                  setFilters((prev) => ({
                    ...prev,
                    rating: active
                      ? prev.rating.filter((r) => r !== star)
                      : [...prev.rating, star],
                  }))
                }
              >
                {star}⭐
              </Button>
            );
          })}
        </div>
      </div>

      <Separator />

      {/* Amenities */}
      <div className="space-y-3">
        <Label>Amenities</Label>

        {AMENITIES.map(({ key, label, Icon }) => {
          const checked = filters.amenities.includes(key);

          return (
            <div key={key} className="flex items-center gap-2">
              <Checkbox
                checked={checked}
                onCheckedChange={(value) => {
                  if (value === "indeterminate") return;

                  setFilters((prev) => ({
                    ...prev,
                    amenities: value
                      ? [...prev.amenities, key]
                      : prev.amenities.filter((a) => a !== key),
                  }));
                }}
              />
              <Label className="flex items-center gap-2 text-sm text-muted-foreground">
                <Icon className="w-4 h-4 text-primary" />
                {label}
              </Label>
            </div>
          );
        })}
      </div>

      {/* Clear */}
      {hasActiveFilters && (
        <>
          <Separator />
          <Button
            variant="ghost"
            className="w-full text-muted-foreground"
            onClick={clearFilters}
          >
            Clear filters
          </Button>
        </>
      )}
    </div>
  );
}
