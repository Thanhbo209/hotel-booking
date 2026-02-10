import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = req.json();

  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_UR}/auth/signIn`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(body),
  });

  const data = await res.json();

  return NextResponse(data, {
    status: res.status,
    headers: res.headers,
  });
}
