import { RoomFilterParams, RoomStatus, RoomType } from "@/types/room";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";

interface Props {
  filters: RoomFilterParams;
  setFilters: (f: RoomFilterParams) => void;
}

export default function RoomFilter({ filters, setFilters }: Props) {
  return (
    <div className="flex gap-4 flex-wrap">
      <Select
        onValueChange={(v: RoomStatus) =>
          setFilters({ ...filters, status: v, page: 1 })
        }
      >
        <SelectTrigger className="w-40">
          <SelectValue placeholder="Status" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="ACTIVE">ACTIVE</SelectItem>
          <SelectItem value="INACTIVE">INACTIVE</SelectItem>
        </SelectContent>
      </Select>

      <Select
        onValueChange={(v: RoomType) =>
          setFilters({ ...filters, roomType: v, page: 1 })
        }
      >
        <SelectTrigger className="w-40">
          <SelectValue placeholder="Type" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="SINGLE">SINGLE</SelectItem>
          <SelectItem value="DOUBLE">DOUBLE</SelectItem>
          <SelectItem value="DELUXE">DELUXE</SelectItem>
          <SelectItem value="SUITE">SUITE</SelectItem>
        </SelectContent>
      </Select>

      <Input
        type="number"
        placeholder="Min price"
        className="w-32"
        onChange={(e) =>
          setFilters({
            ...filters,
            minPrice: Number(e.target.value) || undefined,
            page: 1,
          })
        }
      />
    </div>
  );
}
