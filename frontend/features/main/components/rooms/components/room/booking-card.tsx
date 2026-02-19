"use client";

import { useState } from "react";
import { BookingForm } from "@/types/room";
import BookingModal from "@/features/main/components/rooms/components/room/booking-modal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { PublicRoom } from "@/types/hotel";

interface Props {
  room: PublicRoom;
}

export default function BookingCard({ room }: Props) {
  const [form, setForm] = useState<BookingForm>({
    checkIn: "",
    checkOut: "",
    guests: 1,
  });
  const [modalOpen, setModalOpen] = useState(false);

  const nights =
    form.checkIn && form.checkOut
      ? Math.max(
          0,
          (new Date(form.checkOut).getTime() -
            new Date(form.checkIn).getTime()) /
            86_400_000,
        )
      : 0;
  const total = nights * room.pricePerNight;

  return (
    <>
      <div className="sticky top-8 border border-border">
        {/* Price */}
        <div className="px-8 pt-8 pb-6 border-b border-border">
          <p className="text-[10px] text-muted-foreground uppercase tracking-[0.2em] mb-1">
            Starting from
          </p>
          <div className="flex items-end gap-2">
            <span className="font-display text-5xl font-light text-primary">
              ${room.pricePerNight}
            </span>
            <span className="text-muted-foreground text-sm pb-1">/ night</span>
          </div>
        </div>

        {/* Form */}
        <div className="px-8 py-6 space-y-4">
          {/* Check-in */}
          <div>
            <label className="block text-[10px] uppercase tracking-[0.2em] text-muted-foreground mb-2">
              Check-in
            </label>
            <Input
              type="date"
              value={form.checkIn}
              onChange={(e) =>
                setForm((prev) => ({ ...prev, checkIn: e.target.value }))
              }
              className="[color-scheme:dark]"
            />
          </div>

          {/* Check-out */}
          <div>
            <label className="block text-[10px] uppercase tracking-[0.2em] text-muted-foreground mb-2">
              Check-out
            </label>
            <Input
              type="date"
              value={form.checkOut}
              min={form.checkIn}
              onChange={(e) =>
                setForm((prev) => ({ ...prev, checkOut: e.target.value }))
              }
              className="[color-scheme:dark]"
            />
          </div>

          {/* Guests */}
          <div>
            <label className="block text-[10px] uppercase tracking-[0.2em] text-muted-foreground mb-2">
              Guests
            </label>
            <Select
              value={String(form.guests)}
              onValueChange={(val) =>
                setForm((prev) => ({ ...prev, guests: Number(val) }))
              }
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select guests" />
              </SelectTrigger>
              <SelectContent>
                {Array.from({ length: room.capacity }, (_, i) => i + 1).map(
                  (n) => (
                    <SelectItem key={n} value={String(n)}>
                      {n} Guest{n > 1 ? "s" : ""}
                    </SelectItem>
                  ),
                )}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Pricing breakdown */}
        {nights > 0 && (
          <div className="mx-8 mb-4 border border-border p-4 bg-muted/30">
            <div className="flex justify-between text-sm mb-2 text-muted-foreground">
              <span>
                ${room.pricePerNight} × {nights} night{nights > 1 ? "s" : ""}
              </span>
              <span>${(room.pricePerNight * nights).toLocaleString()}</span>
            </div>
            <div className="border-t border-border pt-3 flex justify-between items-center">
              <span className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
                Total
              </span>
              <span className="font-display text-2xl text-primary font-light">
                ${total.toLocaleString()}
              </span>
            </div>
          </div>
        )}

        {/* CTA */}
        <div className="px-8 pb-8">
          <Button
            size="lg"
            className="w-full tracking-[0.2em] uppercase text-[11px]"
            onClick={() => setModalOpen(true)}
          >
            Book Now
          </Button>
          <p className="text-center text-[10px] text-muted-foreground mt-3 tracking-wide">
            Free cancellation · No prepayment needed
          </p>
        </div>
      </div>

      {modalOpen && (
        <BookingModal
          room={room}
          form={form}
          nights={nights}
          total={total}
          onClose={() => setModalOpen(false)}
        />
      )}
    </>
  );
}
