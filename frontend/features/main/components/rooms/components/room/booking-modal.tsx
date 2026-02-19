"use client";

import { BookingForm, Room } from "@/types/room";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface Props {
  room: Room;
  form: BookingForm;
  nights: number;
  total: number;
  onClose: () => void;
}

export default function BookingModal({
  room,
  form,
  nights,
  total,
  onClose,
}: Props) {
  const [confirmed, setConfirmed] = useState(false);

  const fmt = (d: string) =>
    d
      ? new Date(d).toLocaleDateString("en-US", {
          weekday: "short",
          month: "short",
          day: "numeric",
          year: "numeric",
        })
      : "Not selected";

  const handleOpenChange = (open: boolean) => {
    if (!open && !confirmed) onClose();
  };

  return (
    <Dialog open onOpenChange={handleOpenChange}>
      <DialogContent className="max-w-md p-10">
        {!confirmed ? (
          <>
            <DialogHeader className="mb-8 space-y-1">
              <p className="text-[10px] text-muted-foreground uppercase tracking-[0.25em]">
                Confirm Reservation
              </p>
              <DialogTitle className="font-display text-3xl font-light">
                {room.name}
              </DialogTitle>
            </DialogHeader>

            {/* Summary */}
            <div className="bg-muted/40 p-5 mb-8 space-y-3 rounded-sm">
              {[
                { label: "Check-in", value: fmt(form.checkIn) },
                { label: "Check-out", value: fmt(form.checkOut) },
                {
                  label: "Guests",
                  value: `${form.guests} Guest${form.guests > 1 ? "s" : ""}`,
                },
                {
                  label: "Duration",
                  value:
                    nights > 0
                      ? `${nights} Night${nights > 1 ? "s" : ""}`
                      : "—",
                },
              ].map(({ label, value }) => (
                <div key={label} className="flex justify-between text-sm">
                  <span className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
                    {label}
                  </span>
                  <span className="text-foreground">{value}</span>
                </div>
              ))}

              <div className="border-t border-border pt-4 flex justify-between items-center">
                <span className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
                  Total
                </span>
                <span className="font-display text-3xl text-primary font-light">
                  {total > 0 ? `$${total.toLocaleString()}` : "—"}
                </span>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-3">
              <Button variant="outline" className="flex-1" onClick={onClose}>
                Cancel
              </Button>
              <Button
                className="flex-2 tracking-[0.15em] uppercase text-[11px]"
                onClick={() => setConfirmed(true)}
              >
                Confirm Booking
              </Button>
            </div>
          </>
        ) : (
          /* Success state */
          <div className="text-center py-6">
            <div className="w-16 h-16 rounded-full border border-primary/30 flex items-center justify-center mx-auto mb-6">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                className="w-7 h-7 text-primary"
              >
                <path
                  d="M20 6L9 17l-5-5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <p className="text-[10px] text-primary/60 uppercase tracking-[0.3em] mb-3">
              Reservation Placed
            </p>
            <h3 className="font-display text-3xl font-light mb-4">
              Booking Confirmed
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed mb-8">
              Your stay at <span className="text-foreground">{room.name}</span>{" "}
              has been reserved.
              <br />A confirmation will be sent to your email.
            </p>
            <Button
              className="px-10 tracking-[0.2em] uppercase text-[11px]"
              onClick={onClose}
            >
              Done
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
