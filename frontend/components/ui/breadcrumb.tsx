"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const formatLabel = (segment: string) => {
  if (/^[0-9a-fA-F]{24}$/.test(segment)) return null; // Mongo ObjectId
  return segment.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
};

export default function Breadcrumb() {
  const pathname = usePathname();

  const segments = pathname.split("/").filter(Boolean);
  const lastVisibleIndex = (() => {
    for (let i = segments.length - 1; i >= 0; i--) {
      if (formatLabel(segments[i])) return i;
    }
    return -1;
  })();
  return (
    <nav className="text-sm text-muted-foreground">
      <ol className="flex items-center gap-2">
        <li>
          <Link href="/" className="hover:text-foreground">
            Home
          </Link>
        </li>

        {segments.map((segment, index) => {
          const label = formatLabel(segment);
          if (!label) return null;

          const href = "/" + segments.slice(0, index + 1).join("/");
          const isLast = index === lastVisibleIndex;

          return (
            <li key={href} className="flex items-center gap-2">
              <span>/</span>
              {isLast ? (
                <span className="text-foreground font-medium">{label}</span>
              ) : (
                <Link href={href} className="hover:text-foreground">
                  {label}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
