import Sidebar from "@/components/sidebar/sidebar";
import { USER_SIDEBAR_LINKS } from "@/components/sidebar/user-constants/user-links";
import UserNavbar from "@/components/navbar/user-navbar/user-navbar";

export default function OwnerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen">
      <Sidebar links={USER_SIDEBAR_LINKS} />

      <div className="flex-1 flex flex-col">
        <UserNavbar />
        <main className="flex-1 p-8 ">{children}</main>
      </div>
    </div>
  );
}
