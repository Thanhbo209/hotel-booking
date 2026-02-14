import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

export const AMENITIES = [
  { key: "wifi", label: "WiFi" },
  { key: "parking", label: "Parking" },
  { key: "pool", label: "Swimming Pool" },
  { key: "restaurant", label: "Restaurant" },
  { key: "gym", label: "Gym" },
] as const;

type AmenityKey = (typeof AMENITIES)[number]["key"];

interface Props {
  value: Record<AmenityKey, boolean>;
  onChange: (val: Record<AmenityKey, boolean>) => void;
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
