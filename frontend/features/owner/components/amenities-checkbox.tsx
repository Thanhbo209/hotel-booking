import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Amenities } from "@/types/hotel";
import { AmenityKey } from "@/types/hotel-amenities.types";
import {
  Utensils,
  Waves,
  Dumbbell,
  Sparkles,
  ParkingCircle,
  Wine,
} from "lucide-react";
export const AMENITIES: {
  key: AmenityKey;
  label: string;
  Icon: React.ElementType;
}[] = [
  { key: "restaurant", label: "Restaurant", Icon: Utensils },
  { key: "swimmingPool", label: "Swimming Pool", Icon: Waves },
  { key: "gym", label: "Gym", Icon: Dumbbell },
  { key: "spa", label: "Spa", Icon: Sparkles },
  { key: "parking", label: "Parking", Icon: ParkingCircle },
  { key: "bar", label: "Bar", Icon: Wine },
];
interface Props {
  value: Amenities;
  onChange: (val: Amenities) => void;
}

export default function AmenitiesField({ value, onChange }: Props) {
  return (
    <div className="grid grid-cols-2 gap-3">
      {AMENITIES.map((item) => (
        <div key={item.key} className="flex items-center gap-2">
          <Checkbox
            id={item.key}
            checked={value[item.key]}
            onCheckedChange={(checked) =>
              onChange({
                ...value,
                [item.key]: Boolean(checked),
              })
            }
          />
          <Label htmlFor={item.key}>{item.label}</Label>
        </div>
      ))}
    </div>
  );
}
