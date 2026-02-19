import { RoomAmenities } from "@/types/room";

/* ─── SVG Icons ─────────────────────────────────────────── */
const WifiIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    className="w-5 h-5"
  >
    <path
      d="M5 12.55a11 11 0 0114.08 0M1.42 9a16 16 0 0121.16 0M8.53 16.11a6 6 0 016.95 0M12 20h.01"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
const AcIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    className="w-5 h-5"
  >
    <rect x="2" y="6" width="20" height="8" rx="2" />
    <path d="M7 18l1-4M12 18v-4M17 18l-1-4M2 10h20" strokeLinecap="round" />
  </svg>
);
const TvIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    className="w-5 h-5"
  >
    <rect x="2" y="3" width="20" height="14" rx="2" />
    <path d="M8 21h8M12 17v4" strokeLinecap="round" />
  </svg>
);
const MinibarIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    className="w-5 h-5"
  >
    <path
      d="M8 2l-2 4h12L16 2zM6 6v14a2 2 0 002 2h8a2 2 0 002-2V6"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <line x1="6" y1="12" x2="18" y2="12" strokeLinecap="round" />
  </svg>
);
const BalconyIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    className="w-5 h-5"
  >
    <path
      d="M3 20h18M5 20V10M19 20V10M5 10h14M9 10V6m6 4V6M7 6h10"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
const BedIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    className="w-5 h-5"
  >
    <path
      d="M2 4v16M22 4v16M2 12h20M6 12V8h12v4"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

/* ─── Amenity Config ─────────────────────────────────────── */
const AMENITIES = [
  { key: "wifi", label: "Wi-Fi", icon: WifiIcon },
  { key: "airConditioner", label: "Air Conditioning", icon: AcIcon },
  { key: "tv", label: "Smart TV", icon: TvIcon },
  { key: "minibar", label: "Mini Bar", icon: MinibarIcon },
  { key: "balcony", label: "Balcony", icon: BalconyIcon },
] as const;

/* ─── Single chip ────────────────────────────────────────── */
function AmenityChip({
  icon: Icon,
  label,
  active,
}: {
  icon: React.ComponentType;
  label: string;
  active: boolean;
}) {
  return (
    <div
      className={`
        flex items-center gap-3 px-4 py-3 border text-xs tracking-[0.12em] uppercase
        transition-all duration-200
        ${
          active
            ? "border-primary/30 bg-primary/5 text-primary"
            : "border-border text-muted-foreground line-through"
        }
      `}
    >
      <Icon />
      <span>{label}</span>
      {active && (
        <span className="ml-auto w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
      )}
    </div>
  );
}

/* ─── Component ──────────────────────────────────────────── */
interface Props {
  amenities: RoomAmenities;
}

export default function RoomAmenitiesGrid({ amenities }: Props) {
  return (
    <div>
      <h2 className="font-display text-2xl font-light tracking-wide  mb-6">
        Amenities & Features
      </h2>

      {/* Bed type – always shown first */}
      <div className="flex items-center gap-3 px-4 py-3 border border-primary/30 bg-primary/5 text-primary text-xs tracking-[0.12em] uppercase mb-3">
        <BedIcon />
        <span>{amenities.bedType ?? "Standard"} Bed</span>
        <span className="ml-auto w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        {AMENITIES.map(({ key, label, icon }) => (
          <AmenityChip
            key={key}
            icon={icon}
            label={label}
            active={!!amenities[key]}
          />
        ))}
      </div>
    </div>
  );
}

/* ─── Mini icon row (for cards / booking sidebar) ────────── */
export function AmenityIconRow({ amenities }: { amenities: RoomAmenities }) {
  const active = AMENITIES.filter(
    (a) => amenities[a.key as keyof RoomAmenities],
  );
  return (
    <div className="flex items-center gap-3 text-primary/60">
      {active.slice(0, 4).map(({ key, icon: Icon }) => (
        <Icon key={key} />
      ))}
      {active.length > 4 && (
        <span className="text-[10px] text-muted-foreground tracking-widest">
          +{active.length - 4}
        </span>
      )}
    </div>
  );
}
