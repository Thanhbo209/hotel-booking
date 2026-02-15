export type AmenityKey =
  | "restaurant"
  | "swimmingPool"
  | "gym"
  | "spa"
  | "parking"
  | "bar";

export type HotelAmenities = Partial<Record<AmenityKey, boolean>>;
