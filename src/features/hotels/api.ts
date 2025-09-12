// features/hotels/api.ts
const RAW_BASE = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8000";
const API_BASE = RAW_BASE.replace(/\/+$/, "");

const isAbsolute = (p: string) => /^https?:\/\//i.test(p);

function apiUrl(path: string) {
  if (isAbsolute(path)) return path;
  const p = path.startsWith("/") ? path : `/${path}`;
  const isBrowser = typeof window !== "undefined";
  return isBrowser ? p : `${API_BASE}${p}`;
}

export async function apiFetch(path: string, init?: RequestInit) {
  const opts: RequestInit = { credentials: "include", ...init };
  return fetch(apiUrl(path), opts);
}

/* POST /api/hotels */
export async function createHotelApi(payload: {
  name: string;
  address: string;
  contact: string;
  city: string;
}) {
  const res = await apiFetch("/api/hotels", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  const text = await res.text();
  let body: any = null;
  try { body = text ? JSON.parse(text) : null; } catch { body = { error: text }; }
  if (!res.ok) throw new Error(body?.message || `Request failed (${res.status})`);
  if (!body?.success) throw new Error(body?.message || "Failed to register hotel");
  return body; // { success, message, hotel }
}

/* GET /api/hotels/me -> { success, hotels: Hotel[] } */
export async function fetchMyHotelsApi() {
  const res = await apiFetch("/api/hotels/me", { method: "GET" });
  const text = await res.text();
  let body: any = null;
  try { body = text ? JSON.parse(text) : null; } catch { body = { error: text }; }
  if (!res.ok) throw new Error(body?.message || `Request failed (${res.status})`);
  if (!body?.success) throw new Error(body?.message || "Failed to load hotels");
  return body.hotels || [];
}
