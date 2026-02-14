"use client";
import { useState } from "react";
import { Calendar, MapPin, Users, Search, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { format } from "date-fns";
import { vi } from "date-fns/locale";
import { LOCATION_BY_REGION } from "@/features/home/components/home/data/home-data";

const SearchFilter = () => {
  const [location, setLocation] = useState("");
  const [date, setDate] = useState<Date>();
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);
  const [isGuestMenuOpen, setIsGuestMenuOpen] = useState(false);

  const totalGuests = adults + children;

  const handleSearch = () => {
    console.log({
      location,
      date: date ? format(date, "yyyy-MM-dd") : null,
      adults,
      children,
    });
    // Add your search logic here
  };

  return (
    <div className="bg-card rounded-2xl border border-border shadow-2xl p-6 backdrop-blur-sm">
      <div className="grid grid-cols-1 md:grid-cols-[2fr_1.5fr_1.5fr_1fr] gap-3 items-center">
        {/* Location Selector */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              className="w-full justify-between text-left font-normal h-16 px-5 hover:bg-accent/50 rounded-md border border-transparent hover:border-border transition-all"
            >
              <div className="flex items-center gap-3 overflow-hidden">
                <div className="shrink-0 w-10 h-10  rounded-lg flex items-center justify-center">
                  <MapPin className="h-5 w-5 text-orange-600" />
                </div>
                <div className="flex flex-col items-start overflow-hidden">
                  <span className="text-xs text-muted-foreground font-medium">
                    Select Location
                  </span>
                  <span className="text-sm font-semibold truncate w-full">
                    {location || "Where do you want to travel?"}
                  </span>
                </div>
              </div>
              <ChevronDown className="h-4 w-4 text-muted-foreground shrink-0" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="w-64">
            {Object.entries(LOCATION_BY_REGION).map(
              ([region, cities], index, arr) => (
                <div key={region}>
                  <DropdownMenuLabel className="text-xs font-semibold text-muted-foreground">
                    {region}
                  </DropdownMenuLabel>
                  {cities.map((city) => (
                    <DropdownMenuItem
                      key={city}
                      onClick={() => setLocation(city)}
                      className="cursor-pointer"
                    >
                      <MapPin className="mr-2 h-4 w-4 text-muted-foreground" />
                      {city}
                    </DropdownMenuItem>
                  ))}
                  {index < arr.length - 1 && <DropdownMenuSeparator />}
                </div>
              ),
            )}
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Date Picker */}
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className="w-full justify-between text-left font-normal h-16 px-5 hover:bg-accent/50 rounded-md border border-transparent hover:border-border transition-all"
            >
              <div className="flex items-center gap-3 overflow-hidden">
                <div className="shrink-0 w-10 h-10  rounded-lg flex items-center justify-center">
                  <Calendar className="h-5 w-5 text-blue-600" />
                </div>
                <div className="flex flex-col items-start overflow-hidden">
                  <span className="text-xs text-muted-foreground font-medium">
                    Check Available
                  </span>
                  <span className="text-sm font-semibold truncate w-full">
                    {date
                      ? format(date, "dd/MM/yyyy", { locale: vi })
                      : "Pick a date"}
                  </span>
                </div>
              </div>
              <ChevronDown className="h-4 w-4 text-muted-foreground shrink-0" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <CalendarComponent
              mode="single"
              selected={date}
              onSelect={setDate}
              initialFocus
              disabled={(d) => {
                const today = new Date();
                today.setHours(0, 0, 0, 0);
                return d < today;
              }}
            />
          </PopoverContent>
        </Popover>

        {/* Guest Selector */}
        <DropdownMenu open={isGuestMenuOpen} onOpenChange={setIsGuestMenuOpen}>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              className="w-full justify-between text-left font-normal h-16 px-5 rounded-md border border-transparent hover:border-border transition-all"
            >
              <div className="flex items-center gap-3 overflow-hidden">
                <div className="shrink-0 w-10 h-10  rounded-lg flex items-center justify-center">
                  <Users className="h-5 w-5 text-purple-600" />
                </div>
                <div className="flex flex-col items-start overflow-hidden">
                  <span className="text-xs text-muted-foreground font-medium">
                    Person
                  </span>
                  <span className="text-sm font-semibold truncate w-full">
                    {totalGuests} {totalGuests === 1 ? "person" : "persons"}
                  </span>
                </div>
              </div>
              <ChevronDown className="h-4 w-4 text-muted-foreground shrink-0" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="w-72 p-4">
            {/* Adults */}
            <div className="flex items-center justify-between py-3">
              <div>
                <div className="font-semibold text-sm">Adults</div>
                <div className="text-xs text-muted-foreground">From 13+</div>
              </div>
              <div className="flex items-center gap-3">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setAdults(Math.max(1, adults - 1))}
                  disabled={adults <= 1}
                  className="h-8 w-8 rounded-full"
                >
                  -
                </Button>
                <span className="text-sm font-semibold w-6 text-center">
                  {adults}
                </span>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setAdults(Math.min(20, adults + 1))}
                  disabled={adults >= 20}
                  className="h-8 w-8 rounded-full"
                >
                  +
                </Button>
              </div>
            </div>

            <DropdownMenuSeparator />

            {/* Children */}
            <div className="flex items-center justify-between py-3">
              <div>
                <div className="font-semibold text-sm">Children</div>
                <div className="text-xs text-muted-foreground">
                  2-12 years old
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setChildren(Math.max(0, children - 1))}
                  disabled={children <= 0}
                  className="h-8 w-8 rounded-full"
                >
                  -
                </Button>
                <span className="text-sm font-semibold w-6 text-center">
                  {children}
                </span>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setChildren(Math.min(20, children + 1))}
                  disabled={children >= 20}
                  className="h-8 w-8 rounded-full"
                >
                  +
                </Button>
              </div>
            </div>

            <DropdownMenuSeparator />

            <div className="pt-2">
              <Button
                onClick={() => setIsGuestMenuOpen(false)}
                className="w-full"
                size="sm"
              >
                Confirm
              </Button>
            </div>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Search Button */}
        <Button
          size="lg"
          variant={"default"}
          onClick={handleSearch}
          className="w-full h-16 text-xl   shadow-lg shadow-orange-500/30 hover:shadow-xl hover:shadow-orange-500/40 transition-all duration-300 rounded-xl"
        >
          <Search className="mr-2 h-5 w-5" />
          Search
        </Button>
      </div>
    </div>
  );
};

export default SearchFilter;
