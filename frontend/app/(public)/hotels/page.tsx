"use client";

import { usePublicHotels } from "@/features/main/hooks/usePublicHotels";
import { useHotelFilters } from "@/features/main/components/hotels/hooks/useHotelFilters";
import { FilterState } from "@/types/filter.types";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Search, Filter, X, SlidersHorizontal } from "lucide-react";
import { HotelCard } from "@/features/main/components/hotels/components/hotels-card";
import { FilterContent } from "@/features/main/components/hotels/components/filter-content";
import { PublicHotel } from "@/features/main/services/public-hotel.service";

export default function HotelsPage() {
  const { hotels, loading, error } = usePublicHotels();
  const {
    filters,
    setFilters,
    filteredHotels,
    clearFilters,
    hasActiveFilters,
  } = useHotelFilters(hotels);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-10 w-10 border-4 border-border border-t-primary mx-auto"></div>
          <p className="mt-6 text-muted-foreground font-medium">Loading...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-linear-to-br from-slate-50 via-blue-50/30 to-slate-50 flex items-center justify-center">
        <Card className="max-w-md">
          <CardContent className="pt-6 text-center">
            <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center mx-auto mb-4">
              <X className="w-8 h-8 text-red-600" />
            </div>
            <h3 className="text-xl font-semibold text-slate-900 mb-2">
              Error...
            </h3>
            <p className="text-slate-600">{error}</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Header */}
      <SearchHeader
        filters={filters}
        setFilters={setFilters}
        hasActiveFilters={hasActiveFilters}
        clearFilters={clearFilters}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex gap-8">
          {/* Desktop Sidebar Filters */}
          <FilterSidebar
            filters={filters}
            setFilters={setFilters}
            hasActiveFilters={hasActiveFilters}
            clearFilters={clearFilters}
          />

          {/* Hotels List */}
          <HotelsList
            hotels={filteredHotels}
            hasActiveFilters={hasActiveFilters}
            clearFilters={clearFilters}
          />
        </div>
      </div>
    </div>
  );
}

// Search Header Component
function SearchHeader({
  filters,
  setFilters,
  hasActiveFilters,
  clearFilters,
}: {
  filters: FilterState;
  setFilters: (filters: FilterState) => void;
  hasActiveFilters: boolean;
  clearFilters: () => void;
}) {
  return (
    <div className="backdrop-blur-xl sticky top-0 z-40 mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex items-center gap-4">
          {/* Search Bar */}
          <div className="flex-1 relative group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 group-focus-within:text-primary transition-colors" />
            <Input
              type="text"
              placeholder="Search hotels..."
              value={filters.searchQuery}
              onChange={(e) =>
                setFilters({ ...filters, searchQuery: e.target.value })
              }
              className="pl-12 h-12 text-base focus-visible:ring-2 focus-visible:ring-primary focus-visible:border-primary"
            />
          </div>

          {/* Mobile Filter Button */}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="lg" className="lg:hidden">
                <SlidersHorizontal className="w-5 h-5 mr-2" />
                Filter
              </Button>
            </SheetTrigger>
            <SheetContent
              side="left"
              className="w-full sm:w-96 overflow-y-auto"
            >
              <SheetHeader>
                <SheetTitle className="flex items-center gap-2">
                  <Filter className="w-5 h-5" />
                  Filter
                </SheetTitle>
              </SheetHeader>
              <div className="mt-6">
                <FilterContent
                  filters={filters}
                  setFilters={setFilters}
                  hasActiveFilters={hasActiveFilters}
                  clearFilters={clearFilters}
                />
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </div>
  );
}

// Filter Sidebar Component
function FilterSidebar({
  filters,
  setFilters,
  hasActiveFilters,
  clearFilters,
}: {
  filters: FilterState;
  setFilters: (filters: FilterState) => void;
  hasActiveFilters: boolean;
  clearFilters: () => void;
}) {
  return (
    <aside className="hidden lg:block w-80 shrink-0">
      <div className="sticky top-28">
        <Card className="border-border shadow-lg">
          <CardHeader className="border-b border-border">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold flex items-center gap-2">
                <Filter className="w-5 h-5 text-primary" />
                Filter
              </h2>
              {hasActiveFilters && (
                <Button
                  onClick={clearFilters}
                  variant="outline"
                  size="sm"
                  className="text-destructive hover:text-primary/80"
                >
                  <X className="w-4 h-4 mr-1" />
                  Clear
                </Button>
              )}
            </div>
          </CardHeader>
          <CardContent className="">
            <FilterContent
              filters={filters}
              setFilters={setFilters}
              hasActiveFilters={hasActiveFilters}
              clearFilters={clearFilters}
            />
          </CardContent>
        </Card>
      </div>
    </aside>
  );
}

// Hotels List Component
function HotelsList({
  hotels,
  hasActiveFilters,
  clearFilters,
}: {
  hotels: PublicHotel[];
  hasActiveFilters: boolean;
  clearFilters: () => void;
}) {
  return (
    <main className="flex-1 min-w-0">
      {/* Results Header */}
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold mb-1">Explore more hotels</h1>
          <p className="text-muted-foreground">
            Found{" "}
            <span className="font-semibold text-primary">{hotels.length}</span>{" "}
            match your filters
          </p>
        </div>
      </div>

      {hotels.length === 0 ? (
        <Card className="border-dashed border-2 border-border">
          <CardContent className="py-16 text-center">
            <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-10 h-10" />
            </div>
            <h3 className="text-xl font-semibold  mb-2">
              We can&apos;t found your hotel.
            </h3>
            <p className="text-muted-foreground mb-4">
              Try to change the filter to search
            </p>
            {hasActiveFilters && (
              <Button onClick={clearFilters}>Clear filters</Button>
            )}
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 gap-6">
          {hotels.map((hotel) => (
            <HotelCard key={hotel._id} hotel={hotel} />
          ))}
        </div>
      )}
    </main>
  );
}
