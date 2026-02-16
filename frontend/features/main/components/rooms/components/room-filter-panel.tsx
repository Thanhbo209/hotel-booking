// features/home/components/rooms/components/room-filter-panel.tsx
import { RoomFilters } from "./room-filter";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Filter, X } from "lucide-react";
import { RoomFilterState } from "@/types/room";

interface Props {
  filters: RoomFilterState;
  setFilters: (filters: RoomFilterState) => void;
  hasActiveFilters: boolean;
  clearFilters: () => void;
}

export function RoomFilterPanel({
  filters,
  setFilters,
  hasActiveFilters,
  clearFilters,
}: Props) {
  return (
    <Card className="border-border shadow-lg">
      <CardHeader className="border-b border-border">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold flex items-center gap-2">
            <Filter className="w-5 h-5 text-primary" />
            Filters
          </h2>

          {hasActiveFilters && (
            <Button
              variant="ghost"
              size="sm"
              className="text-destructive"
              onClick={clearFilters}
            >
              <X className="w-4 h-4 mr-1" />
              Clear
            </Button>
          )}
        </div>
      </CardHeader>

      <CardContent className="pt-6">
        <RoomFilters filters={filters} setFilters={setFilters} />
      </CardContent>
    </Card>
  );
}
