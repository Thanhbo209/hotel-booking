import Link from "next/link";
import { LucideIcon } from "lucide-react";

interface SidebarLink {
  label: string;
  path: string;
  icon: LucideIcon;
  position?: "top" | "bottom";
}

interface SidebarProps {
  links: SidebarLink[];
  logo?: string;
}

export default function Sidebar({ links, logo = "Hotel" }: SidebarProps) {
  const topLinks = links.filter((l) => l.position !== "bottom");
  const bottomLinks = links.filter((l) => l.position === "bottom");

  const renderLink = (link: SidebarLink) => {
    const Icon = link.icon;

    return (
      <Link
        key={link.path}
        href={link.path}
        className="flex items-center gap-3 px-4 py-3 mb-1 rounded-lg
                    hover:bg-muted transition"
      >
        <Icon className="w-5 h-5" />
        <span className="text-sm font-medium">{link.label}</span>
      </Link>
    );
  };

  return (
    <aside className="w-64 min-h-screen border-r  flex flex-col">
      {/* Logo */}
      <div className="p-6">
        <h2 className="flex">
          {logo}
          <span className="text-primary">Hub</span>
        </h2>
      </div>

      {/* Main links */}
      <nav className="flex-1 px-4">{topLinks.map(renderLink)}</nav>

      {/* Bottom links */}
      {bottomLinks.length > 0 && (
        <>
          <div className="border-t border-dashed mx-4 my-2" />
          <div className="px-4 pb-4">{bottomLinks.map(renderLink)}</div>
        </>
      )}
    </aside>
  );
}
