import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Filter, X } from "lucide-react";
import { RoomCard } from "@/features/main/components/rooms/components/room-card";
import { RoomFilters } from "@/features/main/components/rooms/components/room-filter";
import { Room, RoomFilterState } from "@/types/room";

interface Props {
  rooms: Room[];
  filters: RoomFilterState;
  stats: {
    total: number;
    hasActiveFilters: boolean;
  };
  clearFilters: () => void;
  setFilters: (filters: RoomFilterState) => void;
}

const RoomsLayout = ({
  rooms,
  filters,
  stats,
  clearFilters,
  setFilters,
}: Props) => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8 flex pt-30 gap-8">
      {/* Sidebar */}
      <aside className="hidden lg:block w-80">
        <Card className="sticky top-28">
          <CardHeader className="flex-row justify-between">
            <h2 className="flex items-center gap-2 font-semibold">
              <Filter className="w-5 h-5 text-primary" />
              Filters
            </h2>
            {stats.hasActiveFilters && (
              <Button
                variant="outline"
                size="sm"
                onClick={clearFilters}
                className="text-destructive"
              >
                <X className="w-4 h-4 mr-1" />
                Clear all filters
              </Button>
            )}
          </CardHeader>
          <CardContent>
            <RoomFilters filters={filters} setFilters={setFilters} />
          </CardContent>
        </Card>
      </aside>

      {/* Rooms */}
      <main className="flex-1">
        <p className="mb-6 text-muted-foreground">
          Found{" "}
          <span className="font-semibold text-primary">{stats.total}</span>{" "}
          rooms
        </p>

        {rooms.length === 0 ? (
          <Card className="border-dashed border-2">
            <CardContent className="py-16 text-center">
              <Filter className="w-10 h-10 mx-auto text-muted-foreground" />
              <h3 className="mt-4 text-xl font-semibold">No rooms found</h3>
              {stats.hasActiveFilters && (
                <Button onClick={clearFilters} className="mt-4">
                  Clear filters
                </Button>
              )}
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {rooms.map((room) => (
              <RoomCard
                key={room._id}
                room={room}
                checkInDate={filters.checkInDate}
                checkOutDate={filters.checkOutDate}
              />
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default RoomsLayout;
