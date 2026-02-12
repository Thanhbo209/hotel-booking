// app/(owner)/owner/layout.tsx
import Sidebar from "@/components/sidebar/sidebar";
import { OWNER_SIDEBAR_LINKS } from "@/components/sidebar/owner-datas/owner-links";
import OwnerNavbar from "@/components/navbar/owner-navbar/owner-navbar";

export default function OwnerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen">
      <Sidebar links={OWNER_SIDEBAR_LINKS} />

      <div className="flex-1 flex flex-col">
        <OwnerNavbar />
        <main className="flex-1 p-8 bg-gray-50">{children}</main>
      </div>
    </div>
  );
}
