"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

import AmenitiesField from "@/features/owner/components/amenities-checkbox";
import { useCreateHotel } from "../hooks/useCreateHotel";
import { Plus } from "lucide-react";

export default function CreateHotelModal() {
  const { submit, loading } = useCreateHotel();
  const [open, setOpen] = useState(false);

  const [form, setForm] = useState({
    name: "",
    address: "",
    city: "",
    description: "",
    available: true,
    amenities: {
      wifi: false,
      parking: false,
      pool: false,
      restaurant: false,
      gym: false,
    },
    images: [],
  });

  const handleSubmit = async () => {
    const success = await submit(form);
    if (success) {
      setOpen(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus /> Add Hotel
        </Button>
      </DialogTrigger>

      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Add Hotel</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <Input
            placeholder="Hotel Name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />

          <Input
            placeholder="Address"
            value={form.address}
            onChange={(e) => setForm({ ...form, address: e.target.value })}
          />

          <Input
            placeholder="City"
            value={form.city}
            onChange={(e) => setForm({ ...form, city: e.target.value })}
          />

          <Textarea
            placeholder="Description"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
          />

          <div className="space-y-2">
            <Label>Amenities</Label>
            <AmenitiesField
              value={form.amenities}
              onChange={(amenities: any) => setForm({ ...form, amenities })}
            />
          </div>

          <div className="flex items-center gap-2">
            <Checkbox
              checked={form.available}
              onCheckedChange={(v) =>
                setForm({ ...form, available: Boolean(v) })
              }
            />
            <Label>Available</Label>
          </div>

          <div className="flex justify-end gap-2 pt-4">
            <Button variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSubmit} disabled={loading}>
              {loading ? "Creating..." : "Create"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
