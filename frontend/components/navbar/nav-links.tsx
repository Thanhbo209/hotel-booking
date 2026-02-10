"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { NAV_LINKS } from "@/components/navbar/nav-links-data";
import clsx from "clsx";

export default function NavLinks({ onClick }: { onClick?: () => void }) {
  const pathname = usePathname();

  return (
    <>
      {NAV_LINKS.map((item) => {
        const isActive =
          pathname === item.href ||
          (item.href !== "/" && pathname.startsWith(item.href));

        return (
          <Link
            key={item.href}
            href={item.href}
            onClick={onClick}
            className={clsx(
              "nav-link transition-colors",
              isActive
                ? "text-primary font-semibold"
                : "text-muted-foreground hover:text-primary",
            )}
          >
            {item.label}
          </Link>
        );
      })}
    </>
  );
}
