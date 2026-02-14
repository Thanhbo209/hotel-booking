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

import { Amenities, CreateHotelPayload } from "@/types/hotel";

interface Props {
  onSuccess?: () => void;
}

export default function CreateHotelModal({ onSuccess }: Props) {
  const { submit, loading } = useCreateHotel();
  const [open, setOpen] = useState(false);
  const [imageInput, setImageInput] = useState("");

  const [form, setForm] = useState<CreateHotelPayload>({
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
    let payload = { ...form };

    // 🔥 auto add imageInput nếu còn
    if (imageInput.trim()) {
      payload = {
        ...payload,
        images: [...payload.images, imageInput.trim()],
      };
    }

    console.log("SUBMIT PAYLOAD:", payload);

    const success = await submit(payload);
    if (success) {
      onSuccess?.();
      setOpen(false);
      setImageInput("");

      setForm({
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
              onChange={(amenities: Amenities) =>
                setForm({ ...form, amenities })
              }
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

          {/* Images */}
          <div className="space-y-2">
            <Label>Hotel Images (URLs)</Label>

            <div className="flex gap-2">
              <Input
                placeholder="https://example.com/image.jpg"
                value={imageInput}
                onChange={(e) => setImageInput(e.target.value)}
              />
              <Button
                type="button"
                variant="secondary"
                onClick={() => {
                  if (!imageInput.trim()) return;
                  setForm({
                    ...form,
                    images: [...form.images, imageInput.trim()],
                  });
                  setImageInput("");
                }}
              >
                Add
              </Button>
            </div>

            {form.images.length > 0 && (
              <ul className="space-y-1 text-sm">
                {form.images.map((img, index) => (
                  <li key={index} className="flex items-center justify-between">
                    <span className="truncate">{img}</span>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() =>
                        setForm({
                          ...form,
                          images: form.images.filter((_, i) => i !== index),
                        })
                      }
                    >
                      Remove
                    </Button>
                  </li>
                ))}
              </ul>
            )}
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
