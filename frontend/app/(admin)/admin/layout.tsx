import Sidebar from "@/components/sidebar/sidebar";
import { ADMIN_SIDEBAR_LINKS } from "@/components/sidebar/admin-datas/admin-links";
import AdminNavbar from "@/components/navbar/admin-navbar/admin-navbar";

export default function ADMINLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen">
      <Sidebar links={ADMIN_SIDEBAR_LINKS} />

      <div className="flex-1 flex flex-col">
        <AdminNavbar />
        <main className="flex-1 p-8 bg-gray-50">{children}</main>
      </div>
    </div>
  );
}
