import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Amenities } from "@/types/hotel";

export const AMENITIES: {
  key: keyof Amenities;
  label: string;
}[] = [
  { key: "restaurant", label: "Restaurant" },
  { key: "swimmingPool", label: "Swimming Pool" },
  { key: "gym", label: "Gym" },
  { key: "spa", label: "Spa" },
  { key: "parking", label: "Parking" },
  { key: "bar", label: "Bar" },
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
