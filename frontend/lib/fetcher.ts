// src/lib/fetcher.ts
export const fetcher = async (url: string, options: RequestInit = {}) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}${url}`, {
    credentials: "include",
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
  });

  const text = await res.text();
  let data;
  try {
    data = text ? JSON.parse(text) : null;
  } catch {
    data = text;
  }

  if (!res.ok) {
    console.error("FETCH ERROR", {
      url,
      status: res.status,
      data,
    });
    throw new Error(data?.message || `HTTP ${res.status}`);
  }

  return data;
};
