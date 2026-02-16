import type { Metadata } from "next";
import { cookies } from "next/headers";
import Navbar from "@/components/navbar/navbar";
import Footer from "@/components/footer/footer";

export const metadata: Metadata = {
  title: "HotelHub",
  description: "Hotel booking web application",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();

  const cookieHeader = cookieStore
    .getAll()
    .map((c) => `${c.name}=${c.value}`)
    .join("; ");

  let user = null;

  if (cookieHeader) {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/users/me`,
        {
          headers: {
            Cookie: cookieHeader,
          },
          cache: "no-store",
        },
      );

      if (res.ok) {
        user = await res.json();
      }
    } catch {
      // Backend unreachable — continue with user = null
    }
  }

  return (
    <>
      <Navbar user={user} />
      {children}
      <Footer />
    </>
  );
}
