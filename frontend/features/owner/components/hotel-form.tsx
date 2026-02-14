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
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { X, Plus, ImagePlus } from "lucide-react";

import AmenitiesField from "@/features/owner/components/amenities-checkbox";
import { useCreateHotel } from "../hooks/useCreateHotel";
import {
  Amenities,
  CreateHotelPayload,
  EMPTY_AMENITIES,
  Hotel,
} from "@/types/hotel";
import { useUpdateHotel } from "@/features/owner/hooks/useUpdateHotel";

interface Props {
  open: boolean;
  setOpen: (open: boolean) => void;
  mode?: "create" | "edit";
  defaultValue?: Hotel | null;
  onSuccess?: () => void;
}

const MAX_IMAGES = 6;

const EMPTY_FORM: CreateHotelPayload = {
  name: "",
  address: "",
  city: "",
  description: "",
  amenities: EMPTY_AMENITIES,
  images: [],
};

export default function CreateHotelModal({
  open,
  setOpen,
  mode = "create",
  defaultValue,
  onSuccess,
}: Props) {
  const { submit: createSubmit, loading } = useCreateHotel();
  const { submit: updateSubmit, loading: updating } = useUpdateHotel();
  const [form, setForm] = useState<CreateHotelPayload>(EMPTY_FORM);
  const [imageInput, setImageInput] = useState("");

  /* ---------------- SYNC FORM ---------------- */
  useEffect(() => {
    if (!open) return;

    if (mode === "edit" && defaultValue) {
      setForm({
        name: defaultValue.name,
        address: defaultValue.address,
        city: defaultValue.city ?? "",
        description: defaultValue.description ?? "",
        amenities: defaultValue.amenities ?? EMPTY_AMENITIES,
        images: defaultValue.images ?? [],
      });
    } else {
      setForm(EMPTY_FORM);
    }

    setImageInput("");
  }, [open, mode, defaultValue]);

  /* ---------------- ADD IMAGE ---------------- */
  const handleAddImage = () => {
    if (!imageInput.trim()) return;
    if (form.images.length >= MAX_IMAGES) return;

    setForm({
      ...form,
      images: [...form.images, imageInput.trim()],
    });

    setImageInput("");
  };

  /* ---------------- REMOVE IMAGE ---------------- */
  const handleRemoveImage = (index: number) => {
    setForm({
      ...form,
      images: form.images.filter((_, i) => i !== index),
    });
  };

  /* ---------------- SUBMIT ---------------- */
  const handleSubmit = async () => {
    let result = null;

    if (mode === "edit" && defaultValue?._id) {
      result = await updateSubmit(defaultValue._id, form);
    } else {
      result = await createSubmit(form);
    }

    if (result) {
      onSuccess?.();
      setOpen(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAddImage();
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="min-w-7xl w-full max-h-[95vh] p-0 gap-0">
        {/* Header */}
        <DialogHeader className="px-6 py-4 border-b">
          <DialogTitle className="text-2xl font-bold">
            {mode === "edit" ? "Edit Hotel" : "Create New Hotel"}
          </DialogTitle>
        </DialogHeader>

        {/* Content */}
        <div className="flex flex-col lg:flex-row h-[calc(95vh-140px)]">
          {/* ---------------- LEFT: IMAGE PANEL ---------------- */}
          <div className="lg:w-2/5 border-r flex flex-col bg-gray-50">
            {/* Image Header */}
            <div className="px-6 py-4 border-b bg-white">
              <div className="flex items-center justify-between mb-3">
                <Label className="text-base font-semibold">Hotel Images</Label>
                <span className="text-sm text-muted-foreground">
                  {form.images.length}/{MAX_IMAGES}
                </span>
              </div>

              {/* Add Image Input */}
              <div className="flex gap-2">
                <Input
                  placeholder="Paste image URL and press Enter..."
                  value={imageInput}
                  onChange={(e) => setImageInput(e.target.value)}
                  onKeyPress={handleKeyPress}
                  className="flex-1"
                />
                <Button
                  type="button"
                  onClick={handleAddImage}
                  disabled={
                    form.images.length >= MAX_IMAGES || !imageInput.trim()
                  }
                  size="icon"
                  className="shrink-0"
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>

              {form.images.length >= MAX_IMAGES && (
                <p className="text-xs text-amber-600 mt-2">
                  Maximum {MAX_IMAGES} images reached
                </p>
              )}
            </div>

            {/* Image Gallery */}
            <ScrollArea className="flex-1 px-6 py-4">
              {form.images.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-64 text-center">
                  <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center mb-4">
                    <ImagePlus className="w-10 h-10 text-gray-400" />
                  </div>
                  <p className="text-sm font-medium text-gray-600 mb-1">
                    No images yet
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Add image URLs to showcase your hotel
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-4">
                  {form.images.map((img, index) => (
                    <div
                      key={index}
                      className="group relative aspect-4/3 rounded-lg overflow-hidden border-2 border-gray-200 hover:border-blue-500 transition-colors bg-white"
                    >
                      {/* Image */}
                      <img
                        src={img}
                        alt={`Hotel preview ${index + 1}`}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.currentTarget.src =
                            "https://via.placeholder.com/400x300?text=Invalid+Image";
                        }}
                      />

                      {/* Index Badge */}
                      <div className="absolute top-2 left-2 w-6 h-6 bg-blue-600 text-white text-xs font-bold rounded-full flex items-center justify-center">
                        {index + 1}
                      </div>

                      {/* Remove Button */}
                      <Button
                        type="button"
                        size="icon"
                        variant="destructive"
                        className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity h-8 w-8"
                        onClick={() => handleRemoveImage(index)}
                      >
                        <X className="h-4 w-4" />
                      </Button>

                      {/* Primary Badge */}
                      {index === 0 && (
                        <div className="absolute bottom-2 left-2 px-2 py-1 bg-blue-600 text-white text-xs font-semibold rounded">
                          Primary
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </ScrollArea>
          </div>

          {/* ---------------- RIGHT: FORM FIELDS ---------------- */}
          <div className="lg:w-3/5 flex flex-col">
            <ScrollArea className="flex-1 px-6 py-6">
              <div className="space-y-6 max-w-2xl">
                {/* Hotel Name */}
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-base font-semibold">
                    Hotel Name <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="name"
                    placeholder="e.g. Grand Plaza Hotel"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="h-11 text-base"
                  />
                </div>

                {/* Address */}
                <div className="space-y-2">
                  <Label htmlFor="address" className="text-base font-semibold">
                    Address <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="address"
                    placeholder="e.g. 123 Main Street"
                    value={form.address}
                    onChange={(e) =>
                      setForm({ ...form, address: e.target.value })
                    }
                    className="h-11 text-base"
                  />
                </div>

                {/* City */}
                <div className="space-y-2">
                  <Label htmlFor="city" className="text-base font-semibold">
                    City <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="city"
                    placeholder="e.g. New York"
                    value={form.city}
                    onChange={(e) => setForm({ ...form, city: e.target.value })}
                    className="h-11 text-base"
                  />
                </div>

                {/* Description */}
                <div className="space-y-2">
                  <Label
                    htmlFor="description"
                    className="text-base font-semibold"
                  >
                    Description
                  </Label>
                  <Textarea
                    id="description"
                    placeholder="Describe your hotel, its facilities, and what makes it special..."
                    value={form.description}
                    onChange={(e) =>
                      setForm({ ...form, description: e.target.value })
                    }
                    rows={5}
                    className="resize-none text-base"
                  />
                  <p className="text-xs text-muted-foreground">
                    {form.description?.length} characters
                  </p>
                </div>

                {/* Amenities */}
                <div className="space-y-3">
                  <Label className="text-base font-semibold">Amenities</Label>
                  <div className="border rounded-lg p-4 bg-gray-50">
                    <AmenitiesField
                      value={form.amenities}
                      onChange={(amenities: Amenities) =>
                        setForm({ ...form, amenities })
                      }
                    />
                  </div>
                </div>
              </div>
            </ScrollArea>

            {/* ACTION BUTTONS */}
            <div className="px-6 py-4 border-t bg-white flex justify-between items-center">
              <p className="text-sm text-muted-foreground">
                <span className="text-red-500">*</span> Required fields
              </p>

              <div className="flex gap-3">
                <Button
                  variant="outline"
                  onClick={() => setOpen(false)}
                  disabled={loading}
                  className="min-w-24"
                >
                  Cancel
                </Button>

                <Button
                  onClick={handleSubmit}
                  disabled={
                    loading || !form.name || !form.address || !form.city
                  }
                  className="min-w-24"
                >
                  {loading ? (
                    <>
                      <span className="animate-spin mr-2">⏳</span>
                      {mode === "edit" ? "Updating..." : "Creating..."}
                    </>
                  ) : mode === "edit" ? (
                    "Update Hotel"
                  ) : (
                    "Create Hotel"
                  )}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
