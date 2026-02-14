"use client";

import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { CreateRoomPayload, Room, RoomStatus, RoomType } from "@/types/room";

interface Props {
  open: boolean;
  initialData?: Room;
  onClose: () => void;
  onSubmit: (payload: CreateRoomPayload) => Promise<void>;
}

export default function CreateRoomModal({
  open,
  initialData,
  onClose,
  onSubmit,
}: Props) {
  const isEdit = Boolean(initialData);
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState<CreateRoomPayload>({
    hotelId: "",
    name: "",
    roomType: "SINGLE",
    pricePerNight: 0,
    capacity: 1,
    totalRooms: 1,
    status: "ACTIVE",
    amenities: {
      wifi: false,
      airConditioner: false,
      tv: false,
      minibar: false,
      balcony: false,
      bedType: "",
    },
    images: [],
  });

  /* ===============================
     Prefill khi edit
  =============================== */
  useEffect(() => {
    if (initialData) {
      setForm({
        hotelId: initialData.hotelId,
        name: initialData.name,
        roomType: initialData.roomType,
        pricePerNight: initialData.pricePerNight,
        capacity: initialData.capacity,
        totalRooms: initialData.totalRooms,
        status: initialData.status,
        amenities: {
          wifi: initialData.amenities?.wifi ?? false,
          airConditioner: initialData.amenities?.airConditioner ?? false,
          tv: initialData.amenities?.tv ?? false,
          minibar: initialData.amenities?.minibar ?? false,
          balcony: initialData.amenities?.balcony ?? false,
          bedType: initialData.amenities?.bedType ?? "",
        },
        images: initialData.images ?? [],
      });
    }
  }, [initialData]);

  /* ===============================
     Helpers
  =============================== */
  const handleChange = <K extends keyof CreateRoomPayload>(
    key: K,
    value: CreateRoomPayload[K],
  ) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleAmenityChange = (
    key: keyof CreateRoomPayload["amenities"],
    value: boolean | string,
  ) => {
    setForm((prev) => ({
      ...prev,
      amenities: {
        ...prev.amenities,
        [key]: value,
      },
    }));
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);
      await onSubmit(form);
    } finally {
      setLoading(false);
    }
  };

  /* ===============================
     UI
  =============================== */
  return (
    <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
      <DialogContent className="max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{isEdit ? "Edit Room" : "Create Room"}</DialogTitle>
        </DialogHeader>

        <div className="grid gap-4">
          {/* Name */}
          <div>
            <Label>Name</Label>
            <Input
              value={form.name}
              onChange={(e) => handleChange("name", e.target.value)}
            />
          </div>

          {/* Room Type */}
          <div>
            <Label>Room Type</Label>
            <Select
              value={form.roomType}
              onValueChange={(v) => handleChange("roomType", v as RoomType)}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="SINGLE">Single</SelectItem>
                <SelectItem value="DOUBLE">Double</SelectItem>
                <SelectItem value="DELUXE">Deluxe</SelectItem>
                <SelectItem value="SUITE">Suite</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Price */}
          <div>
            <Label>Price per night</Label>
            <Input
              type="number"
              min={0}
              value={form.pricePerNight}
              onChange={(e) =>
                handleChange("pricePerNight", Number(e.target.value))
              }
            />
          </div>

          {/* Capacity */}
          <div>
            <Label>Capacity</Label>
            <Input
              type="number"
              min={1}
              value={form.capacity}
              onChange={(e) => handleChange("capacity", Number(e.target.value))}
            />
          </div>

          {/* Total Rooms */}
          <div>
            <Label>Total Rooms</Label>
            <Input
              type="number"
              min={1}
              value={form.totalRooms}
              onChange={(e) =>
                handleChange("totalRooms", Number(e.target.value))
              }
            />
          </div>

          {/* Status */}
          <div>
            <Label>Status</Label>
            <Select
              value={form.status}
              onValueChange={(v) => handleChange("status", v as RoomStatus)}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ACTIVE">Active</SelectItem>
                <SelectItem value="INACTIVE">Inactive</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Amenities */}
          <div className="space-y-2">
            <Label>Amenities</Label>

            {(
              ["wifi", "airConditioner", "tv", "minibar", "balcony"] as const
            ).map((key) => (
              <div key={key} className="flex items-center gap-2">
                <Checkbox
                  checked={form.amenities[key]}
                  onCheckedChange={(v) => handleAmenityChange(key, Boolean(v))}
                />
                <span className="capitalize">{key}</span>
              </div>
            ))}

            <div>
              <Label>Bed Type</Label>
              <Input
                value={form.amenities.bedType ?? ""}
                onChange={(e) => handleAmenityChange("bedType", e.target.value)}
              />
            </div>
          </div>

          {/* Images */}
          <div>
            <Label>Images (comma separated URLs)</Label>
            <Input
              value={form.images.join(", ")}
              onChange={(e) =>
                handleChange(
                  "images",
                  e.target.value
                    .split(",")
                    .map((i) => i.trim())
                    .filter(Boolean),
                )
              }
            />
          </div>

          <Button className="w-full" onClick={handleSubmit} disabled={loading}>
            {loading ? "Saving..." : isEdit ? "Update Room" : "Create Room"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
