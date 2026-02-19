import { RoomType } from "@/types/room";

const CONFIG: Record<RoomType, { label: string; classes: string }> = {
  SUITE: {
    label: "Suite",
    classes: "border-amber-500/40 text-amber-400 bg-amber-500/5",
  },
  DELUXE: {
    label: "Deluxe",
    classes: "border-sky-500/40 text-sky-400 bg-sky-500/5",
  },
  DOUBLE: {
    label: "Double",
    classes: "border-emerald-500/40 text-emerald-400 bg-emerald-500/5",
  },
  SINGLE: {
    label: "Single",
    classes: "border-rose-500/40 text-rose-400 bg-rose-500/5",
  },
};

interface Props {
  type: RoomType;
  size?: "sm" | "md";
}

export default function RoomTypeBadge({ type, size = "md" }: Props) {
  const { label, classes } = CONFIG[type];
  return (
    <span
      className={`
        inline-block border tracking-[0.2em] uppercase font-medium
        ${size === "sm" ? "text-[9px] px-2 py-0.5" : "text-[10px] px-3 py-1"}
        ${classes}
      `}
    >
      {label}
    </span>
  );
}
